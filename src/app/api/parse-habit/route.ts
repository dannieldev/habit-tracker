import { NextResponse } from 'next/server';

// Lista de 5 modelos gratuitos en Nvidia NIM ordenados por prioridad
const FALLBACK_MODELS = [
  "meta/llama-3.1-8b-instruct",
  "meta/llama3-70b-instruct",
  "mistralai/mixtral-8x7b-instruct-v0.1",
  "google/gemma-7b-it",
  "microsoft/phi-3-mini-128k-instruct"
];

export async function POST(request: Request) {
  try {
    const { text, availableHabits } = await request.json();

    if (!text || !availableHabits) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const url = "https://integrate.api.nvidia.com/v1/chat/completions";
    
    const prompt = `Eres un asistente que analiza texto y detecta hábitos realizados.
El usuario ha registrado la siguiente actividad: "${text}"

Los hábitos disponibles en el sistema son:
${availableHabits.map((h: any) => `- ID: ${h.id}, Nombre: ${h.name}`).join('\n')}

Devuelve ÚNICAMENTE un array en formato JSON con los IDs de los hábitos que el usuario completó según el texto. 
Por ejemplo, si corrió y leyó, devuelve: [1, 2]
Si no detectas ninguno, devuelve: []
No incluyas explicaciones, solo el array JSON.`;

    let lastError = null;

    // Lógica de Fallback: Iterar sobre los 5 modelos hasta que uno responda exitosamente
    for (const model of FALLBACK_MODELS) {
      try {
        console.log(`Intentando con el modelo: ${model}`);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1,
            max_tokens: 50
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`Falló el modelo ${model}:`, errorText);
          lastError = errorText;
          continue; // Pasa al siguiente modelo
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content?.trim() || "[]";
        
        const jsonMatch = content.match(/\[.*\]/s);
        const parsedIds = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        // Retornamos la respuesta indicando también qué modelo funcionó (para debugging)
        return NextResponse.json({ habitIds: parsedIds, usedModel: model });

      } catch (err) {
        console.warn(`Excepción con el modelo ${model}:`, err);
        lastError = err;
        continue; // Pasa al siguiente modelo
      }
    }

    // Si el bucle termina, significa que los 5 modelos fallaron
    console.error("Todos los modelos de respaldo fallaron. Último error:", lastError);
    return NextResponse.json({ error: 'Todos los modelos de IA fallaron' }, { status: 503 });

  } catch (error) {
    console.error("Error general en parse-habit:", error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

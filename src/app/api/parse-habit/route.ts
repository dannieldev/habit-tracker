import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, availableHabits } = await request.json();

    if (!text || !availableHabits) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    // Configuración para la API de Nvidia (compatible con formato OpenAI)
    const url = "https://integrate.api.nvidia.com/v1/chat/completions";
    
    // Prompt estructurado para extraer hábitos
    const prompt = `Eres un asistente que analiza texto y detecta hábitos realizados.
El usuario ha registrado la siguiente actividad: "${text}"

Los hábitos disponibles en el sistema son:
${availableHabits.map((h: any) => `- ID: ${h.id}, Nombre: ${h.name}`).join('\n')}

Devuelve ÚNICAMENTE un array en formato JSON con los IDs de los hábitos que el usuario completó según el texto. 
Por ejemplo, si corrió y leyó, devuelve: [1, 2]
Si no detectas ninguno, devuelve: []
No incluyas explicaciones, solo el array JSON.`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.1, // Baja temperatura para que sea determinista
        max_tokens: 50
      })
    });

    if (!response.ok) {
      console.error("Error Nvidia API:", await response.text());
      return NextResponse.json({ error: 'Error procesando IA' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content?.trim() || "[]";
    
    // Extraer el JSON por si el modelo agregó texto adicional por error
    const jsonMatch = content.match(/\[.*\]/s);
    const parsedIds = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    return NextResponse.json({ habitIds: parsedIds });

  } catch (error) {
    console.error("Error parse-habit:", error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

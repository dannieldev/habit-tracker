import { NextResponse } from 'next/server';

// Esta ruta actúa como un Webhook para Telegram.
// Telegram enviará peticiones POST aquí cada vez que alguien le hable al bot.

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

// En un entorno real, consultaríamos los hábitos del usuario en Firebase
const MOCK_AVAILABLE_HABITS = [
  { id: 1, name: "Leer" },
  { id: 2, name: "Correr" },
  { id: 3, name: "Agua" },
  { id: 4, name: "Meditar" }
];

export async function POST(request: Request) {
  try {
    // 1. Validar que la petición sea legítima (Telegram Webhook Secret)
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (WEBHOOK_SECRET && secretToken !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validar que haya un mensaje de texto
    if (!body.message || !body.message.text) {
      return NextResponse.json({ status: 'ok', message: 'No text found' });
    }

    const chatId = body.message.chat.id;
    const text = body.message.text;

    // 2. Enviar el texto a nuestra propia IA (reutilizando la ruta o lógica interna)
    // Para simplificar, hacemos un fetch a nuestra propia API de parse-habit
    const aiResponse = await fetch(`${request.headers.get('origin') || 'http://localhost:3000'}/api/parse-habit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, availableHabits: MOCK_AVAILABLE_HABITS })
    });

    let replyMessage = "No entendí qué hábitos hiciste. ¿Podrías ser más específico?";

    if (aiResponse.ok) {
      const { habitIds } = await aiResponse.json();
      
      if (Array.isArray(habitIds) && habitIds.length > 0) {
        // 3. Guardar en Firebase (Aquí iría la lógica de db.collection('logs').add(...))
        
        const habitNames = habitIds
          .map(id => MOCK_AVAILABLE_HABITS.find(h => h.id === id)?.name)
          .filter(Boolean)
          .join(", ");
          
        replyMessage = `¡Excelente! He registrado los siguientes hábitos: ${habitNames} ✅. Sigue así.`;
      } else {
        replyMessage = "No detecté ningún hábito en tu mensaje. Asegúrate de mencionar la actividad (ej: 'Hoy tomé agua y corrí').";
      }
    }

    // 4. Enviar respuesta de vuelta al usuario en Telegram
    if (TELEGRAM_API_TOKEN) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyMessage
        })
      });
    } else {
      console.warn("TELEGRAM_BOT_TOKEN no está configurado. Simulación:", replyMessage);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error("Error en Telegram Webhook:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

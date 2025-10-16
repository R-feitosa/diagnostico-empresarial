import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.ABACUSAI_API_KEY || "df959ba5321f445ba911b681ccf39d45",
  baseURL: "https://llm.abacus.ai/v1",
});

async function test() {
  try {
    console.log('Testando API OpenAI...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "user", content: "Diga apenas: teste funcionou" },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });
    
    console.log('✅ Sucesso!');
    console.log('Resposta:', completion.choices[0].message.content);
  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

test();

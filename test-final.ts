import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "df959ba5321f445ba911b681ccf39d45",
  baseURL: "https://llm-proxy.abacus.ai/v1",
});

async function test() {
  try {
    console.log('Testando...');
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: "teste" }],
      max_tokens: 5,
    });
    console.log('✅ Funcionou:', completion.choices[0].message.content);
  } catch (error: any) {
    console.error('❌ Erro:', error.message);
    console.error('Status:', error.status);
  }
}

test();

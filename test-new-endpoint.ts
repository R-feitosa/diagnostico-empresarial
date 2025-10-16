import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "df959ba5321f445ba911b681ccf39d45",
  baseURL: "https://llm-proxy.abacus.ai/v1",
  timeout: 30000,
});

async function test() {
  try {
    console.log('🔍 Testando novo endpoint: https://llm-proxy.abacus.ai/v1');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "Responda apenas: funcionou" },
      ],
      max_tokens: 10,
    });
    
    console.log('✅ SUCESSO!');
    console.log('Resposta:', completion.choices[0].message.content);
  } catch (error: any) {
    console.error('\n❌ ERRO:');
    console.error('Mensagem:', error.message);
    console.error('Status:', error.status);
    console.error('Code:', error.code);
    
    if (error.cause) {
      console.error('Causa:', error.cause.message || error.cause);
    }
  }
}

test();

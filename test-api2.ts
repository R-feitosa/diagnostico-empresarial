import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.ABACUSAI_API_KEY || "df959ba5321f445ba911b681ccf39d45",
  baseURL: "https://llm.abacus.ai/v1",
  timeout: 30000,
  maxRetries: 0,
});

async function test() {
  try {
    console.log('Testando conexão com https://llm.abacus.ai/v1');
    console.log('API Key:', (process.env.ABACUSAI_API_KEY || "df959ba5321f445ba911b681ccf39d45").substring(0, 10) + '...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "teste" },
      ],
      max_tokens: 10,
    });
    
    console.log('✅ Sucesso!');
    console.log('Resposta:', completion.choices[0].message.content);
  } catch (error: any) {
    console.error('\n❌ ERRO DETALHADO:');
    console.error('Mensagem:', error.message);
    console.error('Tipo:', error.constructor.name);
    console.error('Code:', error.code);
    console.error('Cause:', error.cause);
    
    if (error.response) {
      console.error('\nResposta HTTP:');
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    if (error.request) {
      console.error('\nRequest:', {
        method: error.request.method,
        path: error.request.path,
        host: error.request.host,
      });
    }
  }
}

test();

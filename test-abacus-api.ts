async function test() {
  try {
    const response = await fetch('https://api.abacus.ai/api/v0/listAvailableLlms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    
    const data = await response.json();
    console.log('Resposta:', JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error('Erro:', error.message);
  }
}

test();

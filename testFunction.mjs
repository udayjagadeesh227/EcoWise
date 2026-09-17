import { handler } from './netlify/functions/api.js';

(async () => {
  const event = {
    httpMethod: 'GET',
    path: '/api/health',
    headers: {},
    queryStringParameters: null,
    body: null,
    isBase64Encoded: false
  };
  const context = {};
  try {
    const result = await handler(event, context);
    console.log('Function result:', result);
  } catch (e) {
    console.error('Error invoking function:', e);
  }
})();

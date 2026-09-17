import { handler } from './netlify/functions/api.js';

(async () => {
  const event = { httpMethod: 'GET', path: '/api/health' };
  const context = {};
  const result = await handler(event, context);
  console.log('Result', result);
})();

import Hooks from 'superfast-cms/src/shared/features/hooks';
import asyncMiddleware from 'superfast-cms/src/server/middleware/async.middleware';

Hooks.addAction('api/init', async (app) => {
  // Access via http://localhost:4000/api/hello
  app.get('/hello', asyncMiddleware(async (req, res) => {
    res.send('Hello World!');
  }))
});

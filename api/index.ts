import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server/app';
import { registerRoutes } from '../server/routes';

let routesRegistered = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!routesRegistered) {
    await registerRoutes(app);
    routesRegistered = true;
  }
  
  return app(req, res);
}

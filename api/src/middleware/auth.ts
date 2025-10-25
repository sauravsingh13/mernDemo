import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export interface AuthedRequest extends Request { user?: { id: string; email: string }; }
export const auth = (req: AuthedRequest, res: Response, next: NextFunction) => {
  const token = (req as any).cookies?.[process.env.COOKIE_NAME || 'sav_token'];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch { return res.status(401).json({ error: 'Invalid token' }); }
};

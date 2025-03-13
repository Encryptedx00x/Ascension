import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ascension-website-jwt-secret-2024';

export function signJWT(payload: any, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
    ...options,
  });
}

export function verifyJWT(token: string) {
  return jwt.verify(token, JWT_SECRET);
} 
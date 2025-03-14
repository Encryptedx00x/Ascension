import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Verificar se o token é válido
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token verificado:', decoded);

    return NextResponse.json({ 
      success: true,
      user: {
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return NextResponse.json(
      { error: 'Não autenticado' },
      { status: 401 }
    );
  }
} 
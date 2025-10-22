import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/Models/User';

// @route    GET /api/users
// @desc     Obtener todos los usuarios
// @access   Privado (puedes dejarlo público de momento)
export async function GET() {
  try {
    await connectDB();

    // Excluir contraseñas y datos sensibles
    const users = await User.find({}, '-password').sort({ createdAt: -1 });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 });
  }
}

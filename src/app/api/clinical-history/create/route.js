import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalHistory from '@/models/ClinicalHistory';

// @route    POST /api/clinical-history/create
// @desc     Create patient clinical history
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const newHistory = new ClinicalHistory(body);
    const savedHistory = await newHistory.save();

    return NextResponse.json(
      { message: 'Historial clínico creado exitosamente', data: savedHistory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear historial clínico:', error);
    return NextResponse.json(
      { error: 'Error al crear historial clínico', details: error.message },
      { status: 500 }
    );
  }
}

// @route    PUT /api/clinical-history
// @desc     Modify patient clinical history
// @access   Private
export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del historial clínico' }, { status: 400 });
    }

    const updatedHistory = await ClinicalHistory.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedHistory) {
      return NextResponse.json({ error: 'Historial clínico no encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Historial clínico actualizado exitosamente', data: updatedHistory },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar historial clínico:', error);
    return NextResponse.json(
      { error: 'Error al actualizar historial clínico', details: error.message },
      { status: 500 }
    );
  }
}

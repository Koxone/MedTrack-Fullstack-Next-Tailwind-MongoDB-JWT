// src/app/api/clinical-records/record/[recordId]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';

/* PATCH: update specific clinical record by _id */
export async function PATCH(req, { params }) {
  try {
    // Connect
    await connectDB();

    // Params
    const { recordId } = await params;

    // Body
    const payload = await req.json();

    // Minimal guard
    // answers debe ser objeto plano si viene
    if (payload.answers && typeof payload.answers !== 'object') {
      return NextResponse.json({ error: 'Formato de answers inválido' }, { status: 400 });
    }

    // Build update object (solo campos permitidos)
    const update = {};
    if (payload.answers) update.answers = payload.answers;
    if (payload.specialty) update.specialty = payload.specialty;
    if (payload.version) update.version = payload.version;
    if (payload.doctor !== undefined) update.doctor = payload.doctor;

    // Nothing to update
    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Sin cambios' }, { status: 400 });
    }

    // Update
    const updated = await ClinicalRecord.findByIdAndUpdate(
      recordId,
      { $set: update },
      { new: true, runValidators: true }
    )
      .populate('patient', 'fullName email phone')
      .populate('doctor', 'fullName email phone')
      .lean();

    if (!updated) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error('Error PATCH clinical-records/record/[recordId]:', err);
    return NextResponse.json({ error: 'Error al actualizar clinical record' }, { status: 500 });
  }
}

// Imports
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';
import { buildClinicalPayloadFromQIds } from '@/server/clinical/applyQidPayload';

// @route    POST api/clinical-records/create
// @desc     Create Clinical Record
// @access   Private
export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    const { payload, meta } = buildClinicalPayloadFromQIds({
      answersByQId: body.answersByQId || {},
      selectedQIds: body.selectedQIds || [],
      templateVersion: body.templateVersion || 1,
    });

    // Ensamble
    const doc = await ClinicalRecord.create({
      patient: body.patientId,
      doctor: body.doctorId,
      ...payload,
      answersByQId: meta.answersByQId,
      selectedQIds: meta.selectedQIds,
      templateVersion: meta.templateVersion,
    });

    return new Response(JSON.stringify({ ok: true, id: doc._id }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}

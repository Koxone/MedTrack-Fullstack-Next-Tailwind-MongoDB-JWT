import DoctorPatientDetail from '@/components/sections/doctor/patients/[id]/DoctorPatientDetail';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorPatientsDetailPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorPatientDetail role={role} currentUser={currentUser} specialty={specialty} />
    </div>
  );
}

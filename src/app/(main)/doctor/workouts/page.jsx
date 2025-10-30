import GeneralWorkouts from '@/components/general/workouts/GeneralWorkouts';
import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export const runtime = 'nodejs';

export default async function DoctorWorkoutsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <GeneralWorkouts role={role} />
    </div>
  );
}

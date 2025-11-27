'use client';

import SignupForm from '@/components/sections/auth/signUp/SignUp';
import { useModalClose } from '@/hooks/useModalClose';
import { AlertCircle, Trash2, X, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import CreatePatientForm from './CreatePatientForm';

export default function CreatePatientModal({
  isModalPatientsOpen,
  setIsModalPatientsOpen,
  specialty,
}) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setIsModalPatientsOpen(false));

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="relative inset-0 z-50 flex w-full max-w-[600px] items-center justify-center p-4">
        <CreatePatientForm setIsModalPatientsOpen={setIsModalPatientsOpen} specialty={specialty} />
      </div>
    </div>
  );
}

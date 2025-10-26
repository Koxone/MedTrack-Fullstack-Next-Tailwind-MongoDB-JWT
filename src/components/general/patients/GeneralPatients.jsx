'use client';

import PatientsSearchBar from '@/components/general/patients/components/PatientsSearchBar';
import PatientsHeader from '@/components/general/patients/components/PatientsHeader';
import PatientsList from '@/components/general/patients/components/PatientsList';

const mockPatients = [
  { id: 1, fullName: 'Laura Hernández', email: 'laura.hernandez@example.com', age: 32 },
  { id: 2, fullName: 'Carlos Gómez', email: 'carlos.gomez@example.com', age: 40 },
  { id: 3, fullName: 'Ana López', email: 'ana.lopez@example.com', age: 27 },
];

export default function GeneralPatients() {
  const searchTerm = '';

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <PatientsHeader />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar value={searchTerm} onChange={() => {}} />
      </div>

      <PatientsList />
    </div>
  );
}

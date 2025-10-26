'use client';

import PatientCard from './PatientCard';
import { PatientsMockData } from './PatientsMockData';

export default function PatientsList() {
  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {PatientsMockData.map((paciente) => (
        <PatientCard key={paciente.id} paciente={paciente} />
      ))}
    </div>
  );
}

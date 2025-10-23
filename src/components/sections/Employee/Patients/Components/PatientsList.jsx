'use client';

import PatientCard from './PatientCard';

export default function PatientsList({ patients = [] }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {patients.map((paciente) => (
        <PatientCard key={paciente.id} paciente={paciente} />
      ))}
    </div>
  );
}

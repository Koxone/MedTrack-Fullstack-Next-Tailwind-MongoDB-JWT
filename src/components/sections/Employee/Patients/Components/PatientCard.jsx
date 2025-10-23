'use client';

import { Phone, Mail, Calendar } from 'lucide-react';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('');

export default function PatientCard({ paciente }) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 transition hover:border-blue-300">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-500 font-semibold text-white">
          {getInitials(paciente.nombre)}
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-gray-900">{paciente.nombre}</h3>
          <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 sm:grid-cols-3">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{paciente.telefono}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="truncate">{paciente.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Última: {paciente.ultimaVisita}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

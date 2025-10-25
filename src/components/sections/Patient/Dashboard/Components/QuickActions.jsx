'use client';

import { FileText, Calendar, Apple } from 'lucide-react';

/* grid */
export default function QuickActions({ onHistory, onNewAppointment, onDiets }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">Acciones Rápidas</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        <button
          onClick={onHistory}
          className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-blue-500 hover:bg-blue-50 active:scale-95"
        >
          <FileText className="mb-2 h-8 w-8 text-blue-500" />
          <h3 className="mb-1 font-semibold text-gray-900">Ver Historial</h3>
          <p className="text-sm text-gray-600">Consulta tu historial clínico completo</p>
        </button>

        <button
          onClick={onNewAppointment}
          className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-green-500 hover:bg-green-50 active:scale-95"
        >
          <Calendar className="mb-2 h-8 w-8 text-green-500" />
          <h3 className="mb-1 font-semibold text-gray-900">Agendar Cita</h3>
          <p className="text-sm text-gray-600">Programa tu próxima consulta</p>
        </button>

        <button
          onClick={onDiets}
          className="rounded-lg border-2 border-gray-200 p-4 text-left transition hover:border-purple-500 hover:bg-purple-50 active:scale-95"
        >
          <Apple className="mb-2 h-8 w-8 text-purple-500" />
          <h3 className="mb-1 font-semibold text-gray-900">Mis Dietas</h3>
          <p className="text-sm text-gray-600">Revisa tu plan nutricional</p>
        </button>
      </div>
    </div>
  );
}

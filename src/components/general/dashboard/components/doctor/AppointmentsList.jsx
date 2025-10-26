'use client';

// Static imports
import { RefreshCw, X, Clock, FileText, Calendar, CheckCircle, XCircle } from 'lucide-react';

export default function AppointmentsList() {
  // Render
  return (
    <div className="space-y-4">
      {/* Example item */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-5 transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-xl">
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-500 opacity-5" />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 font-bold text-white shadow-lg">
              JP
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-bold text-gray-900">Juan Pérez</h3>
              <span className="inline-flex items-center gap-1.5 rounded-xl border bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <CheckCircle className="h-4 w-4" />
                Confirmada
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 px-3 py-1.5">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">09:00</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-purple-100 bg-linear-to-r from-purple-50 to-pink-50 px-3 py-1.5">
                <FileText className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Primera Consulta</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 gap-2 sm:flex-col lg:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 px-4 py-2.5 text-sm font-medium text-blue-600 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md active:scale-95">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden xl:inline">Reagendar</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-600 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50 hover:shadow-md active:scale-95">
              <X className="h-4 w-4" />
              <span className="hidden xl:inline">Cancelar</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-1 rounded-b-xl bg-linear-to-r from-emerald-500 to-green-600" />
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-blue-50 p-12 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">No hay citas programadas</h3>
          <p className="text-gray-600">Las citas aparecerán aquí cuando sean agendadas</p>
        </div>
      </div>
    </div>
  );
}

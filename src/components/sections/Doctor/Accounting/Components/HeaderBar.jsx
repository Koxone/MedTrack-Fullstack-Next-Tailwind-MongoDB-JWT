'use client';

import { Download } from 'lucide-react';

/* header */
export default function HeaderBar({ selectedDate, onChangeDate }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Contabilidad</h1>
        <p className="text-sm text-gray-600 md:text-base">Control financiero del consultorio</p>
      </div>

      <div className="flex gap-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChangeDate(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-50 active:scale-95"
          title="Exportar"
        >
          <Download className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}

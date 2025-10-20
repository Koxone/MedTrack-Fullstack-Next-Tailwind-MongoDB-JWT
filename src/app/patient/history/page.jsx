
"use client";

import { useState } from "react";
import { Plus, FileText } from "lucide-react";

const historyData = [
  { id: 1, fecha: "2024-10-15", peso: 75, imc: 24.5, notas: "Progreso excelente" },
  { id: 2, fecha: "2024-10-08", peso: 75.5, imc: 24.7, notas: "Mantener dieta" },
  { id: 3, fecha: "2024-10-01", peso: 76, imc: 24.8, notas: "Buen avance" },
  { id: 4, fecha: "2024-09-24", peso: 77, imc: 25.1, notas: "Continuar ejercicio" },
];

export default function PatientHistory() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Historial Clínico</h1>
          <p className="text-gray-600">Registro completo de tus mediciones</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5" />
          Agregar Registro
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fecha</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Peso (kg)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IMC</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900">{record.fecha}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.peso}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{record.imc}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.notas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Agregar Registro</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                <input type="number" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                <textarea rows="3" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div className="flex gap-3">
                <button type="button" className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

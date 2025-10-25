'use client';

import { Plus, Edit2, Trash2 } from 'lucide-react';

/* table */
export default function MedicamentosTable({ items, total, onAdd, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Medicamentos Vendidos</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm text-white transition hover:bg-green-600 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 py-3 text-left text-sm font-semibold text-gray-700">
                Medicamento
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">Cant.</th>
              <th className="px-2 py-3 text-right text-sm font-semibold text-gray-700">P. Unit.</th>
              <th className="px-2 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
              <th className="hidden px-2 py-3 text-left text-sm font-semibold text-gray-700 md:table-cell">
                Paciente
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-700">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-2 py-3 text-sm text-gray-900">{m.nombre}</td>
                <td className="px-2 py-3 text-center text-sm text-gray-900">{m.cantidad}</td>
                <td className="px-2 py-3 text-right text-sm text-gray-600">${m.precioUnitario}</td>
                <td className="px-2 py-3 text-right text-sm font-semibold text-gray-900">
                  ${m.total}
                </td>
                <td className="hidden px-2 py-3 text-sm text-gray-600 md:table-cell">
                  {m.paciente}
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(m)}
                      className="rounded p-1.5 transition hover:bg-blue-50 active:scale-95"
                    >
                      <Edit2 className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(m)}
                      className="rounded p-1.5 transition hover:bg-red-50 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-semibold">
              <td colSpan="3" className="px-2 py-3 text-sm text-gray-900">
                Total Medicamentos
              </td>
              <td className="px-2 py-3 text-right text-sm text-gray-900">
                ${total.toLocaleString()}
              </td>
              <td className="hidden md:table-cell" />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

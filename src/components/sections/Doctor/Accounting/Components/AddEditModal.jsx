'use client';

import { X } from 'lucide-react';

/* modal */
export default function AddEditModal({
  type,
  editingItem,
  onClose,
  onSaveConsulta,
  onSaveMedicamento,
}) {
  /* local state */
  const isConsulta = type === 'consulta';
  const [form, setForm] = useStateFromEditing(type, editingItem);

  /* handlers */
  const onSubmit = (e) => {
    e.preventDefault();
    if (isConsulta) {
      onSaveConsulta(form);
    } else {
      onSaveMedicamento(form);
    }
  };

  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Editar' : 'Agregar'} {isConsulta ? 'Consulta' : 'Medicamento'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {isConsulta ? (
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Hora</label>
                <input
                  type="time"
                  required
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Paciente</label>
                <input
                  type="text"
                  required
                  value={form.paciente}
                  onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del paciente"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tipo de Consulta
                </label>
                <select
                  required
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar</option>
                  <option value="Primera Consulta">Primera Consulta</option>
                  <option value="Consulta General">Consulta General</option>
                  <option value="Seguimiento">Seguimiento</option>
                  <option value="Urgencia">Urgencia</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Costo</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.costo}
                  onChange={(e) => setForm({ ...form, costo: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="800"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pagado"
                  checked={form.pagado}
                  onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                  className="h-4 w-4 rounded text-blue-600"
                />
                <label htmlFor="pagado" className="text-sm text-gray-700">
                  Consulta pagada
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Medicamento</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del medicamento"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.cantidad}
                  onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Precio Unitario
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={form.precioUnitario}
                  onChange={(e) => setForm({ ...form, precioUnitario: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Paciente</label>
                <input
                  type="text"
                  required
                  value={form.paciente}
                  onChange={(e) => setForm({ ...form, paciente: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del paciente"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 active:scale-95"
                >
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

/* helper hook */
import { useState, useMemo } from 'react'; // local state
function useStateFromEditing(type, editingItem) {
  // init
  const initial = useMemo(() => {
    if (type === 'consulta') {
      return editingItem
        ? {
            hora: editingItem.hora,
            paciente: editingItem.paciente,
            tipo: editingItem.tipo,
            costo: String(editingItem.costo),
            pagado: editingItem.pagado,
          }
        : { hora: '', paciente: '', tipo: '', costo: '', pagado: true };
    }
    return editingItem
      ? {
          nombre: editingItem.nombre,
          cantidad: String(editingItem.cantidad),
          precioUnitario: String(editingItem.precioUnitario),
          paciente: editingItem.paciente,
        }
      : { nombre: '', cantidad: '', precioUnitario: '', paciente: '' };
  }, [type, editingItem]);

  const [form, setForm] = useState(initial);
  return [form, setForm];
}

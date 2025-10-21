'use client';

import { X, Play, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ModalAddEdit({ setShowModal, editingEjercicio, handleSave }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: 'Fuerza',
    duracion: '',
    nivel: 'Principiante',
    imagenes: '',
    videoUrl: '',
    explicacion: '',
    instrucciones: '',
    beneficios: '',
    precauciones: '',
  });

  useEffect(() => {
    if (editingEjercicio) {
      setForm({
        nombre: editingEjercicio.nombre,
        categoria: editingEjercicio.categoria,
        duracion: editingEjercicio.duracion,
        nivel: editingEjercicio.nivel,
        imagenes: editingEjercicio.imagenes.join('\n'),
        videoUrl: editingEjercicio.videoUrl,
        explicacion: editingEjercicio.explicacion,
        instrucciones: editingEjercicio.instrucciones,
        beneficios: editingEjercicio.beneficios,
        precauciones: editingEjercicio.precauciones,
      });
    }
  }, [editingEjercicio]);

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowModal(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingEjercicio ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={(e) => handleSave(e, form)} className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full rounded-lg border px-4 py-2"
              />
              <select
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                className="w-full rounded-lg border px-4 py-2"
              >
                <option value="Fuerza">Fuerza</option>
                <option value="Cardio">Cardio</option>
                <option value="Core">Core</option>
                <option value="Flexibilidad">Flexibilidad</option>
              </select>
              <input
                type="text"
                placeholder="Duración"
                value={form.duracion}
                onChange={(e) => setForm({ ...form, duracion: e.target.value })}
                className="w-full rounded-lg border px-4 py-2"
              />
              <select
                value={form.nivel}
                onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                className="w-full rounded-lg border px-4 py-2"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>

            <label className="mt-3 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <ImageIcon className="h-4 w-4" /> URLs de imágenes (una por línea)
            </label>
            <textarea
              value={form.imagenes}
              onChange={(e) => setForm({ ...form, imagenes: e.target.value })}
              className="w-full rounded-lg border px-4 py-2"
              rows="3"
            />

            <label className="mt-3 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <Play className="h-4 w-4 text-red-600" /> URL de video (embed)
            </label>
            <input
              type="url"
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              className="w-full rounded-lg border px-4 py-2"
            />

            {['explicacion', 'instrucciones', 'beneficios', 'precauciones'].map((key) => (
              <textarea
                key={key}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full rounded-lg border px-4 py-2"
                rows="3"
              />
            ))}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border px-4 py-2"
              >
                Cancelar
              </button>
              <button type="submit" className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white">
                {editingEjercicio ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

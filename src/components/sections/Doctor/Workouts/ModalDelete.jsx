'use client';

import { AlertCircle } from 'lucide-react';

export default function ModalDelete({ ejercicioToDelete, handleDelete, setShowDeleteModal }) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowDeleteModal(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center gap-3 border-b pb-3">
            <div className="rounded-lg bg-red-100 p-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Eliminar Ejercicio</h2>
          </div>
          <p className="mb-4 text-gray-700">¿Estás seguro de que deseas eliminar este ejercicio?</p>
          <div className="mb-6 rounded-lg bg-gray-50 p-3">
            <p className="text-sm font-medium text-gray-900">{ejercicioToDelete?.nombre}</p>
            <p className="text-sm text-gray-600">{ejercicioToDelete?.categoria}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

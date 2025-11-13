'use client';

import { X, History, ArrowDownCircle, ArrowUpCircle, User } from 'lucide-react';
import { useModalClose } from '@/hooks/useModalClose';

// Mock data (solo de Paracetamol 500mg)
const mockTransactions = [
  {
    _id: '6915263ec9537f5227a9a0a1',
    itemName: 'Paracetamol 500mg',
    movement: 'IN',
    reasonType: 'restock',
    quantity: 100,
    reason: 'Ingreso inicial de lote nuevo',
    performedBy: 'Farm. Luis Ortega',
    createdAt: '2025-11-10T10:15:46.258+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a2',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 25,
    reason: 'Distribución a sala de urgencias',
    performedBy: 'Enf. Carla Ruiz',
    createdAt: '2025-11-11T08:30:20.120+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a3',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 15,
    reason: 'Suministro a pacientes hospitalizados',
    performedBy: 'Dr. Juan Pérez',
    createdAt: '2025-11-11T16:42:11.874+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a4',
    itemName: 'Paracetamol 500mg',
    movement: 'IN',
    reasonType: 'correction',
    quantity: 5,
    reason: 'Ajuste por conteo físico de inventario',
    performedBy: 'Farm. Luis Ortega',
    createdAt: '2025-11-12T09:10:12.350+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a5',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 20,
    reason: 'Uso en consultas generales',
    performedBy: 'Enf. Laura Gómez',
    createdAt: '2025-11-13T11:22:11.842+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a6',
    itemName: 'Paracetamol 500mg',
    movement: 'IN',
    reasonType: 'restock',
    quantity: 60,
    reason: 'Compra semanal de reposición',
    performedBy: 'Farm. Luis Ortega',
    createdAt: '2025-11-14T07:55:17.194+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a7',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 10,
    reason: 'Entrega a área pediátrica',
    performedBy: 'Enf. Mariana López',
    createdAt: '2025-11-14T14:33:29.501+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a8',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 8,
    reason: 'Tratamiento postoperatorio',
    performedBy: 'Dr. Juan Pérez',
    createdAt: '2025-11-15T09:45:43.913+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0a9',
    itemName: 'Paracetamol 500mg',
    movement: 'IN',
    reasonType: 'correction',
    quantity: 2,
    reason: 'Ajuste por devolución de paciente',
    performedBy: 'Farm. Luis Ortega',
    createdAt: '2025-11-15T18:18:59.224+00:00',
  },
  {
    _id: '6915263ec9537f5227a9a0b0',
    itemName: 'Paracetamol 500mg',
    movement: 'OUT',
    reasonType: 'usage',
    quantity: 12,
    reason: 'Uso en control de fiebre de pacientes ambulatorios',
    performedBy: 'Enf. Carla Ruiz',
    createdAt: '2025-11-16T08:30:44.582+00:00',
  },
];

/* --- Component --- */
export default function TransactionHistoryModal({ onClose }) {
  const { handleOverlayClick } = useModalClose(onClose);

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative */}
        <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br from-green-100 to-emerald-200 opacity-20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr from-green-100 to-emerald-200 opacity-20 blur-3xl" />

        {/* Header */}
        <div className="relative overflow-hidden border-b border-gray-100 bg-white/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-linear-to-r from-green-100 to-emerald-200 opacity-10" />
          <div className="relative px-6 py-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="relative flex items-center justify-center rounded-2xl bg-linear-to-br from-green-200 to-emerald-300 p-3 shadow-lg">
                    <History className="h-6 w-6 text-emerald-700" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Historial de Paracetamol 500mg
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">Movimientos recientes del producto</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-gray-100 p-2 transition-all hover:bg-red-500"
              >
                <X className="h-5 w-5 text-gray-600 hover:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-180px)] space-y-4 overflow-y-auto p-6">
          {mockTransactions.map((t) => (
            <div
              key={t._id}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition-all hover:shadow-md"
            >
              {/* Header row */}
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {t.movement === 'IN' ? 'Entrada' : 'Salida'}
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                    t.movement === 'IN'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {t.movement === 'IN' ? (
                    <ArrowDownCircle className="h-4 w-4" />
                  ) : (
                    <ArrowUpCircle className="h-4 w-4" />
                  )}
                  {t.quantity} unidades
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-800">Motivo:</span> {t.reason}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Tipo:</span> {t.reasonType}
                </p>
              </div>

              {/* Performed by */}
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4 text-gray-500" />
                <span>{t.performedBy}</span>
              </div>

              {/* Timestamp */}
              <p className="mt-1 text-xs text-gray-400">{new Date(t.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

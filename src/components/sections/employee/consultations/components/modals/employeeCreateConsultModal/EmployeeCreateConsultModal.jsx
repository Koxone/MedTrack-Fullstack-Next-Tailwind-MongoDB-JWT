'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import ConsultationForm from './components/consultForm/ConsultationForm';
import Actions from './components/Actions';
import { useModalClose } from '@/hooks/useModalClose';

/* Container */
export default function EmployeeCreateConsultModal({ onClose, onCreate }) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Local state
  const [form, setForm] = useState({
    patient: '',
    type: '',
    cost: '',
    paid: true,
    paymentMethod: '',
    notes: '',
    total: 0,
    medsSold: [],
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div className="relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Header title="Agregar Consulta" onClose={onClose} />
          {/* Content */}
          <form onSubmit={handleSubmit} className="max-h-[calc(90vh-160px)] overflow-y-auto p-6">
            <ConsultationForm form={form} setForm={setForm} />
            <Actions onClose={onClose} submitLabel="Guardar" />
          </form>
        </div>
      </div>
    </div>
  );
}

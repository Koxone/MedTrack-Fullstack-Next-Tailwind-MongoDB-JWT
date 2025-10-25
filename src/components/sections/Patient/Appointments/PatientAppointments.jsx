'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderBar from './Components/HeaderBar'; // header
import FiltersBar from './Components/FiltersBar'; // filters
import AppointmentCard from './Components/AppointmentCard'; // item
import EmptyState from './Components/EmptyState'; // empty
import CancelModal from './Components/CancelModal'; // modal

/* data */
export const appointmentsData = [
  {
    id: 1,
    fecha: '2024-11-25',
    hora: '10:00',
    medico: 'Dr. García',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 2,
    fecha: '2024-11-22',
    hora: '15:30',
    medico: 'Dra. Martínez',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
  {
    id: 3,
    fecha: '2024-11-19',
    hora: '09:00',
    medico: 'Dr. López',
    especialidad: 'Cardiología',
    estado: 'Completada',
  },
  {
    id: 4,
    fecha: '2024-11-15',
    hora: '11:45',
    medico: 'Dra. Hernández',
    especialidad: 'Dermatología',
    estado: 'Confirmada',
  },
  {
    id: 5,
    fecha: '2024-11-12',
    hora: '13:00',
    medico: 'Dr. Pérez',
    especialidad: 'Medicina General',
    estado: 'Pendiente',
  },
  {
    id: 6,
    fecha: '2024-11-09',
    hora: '08:30',
    medico: 'Dra. Ramírez',
    especialidad: 'Ginecología',
    estado: 'Completada',
  },
  {
    id: 7,
    fecha: '2024-11-06',
    hora: '16:00',
    medico: 'Dr. Torres',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 8,
    fecha: '2024-11-03',
    hora: '10:30',
    medico: 'Dra. Jiménez',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
  {
    id: 9,
    fecha: '2024-10-30',
    hora: '12:00',
    medico: 'Dr. Rivera',
    especialidad: 'Cardiología',
    estado: 'Completada',
  },
  {
    id: 10,
    fecha: '2024-10-27',
    hora: '09:15',
    medico: 'Dra. Castro',
    especialidad: 'Dermatología',
    estado: 'Confirmada',
  },
  {
    id: 11,
    fecha: '2024-10-24',
    hora: '14:00',
    medico: 'Dr. Flores',
    especialidad: 'Medicina General',
    estado: 'Pendiente',
  },
  {
    id: 12,
    fecha: '2024-10-21',
    hora: '11:30',
    medico: 'Dra. Mendoza',
    especialidad: 'Ginecología',
    estado: 'Completada',
  },
  {
    id: 13,
    fecha: '2024-10-18',
    hora: '08:00',
    medico: 'Dr. Rojas',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 14,
    fecha: '2024-10-15',
    hora: '17:00',
    medico: 'Dra. Navarro',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
  {
    id: 15,
    fecha: '2024-10-12',
    hora: '13:45',
    medico: 'Dr. Ortega',
    especialidad: 'Cardiología',
    estado: 'Completada',
  },
  {
    id: 16,
    fecha: '2024-10-09',
    hora: '09:30',
    medico: 'Dra. Salas',
    especialidad: 'Dermatología',
    estado: 'Confirmada',
  },
  {
    id: 17,
    fecha: '2024-10-06',
    hora: '15:15',
    medico: 'Dr. Morales',
    especialidad: 'Medicina General',
    estado: 'Pendiente',
  },
  {
    id: 18,
    fecha: '2024-10-03',
    hora: '10:00',
    medico: 'Dra. Delgado',
    especialidad: 'Ginecología',
    estado: 'Completada',
  },
  {
    id: 19,
    fecha: '2024-09-30',
    hora: '11:00',
    medico: 'Dr. Sánchez',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 20,
    fecha: '2024-09-27',
    hora: '12:30',
    medico: 'Dra. Morales',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
];

/* helpers */
export const getStatusColor = (estado) => {
  switch (estado) {
    case 'Confirmada':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Pendiente':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Completada':
      return 'bg-slate-100 text-slate-700 border-slate-200';
    case 'Cancelada':
      return 'bg-rose-100 text-rose-700 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function PatientAppointments() {
  /* router */
  const router = useRouter();

  /* ui state */
  const [appointments, setAppointments] = useState(appointmentsData);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Todas');

  /* handlers */
  const handleNew = () => router.push('/patient/appointments/new');

  /* handlers */
  const handleCancelClick = (apt) => {
    setSelectedAppointment(apt);
    setShowCancelModal(true);
  };

  /* handlers */
  const handleConfirmCancel = () => {
    if (!selectedAppointment) return;
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === selectedAppointment.id ? { ...apt, estado: 'Cancelada' } : apt))
    );
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  /* handlers */
  const handleReschedule = (apt) => {
    localStorage.setItem('rescheduleAppointment', JSON.stringify(apt));
    router.push('/patient/appointments/new');
  };

  /* derived */
  const canModify = (estado) => estado === 'Confirmada' || estado === 'Pendiente';

  /* derived */
  const filteredAppointments = appointments.filter((apt) => {
    if (activeFilter === 'Todas') return true;
    if (activeFilter === 'Próximas')
      return apt.estado === 'Confirmada' || apt.estado === 'Pendiente';
    if (activeFilter === 'Completadas') return apt.estado === 'Completada';
    if (activeFilter === 'Canceladas') return apt.estado === 'Cancelada';
    return true;
  });

  /* derived */
  const filterButtons = [
    { label: 'Todas', count: appointments.length },
    {
      label: 'Próximas',
      count: appointments.filter((a) => a.estado === 'Confirmada' || a.estado === 'Pendiente')
        .length,
    },
    { label: 'Completadas', count: appointments.filter((a) => a.estado === 'Completada').length },
    { label: 'Canceladas', count: appointments.filter((a) => a.estado === 'Cancelada').length },
  ];

  return (
    <div className="h-full overflow-y-auto pb-8">
      {/* header */}
      <HeaderBar onNew={handleNew} />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* filters */}
        <FiltersBar filters={filterButtons} active={activeFilter} onChange={setActiveFilter} />

        {/* list */}
        {filteredAppointments.length > 0 ? (
          <div className="grid gap-4">
            {filteredAppointments.map((apt, index) => (
              <AppointmentCard
                key={apt.id}
                apt={apt}
                index={index}
                canModify={canModify(apt.estado)}
                onReschedule={() => handleReschedule(apt)}
                onCancel={() => handleCancelClick(apt)}
              />
            ))}
          </div>
        ) : (
          <EmptyState activeFilter={activeFilter} onNew={handleNew} />
        )}
      </div>

      {/* modal */}
      {showCancelModal && selectedAppointment && (
        <CancelModal
          apt={selectedAppointment}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
      )}

      {/* animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

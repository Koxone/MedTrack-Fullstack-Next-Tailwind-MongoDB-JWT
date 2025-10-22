'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User, Plus, X, RefreshCw, AlertCircle } from 'lucide-react';

const appointmentsData = [
  {
    id: 1,
    fecha: '2024-10-25',
    hora: '10:00',
    medico: 'Dr. García',
    especialidad: 'Endocrinología',
    estado: 'Confirmada',
  },
  {
    id: 2,
    fecha: '2024-11-05',
    hora: '15:30',
    medico: 'Dra. Martínez',
    especialidad: 'Nutrición',
    estado: 'Pendiente',
  },
  {
    id: 3,
    fecha: '2024-09-20',
    hora: '11:00',
    medico: 'Dr. García',
    especialidad: 'Endocrinología',
    estado: 'Completada',
  },
];

export default function PatientAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState(appointmentsData);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completada':
        return 'bg-gray-100 text-gray-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelClick = (apt) => {
    setSelectedAppointment(apt);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment.id ? { ...apt, estado: 'Cancelada' } : apt
        )
      );
      setShowCancelModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleReschedule = (apt) => {
    // Guardar datos de la cita para prellenar el formulario
    localStorage.setItem('rescheduleAppointment', JSON.stringify(apt));
    router.push('/patient/appointments/new');
  };

  const canModify = (estado) => {
    return estado === 'Confirmada' || estado === 'Pendiente';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Citas Médicas</h1>
          <p className="text-sm text-gray-600 md:text-base">Gestiona tus consultas médicas</p>
        </div>
        <button
          onClick={() => router.push('/patient/appointments/new')}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Agendar Cita</span>
          <span className="sm:hidden">Nueva</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white active:scale-95">
          Todas
        </button>
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:bg-gray-50 active:scale-95">
          Próximas
        </button>
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:bg-gray-50 active:scale-95">
          Completadas
        </button>
        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 hover:bg-gray-50 active:scale-95">
          Canceladas
        </button>
      </div>

      {/* Lista de citas */}
      <div className="grid gap-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className={`rounded-xl border-2 bg-white p-4 shadow-sm transition md:p-6 ${
              apt.estado === 'Cancelada'
                ? 'border-red-200 opacity-60'
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              {/* Información de la cita */}
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">{apt.fecha}</span>
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{apt.hora}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(apt.estado)}`}
                  >
                    {apt.estado}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{apt.medico}</span>
                  <span className="text-sm text-gray-500">• {apt.especialidad}</span>
                </div>
              </div>

              {/* Botones de acción */}
              {canModify(apt.estado) && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReschedule(apt)}
                    className="flex items-center gap-2 rounded-lg border-2 border-blue-500 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-95"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span className="hidden sm:inline">Reagendar</span>
                  </button>
                  <button
                    onClick={() => handleCancelClick(apt)}
                    className="flex items-center gap-2 rounded-lg border-2 border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 active:scale-95"
                  >
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline">Cancelar</span>
                  </button>
                </div>
              )}

              {apt.estado === 'Completada' && (
                <div className="text-sm text-gray-500 italic">Consulta finalizada</div>
              )}

              {apt.estado === 'Cancelada' && (
                <div className="text-sm font-medium text-red-600 italic">Cita cancelada</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay citas */}
      {appointments.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm md:p-12">
          <Calendar className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">No tienes citas programadas</h3>
          <p className="mb-6 text-gray-600">
            Agenda tu primera consulta con nuestros especialistas
          </p>
          <button
            onClick={() => router.push('/patient/appointments/new')}
            className="rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-600 active:scale-95"
          >
            Agendar Primera Cita
          </button>
        </div>
      )}

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && selectedAppointment && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/50"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                <p className="mb-4 text-gray-700">
                  ¿Estás seguro de que deseas cancelar esta cita?
                </p>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{selectedAppointment.fecha}</span>
                      <Clock className="ml-2 h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{selectedAppointment.hora}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{selectedAppointment.medico}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Si cancelas con menos de 24 horas de anticipación,
                    podrías ser sujeto a cargos.
                  </p>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
                  >
                    No, mantener cita
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    className="flex-1 rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

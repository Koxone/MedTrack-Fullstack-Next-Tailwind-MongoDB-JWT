"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar as CalendarIcon, Clock, User, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Datos de ejemplo de médicos
const doctors = [
  { id: 1, nombre: "Dra. María García", especialidad: "Endocrinología" },
  { id: 2, nombre: "Dr. Carlos Ruiz", especialidad: "Medicina Estética" },
  { id: 3, nombre: "Dra. Ana Martínez", especialidad: "Nutrición" },
];

// Horarios disponibles por día
const availableSlots = {
  "2024-10-21": ["09:00", "10:00", "11:00", "15:00", "16:00"],
  "2024-10-22": ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
  "2024-10-23": ["09:00", "11:00", "15:00", "16:00"],
  "2024-10-24": ["10:00", "11:00", "14:00", "15:00", "16:00"],
  "2024-10-25": ["09:00", "10:00", "11:00", "15:00"],
};

export default function NewAppointment() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Octubre 2024
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");

  // Generar días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateAvailable = (date) => {
    if (!date || !selectedDoctor) return false;
    const dateStr = formatDate(date);
    return availableSlots[dateStr] && availableSlots[dateStr].length > 0;
  };

  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (date) => {
    if (!isPastDate(date) && isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Por favor completa todos los campos");
      return;
    }

    const appointmentData = {
      doctor: doctors.find(d => d.id === selectedDoctor),
      fecha: formatDate(selectedDate),
      hora: selectedTime,
      motivo: reason,
    };

    console.log("Cita agendada:", appointmentData);
    alert("¡Cita agendada exitosamente!");
    router.push("/patient/appointments");
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const availableTimesForDate = selectedDate ? availableSlots[formatDate(selectedDate)] || [] : [];

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Citas
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Agendar Nueva Cita</h1>
        <p className="text-sm md:text-base text-gray-600 mb-6">Selecciona médico, fecha y horario disponible</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de médico */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Selecciona tu médico</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  onClick={() => {
                    setSelectedDoctor(doctor.id);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition active:scale-95 ${
                    selectedDoctor === doctor.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doctor.nombre}</p>
                      <p className="text-xs text-gray-600">{doctor.especialidad}</p>
                    </div>
                  </div>
                  {selectedDoctor === doctor.id && (
                    <div className="mt-2 flex items-center gap-1 text-blue-600 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Seleccionado</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Calendario */}
          {selectedDoctor && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Selecciona una fecha</label>
              <div className="bg-gray-50 rounded-lg p-4">
                {/* Header del calendario */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-200 rounded-lg transition active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">{monthName}</h3>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-200 rounded-lg transition active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                <div className="grid grid-cols-7 gap-1">
                  {days.map((date, index) => {
                    if (!date) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const isAvailable = isDateAvailable(date);
                    const isPast = isPastDate(date);
                    const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        disabled={isPast || !isAvailable}
                        className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition active:scale-95 ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : isAvailable && !isPast
                            ? "bg-white hover:bg-blue-50 border border-blue-200 text-gray-900"
                            : isPast
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-white border border-blue-200 rounded"></div>
                    <span>Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 rounded"></div>
                    <span>No disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Seleccionado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Horarios disponibles */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Horarios disponibles para {selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {availableTimesForDate.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`flex items-center justify-center gap-2 py-3 px-2 border-2 rounded-lg transition active:scale-95 ${
                      selectedTime === time
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="font-medium text-sm">{time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Motivo de consulta */}
          {selectedTime && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de la consulta</label>
              <textarea
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe brevemente el motivo de tu consulta..."
              ></textarea>
            </div>
          )}

          {/* Resumen y botón */}
          {selectedDoctor && selectedDate && selectedTime && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Resumen de tu cita</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Médico:</strong> {doctors.find(d => d.id === selectedDoctor)?.nombre}</p>
                <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p><strong>Hora:</strong> {selectedTime}</p>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className={`flex-1 px-6 py-3 rounded-lg transition font-medium active:scale-95 ${
                selectedDoctor && selectedDate && selectedTime
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirmar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User, Phone, Mail } from "lucide-react";

// Datos de ejemplo de citas
const appointmentsData = {
  "2024-10-21": [
    { id: 1, hora: "09:00", paciente: "Juan Pérez", telefono: "+52 55 1234 5678", email: "juan@email.com", motivo: "Control de peso" },
    { id: 2, hora: "10:00", paciente: "María López", telefono: "+52 55 8765 4321", email: "maria@email.com", motivo: "Seguimiento" },
    { id: 3, hora: "15:00", paciente: "Carlos Ruiz", telefono: "+52 55 5555 5555", email: "carlos@email.com", motivo: "Primera consulta" },
  ],
  "2024-10-22": [
    { id: 4, hora: "09:00", paciente: "Ana Martínez", telefono: "+52 55 1111 2222", email: "ana@email.com", motivo: "Revisión" },
    { id: 5, hora: "14:00", paciente: "Pedro García", telefono: "+52 55 3333 4444", email: "pedro@email.com", motivo: "Control mensual" },
  ],
  "2024-10-23": [
    { id: 6, hora: "11:00", paciente: "Laura Sánchez", telefono: "+52 55 6666 7777", email: "laura@email.com", motivo: "Tratamiento estético" },
    { id: 7, hora: "15:00", paciente: "Roberto Díaz", telefono: "+52 55 8888 9999", email: "roberto@email.com", motivo: "Consulta nutricional" },
  ],
  "2024-10-24": [
    { id: 8, hora: "10:00", paciente: "Sofia Torres", telefono: "+52 55 2222 3333", email: "sofia@email.com", motivo: "Control de peso" },
    { id: 9, hora: "14:00", paciente: "Miguel Ángel", telefono: "+52 55 4444 5555", email: "miguel@email.com", motivo: "Seguimiento" },
    { id: 10, hora: "16:00", paciente: "Isabel Ramírez", telefono: "+52 55 7777 8888", email: "isabel@email.com", motivo: "Primera consulta" },
  ],
};

export default function DoctorCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9)); // Octubre 2024
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
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

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointmentsData[dateStr] || [];
  };

  const hasAppointments = (date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const selectedAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  // Calcular estadísticas del mes
  const totalAppointmentsThisMonth = Object.keys(appointmentsData)
    .filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
    })
    .reduce((total, dateStr) => total + appointmentsData[dateStr].length, 0);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mi Calendario</h1>
        <p className="text-sm md:text-base text-gray-600">Visualiza y gestiona tus citas médicas</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Citas este mes</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{totalAppointmentsThisMonth}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Días con citas</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {Object.keys(appointmentsData).filter(dateStr => {
              const date = new Date(dateStr);
              return date.getMonth() === currentMonth.getMonth();
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Hoy</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {getAppointmentsForDate(new Date()).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
          <p className="text-xs md:text-sm text-gray-600 mb-1">Promedio/día</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {totalAppointmentsThisMonth > 0 ? Math.round(totalAppointmentsThisMonth / Object.keys(appointmentsData).length) : 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          {/* Header del calendario */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 capitalize">{monthName}</h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const hasApts = hasAppointments(date);
              const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
              const isToday = formatDate(date) === formatDate(new Date());
              const aptCount = getAppointmentsForDate(date).length;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm font-medium transition active:scale-95 relative ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : hasApts
                      ? "bg-blue-50 hover:bg-blue-100 border border-blue-200 text-gray-900"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                  } ${isToday ? "ring-2 ring-blue-500" : ""}`}
                >
                  <span>{date.getDate()}</span>
                  {hasApts && (
                    <span className={`text-xs mt-0.5 ${isSelected ? "text-white" : "text-blue-600"}`}>
                      {aptCount} cita{aptCount > 1 ? 's' : ''}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
              <span>Con citas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 rounded"></div>
              <span>Sin citas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Seleccionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 ring-2 ring-blue-500 rounded"></div>
              <span>Hoy</span>
            </div>
          </div>
        </div>

        {/* Lista de citas del día seleccionado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarIcon className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate
                ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                : "Selecciona un día"}
            </h3>
          </div>

          {selectedDate && selectedAppointments.length > 0 ? (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {selectedAppointments.map((apt) => (
                <div key={apt.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">{apt.hora}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{apt.paciente}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-xs">{apt.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-xs truncate">{apt.email}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-600"><strong>Motivo:</strong> {apt.motivo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <p className="text-sm text-gray-500 text-center py-8">No hay citas programadas para este día</p>
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">Selecciona un día en el calendario para ver las citas</p>
          )}
        </div>
      </div>
    </div>
  );
}


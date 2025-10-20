
"use client";

import { useState } from "react";
import { Calendar, Clock, User, Filter } from "lucide-react";

const appointments = [
  { id: 1, paciente: "Juan Pérez", fecha: "2024-10-25", hora: "10:00", estado: "Pendiente" },
  { id: 2, paciente: "María López", fecha: "2024-10-25", hora: "11:30", estado: "Confirmada" },
  { id: 3, paciente: "Carlos Ruiz", fecha: "2024-10-26", hora: "15:00", estado: "Pendiente" },
  { id: 4, paciente: "Ana Martínez", fecha: "2024-10-27", hora: "09:00", estado: "Confirmada" },
];

export default function DoctorAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Citas Médicas</h1>
          <p className="text-gray-600">Gestiona las citas de tus pacientes</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 active:scale-95 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Filter className="w-5 h-5" />
          Filtrar
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{apt.paciente}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{apt.fecha}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{apt.hora}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.estado)}`}>
                {apt.estado}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 active:scale-95 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm">
                Aceptar
              </button>
              <button
                onClick={() => {
                  setSelectedAppointment(apt);
                  setShowModal(true);
                }}
                className="px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
              >
                Reprogramar
              </button>
              <button className="px-4 py-2 active:scale-95 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm">
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Reprogramar Cita</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Fecha</label>
                <input type="date" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Hora</label>
                <input type="time" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-3">
                <button type="button" className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

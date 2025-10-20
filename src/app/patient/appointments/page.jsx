
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Plus } from "lucide-react";

const appointments = [
  { id: 1, fecha: "2024-10-25", hora: "10:00", medico: "Dr. García", estado: "Confirmada" },
  { id: 2, fecha: "2024-11-05", hora: "15:30", medico: "Dra. Martínez", estado: "Pendiente" },
  { id: 3, fecha: "2024-09-20", hora: "11:00", medico: "Dr. García", estado: "Completada" },
];

export default function PatientAppointments() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Confirmada": return "bg-green-100 text-green-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Completada": return "bg-gray-100 text-gray-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Citas Médicas</h1>
          <p className="text-gray-600">Gestiona tus consultas médicas</p>
        </div>
        <button
          onClick={() => router.push("/patient/appointments/new")}
          className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5" />
          Agendar Cita
        </button>
      </div>

      <div className="grid gap-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">{apt.fecha}</span>
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{apt.hora}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{apt.medico}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.estado)}`}>
                {apt.estado}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Agendar Nueva Cita</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input type="date" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                <input type="time" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Médico</label>
                <select className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Dr. García</option>
                  <option>Dra. Martínez</option>
                  <option>Dr. López</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button type="button" className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                  Agendar
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

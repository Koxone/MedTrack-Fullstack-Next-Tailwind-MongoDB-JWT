
"use client";

import { useRouter } from "next/navigation";
import { Search, Eye } from "lucide-react";
import { useState } from "react";

const patients = [
  { id: 1, nombre: "Juan Pérez", edad: 35, peso: 75, imc: 24.5, progreso: "Excelente" },
  { id: 2, nombre: "María López", edad: 28, peso: 62, imc: 22.1, progreso: "Bueno" },
  { id: 3, nombre: "Carlos Ruiz", edad: 42, peso: 88, imc: 28.3, progreso: "Regular" },
  { id: 4, nombre: "Ana Martínez", edad: 31, peso: 68, imc: 23.8, progreso: "Excelente" },
  { id: 5, nombre: "Luis García", edad: 38, peso: 82, imc: 26.7, progreso: "Bueno" },
];

export default function DoctorPatients() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const getProgresoColor = (progreso) => {
    switch (progreso) {
      case "Excelente": return "bg-green-100 text-green-800";
      case "Bueno": return "bg-blue-100 text-blue-800";
      case "Regular": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mis Pacientes</h1>
          <p className="text-gray-600">Gestiona tu lista de pacientes</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Todos</option>
            <option>Excelente</option>
            <option>Bueno</option>
            <option>Regular</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Edad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Peso (kg)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IMC</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Progreso</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.nombre}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.edad}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.peso}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{patient.imc}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProgresoColor(patient.progreso)}`}>
                    {patient.progreso}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


"use client";

import { useRouter } from "next/navigation";
import { Apple, Plus, Edit, Eye } from "lucide-react";

const diets = [
  { id: 1, nombre: "Plan Mediterráneo", pacientes: 12, duracion: "30 días" },
  { id: 2, nombre: "Plan Bajo en Carbohidratos", pacientes: 8, duracion: "45 días" },
  { id: 3, nombre: "Plan Vegetariano", pacientes: 5, duracion: "60 días" },
  { id: 4, nombre: "Plan Keto", pacientes: 3, duracion: "90 días" },
];

export default function DoctorDiets() {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Gestión de Dietas</h1>
          <p className="text-gray-600">Crea y administra planes nutricionales</p>
        </div>
        <button
          onClick={() => router.push("/doctor/diets/new")}
          className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5" />
          Nueva Dieta
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diets.map((diet) => (
          <div key={diet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
            <div className="w-full h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
              <Apple className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{diet.nombre}</h3>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">Pacientes asignados: {diet.pacientes}</p>
              <p className="text-sm text-gray-600">Duración: {diet.duracion}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/doctor/diets/${diet.id}`)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
              >
                <Eye className="w-4 h-4" />
                Ver
              </button>
              <button
                onClick={() => router.push(`/doctor/diets/${diet.id}`)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import { useRouter } from "next/navigation";
import { Apple, Clock, User } from "lucide-react";

const diets = [
  { id: 1, nombre: "Plan Mediterráneo", descripcion: "Dieta balanceada rica en vegetales y pescado", duracion: "30 días", medico: "Dra. Martínez" },
  { id: 2, nombre: "Plan Bajo en Carbohidratos", descripcion: "Reducción gradual de carbohidratos", duracion: "45 días", medico: "Dr. García" },
  { id: 3, nombre: "Plan Vegetariano", descripcion: "Alimentación basada en plantas", duracion: "60 días", medico: "Dra. Martínez" },
];

export default function PatientDiets() {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mis Dietas</h1>
        <p className="text-gray-600">Planes nutricionales personalizados</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diets.map((diet) => (
          <div
            key={diet.id}
            onClick={() => router.push(`/patient/diets/${diet.id}`)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition cursor-pointer"
          >
            <div className="w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
              <Apple className="w-16 h-16 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{diet.nombre}</h3>
            <p className="text-sm text-gray-600 mb-4">{diet.descripcion}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4" />
              <span>{diet.duracion}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>{diet.medico}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

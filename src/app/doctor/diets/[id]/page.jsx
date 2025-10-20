"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Trash2, Users } from "lucide-react";

export default function DoctorDietDetail({ params }) {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Dietas
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Plan Mediterráneo</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Duración: 30 días</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                12 pacientes asignados
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600">
              Dieta balanceada rica en vegetales, frutas, pescado y aceite de oliva. 
              Este plan está diseñado para ayudar a los pacientes a alcanzar sus objetivos de peso de manera saludable y sostenible.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Plan Diario de Comidas</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Desayuno</h3>
                  <span className="text-sm text-gray-600">8:00 AM</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>1 taza de avena con frutas</li>
                  <li>1 yogurt natural</li>
                  <li>Té verde o café sin azúcar</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Almuerzo</h3>
                  <span className="text-sm text-gray-600">1:00 PM</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Ensalada verde con aceite de oliva</li>
                  <li>150g de pescado a la plancha</li>
                  <li>1 porción de arroz integral</li>
                  <li>Agua natural</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Cena</h3>
                  <span className="text-sm text-gray-600">7:00 PM</span>
                </div>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Sopa de verduras</li>
                  <li>Pechuga de pollo a la plancha</li>
                  <li>Ensalada mixta</li>
                  <li>Infusión de hierbas</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Notas e Instrucciones</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-700">
                Recuerda mantener una hidratación adecuada (2 litros de agua al día). 
                Evita alimentos procesados y azúcares refinados. 
                Complementa con 30 minutos de ejercicio moderado diario.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Pacientes Asignados</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {["Juan Pérez", "María López", "Carlos Ruiz", "Ana Martínez"].map((patient, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-900">{patient}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Activa</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


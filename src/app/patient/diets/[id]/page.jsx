"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Apple, Clock, User, Calendar } from "lucide-react";

export default function PatientDietDetail({ params }) {
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <Apple className="w-32 h-32 text-green-600" />
        </div>
        
        <div className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Plan Mediterráneo</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>30 días</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span>Dra. Martínez</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>Inicio: 01 Oct 2024</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-600 mb-6">
              Dieta balanceada rica en vegetales, frutas, pescado y aceite de oliva. 
              Este plan está diseñado para ayudarte a alcanzar tus objetivos de peso de manera saludable y sostenible.
            </p>

            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Instrucciones Diarias</h2>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Desayuno (8:00 AM)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>1 taza de avena con frutas</li>
                  <li>1 yogurt natural</li>
                  <li>Té verde o café sin azúcar</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Almuerzo (1:00 PM)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Ensalada verde con aceite de oliva</li>
                  <li>150g de pescado a la plancha</li>
                  <li>1 porción de arroz integral</li>
                  <li>Agua natural</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Cena (7:00 PM)</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Sopa de verduras</li>
                  <li>Pechuga de pollo a la plancha</li>
                  <li>Ensalada mixta</li>
                  <li>Infusión de hierbas</li>
                </ul>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Notas del Médico</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-gray-700">
                Recuerda mantener una hidratación adecuada (2 litros de agua al día). 
                Evita alimentos procesados y azúcares refinados. 
                Complementa con 30 minutos de ejercicio moderado diario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


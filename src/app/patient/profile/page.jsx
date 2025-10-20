
"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar, Ruler, Weight, Edit2 } from "lucide-react";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Información personal y médica</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 active:scale-95 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <Edit2 className="w-5 h-5" />
          {isEditing ? "Guardar" : "Editar Perfil"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 flex flex-col items-center">
          <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <User className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Juan Pérez</h2>
          <p className="text-gray-600">Paciente</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                defaultValue="Juan Pérez"
                disabled={!isEditing}
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
              <input
                type="number"
                defaultValue="35"
                disabled={!isEditing}
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                defaultValue="juan.perez@email.com"
                disabled={!isEditing}
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                defaultValue="+52 55 1234 5678"
                disabled={!isEditing}
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Médica</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
            <input
              type="number"
              defaultValue="175"
              disabled={!isEditing}
              className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Peso Inicial (kg)</label>
            <input
              type="number"
              defaultValue="85"
              disabled={!isEditing}
              className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Peso Actual (kg)</label>
            <input
              type="number"
              defaultValue="75"
              disabled={!isEditing}
              className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguridad</h3>
        <button className="px-4 py-2 active:scale-95 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
          Cambiar Contraseña
        </button>
      </div>
    </div>
  );
}

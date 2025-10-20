"use client";

import { useRouter } from "next/navigation";
import { Heart, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    // Guardar datos en localStorage para el siguiente paso
    localStorage.setItem("signupData", JSON.stringify(formData));
    
    // Ir al paso 2: historial clínico
    router.push("/signup/medical-history");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <span className="text-2xl md:text-3xl font-bold text-gray-900">MedTrack</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
          <p className="text-sm md:text-base text-gray-600">Paso 1 de 2: Información de acceso</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Botón continuar */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium shadow-md active:scale-95"
            >
              Continuar al historial clínico
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Link a login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

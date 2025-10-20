"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Mail, Lock } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-10 h-10 text-blue-500" />
          <span className="text-2xl md:text-3xl font-bold text-gray-900">MedTrack</span>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Iniciar Sesión</h2>
        <p className="text-gray-600 text-center mb-8">Accede a tu cuenta médica</p>
        
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Recordarme</span>
            </label>
            <button type="button" className="text-blue-600 hover:text-blue-700">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.push("/patient/dashboard")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Ingresar como Paciente
            </button>
            <button
              type="button"
              onClick={() => router.push("/doctor/dashboard")}
              className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              Ingresar como Médico
            </button>
          </div>
        </form>
        
        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}


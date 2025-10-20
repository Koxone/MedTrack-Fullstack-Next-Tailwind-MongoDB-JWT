
"use client";

import { useRouter } from "next/navigation";
import { Heart, Award, Users, Shield } from "lucide-react";

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">MedTrack</span>
          </button>
          <button onClick={() => router.push("/login")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Ingresar
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Acerca de MedTrack</h1>
        <p className="text-xl text-gray-600 mb-12">
          Somos una plataforma médica digital dedicada a mejorar la calidad de vida de nuestros pacientes a través de tecnología innovadora.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excelencia Médica</h3>
            <p className="text-gray-600">Profesionales certificados comprometidos con tu salud</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Users className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Atención Personalizada</h3>
            <p className="text-gray-600">Planes de tratamiento adaptados a tus necesidades</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Shield className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Seguridad de Datos</h3>
            <p className="text-gray-600">Tu información protegida con los más altos estándares</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Heart className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Compromiso Total</h3>
            <p className="text-gray-600">Acompañamiento continuo en tu proceso de salud</p>
          </div>
        </div>
      </div>
    </div>
  );
}

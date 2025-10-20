
"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function Privacy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">MedTrack</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Recopilación de Datos</h2>
            <p className="text-gray-600">Recopilamos información personal necesaria para proporcionar nuestros servicios médicos.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Uso de la Información</h2>
            <p className="text-gray-600">Tu información se utiliza exclusivamente para mejorar tu experiencia y proporcionar atención médica personalizada.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Seguridad</h2>
            <p className="text-gray-600">Implementamos medidas de seguridad avanzadas para proteger tus datos personales y médicos.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Tus Derechos</h2>
            <p className="text-gray-600">Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier momento.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

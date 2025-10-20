
"use client";

import { useRouter } from "next/navigation";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contáctanos</h1>
        <p className="text-xl text-gray-600 mb-12">Estamos aquí para ayudarte. Envíanos un mensaje.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="button" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">contacto@medtrack.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <Phone className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                <p className="text-gray-600">+52 55 1234 5678</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <MapPin className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                <p className="text-gray-600">Av. Reforma 123, CDMX, México</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

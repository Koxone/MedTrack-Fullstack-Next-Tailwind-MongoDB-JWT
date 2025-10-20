
"use client";

import { useState } from "react";
import { HelpCircle, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "¿Cómo actualizo mi peso?", a: "Puedes actualizar tu peso desde el historial clínico haciendo clic en 'Agregar Registro'." },
  { q: "¿Cómo agendo una cita?", a: "Ve a la sección de Citas Médicas y haz clic en 'Agendar Cita'." },
  { q: "¿Puedo cambiar mi dieta?", a: "Contacta a tu médico para solicitar un cambio en tu plan nutricional." },
  { q: "¿Cómo descargo mi historial?", a: "En la sección de Historial Clínico encontrarás la opción de exportar tus datos." },
];

export default function PatientSupport() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Soporte</h1>
        <p className="text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">soporte@medtrack.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+52 55 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">Dirección</p>
                  <p className="text-gray-600">Av. Reforma 123, CDMX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Envíanos un Mensaje</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input type="text" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Soporte Técnico</option>
                <option>Consulta Médica</option>
                <option>Facturación</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea rows="6" className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="button" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

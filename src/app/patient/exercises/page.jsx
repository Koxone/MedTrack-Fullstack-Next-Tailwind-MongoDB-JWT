"use client";

import { useState } from "react";
import { Dumbbell, Clock, ChevronLeft, ChevronRight, X, Play, Info, AlertCircle, Target } from "lucide-react";

const ejerciciosData = [
  {
    id: 1,
    nombre: "Sentadillas",
    categoria: "Fuerza",
    duracion: "3 series de 15 repeticiones",
    nivel: "Intermedio",
    imagenPrincipal: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400",
    imagenes: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600"
    ],
    videoUrl: "https://www.youtube.com/embed/aclHkVaku9U",
    explicacion: "Las sentadillas son un ejercicio fundamental para fortalecer las piernas y glúteos. Este movimiento compuesto trabaja múltiples grupos musculares simultáneamente.",
    instrucciones: [
      "Párate con los pies al ancho de los hombros",
      "Mantén la espalda recta y el pecho hacia arriba",
      "Baja lentamente doblando las rodillas",
      "Desciende hasta que tus muslos estén paralelos al suelo",
      "Empuja con los talones para volver a la posición inicial"
    ],
    beneficios: [
      "Fortalece cuádriceps, glúteos e isquiotibiales",
      "Mejora la movilidad de cadera",
      "Aumenta la fuerza del core",
      "Quema calorías efectivamente"
    ],
    precauciones: [
      "No dejes que las rodillas sobrepasen los dedos de los pies",
      "Mantén siempre la espalda recta",
      "Si tienes problemas de rodilla, consulta antes de realizar"
    ]
  },
  {
    id: 2,
    nombre: "Plancha Abdominal",
    categoria: "Core",
    duracion: "3 series de 30 segundos",
    nivel: "Principiante",
    imagenPrincipal: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    imagenes: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600"
    ],
    videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw",
    explicacion: "La plancha es un ejercicio isométrico excelente para fortalecer todo el core, incluyendo abdominales, espalda baja y hombros.",
    instrucciones: [
      "Colócate en posición de flexión sobre los antebrazos",
      "Mantén el cuerpo en línea recta desde la cabeza hasta los talones",
      "Contrae el abdomen y glúteos",
      "Mantén la posición sin dejar caer las caderas",
      "Respira de manera constante"
    ],
    beneficios: [
      "Fortalece el core completo",
      "Mejora la postura",
      "Reduce el dolor de espalda",
      "Aumenta la estabilidad"
    ],
    precauciones: [
      "No arquees la espalda",
      "Mantén el cuello en posición neutral",
      "Si sientes dolor en la espalda baja, detente"
    ]
  },
  {
    id: 3,
    nombre: "Burpees",
    categoria: "Cardio",
    duracion: "3 series de 10 repeticiones",
    nivel: "Avanzado",
    imagenPrincipal: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    imagenes: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600"
    ],
    videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA",
    explicacion: "Los burpees son un ejercicio de cuerpo completo que combina fuerza y cardio, ideal para quemar calorías y mejorar la resistencia.",
    instrucciones: [
      "Comienza de pie",
      "Baja a posición de cuclillas y coloca las manos en el suelo",
      "Salta con los pies hacia atrás a posición de plancha",
      "Realiza una flexión (opcional)",
      "Salta con los pies hacia adelante",
      "Salta verticalmente con los brazos arriba"
    ],
    beneficios: [
      "Ejercicio de cuerpo completo",
      "Quema muchas calorías",
      "Mejora la resistencia cardiovascular",
      "Aumenta la fuerza funcional"
    ],
    precauciones: [
      "Calienta bien antes de realizar",
      "Mantén el core contraído durante todo el movimiento",
      "Modifica si tienes problemas de muñeca o rodilla"
    ]
  },
  {
    id: 4,
    nombre: "Estiramiento de Gato-Vaca",
    categoria: "Flexibilidad",
    duracion: "2 series de 10 repeticiones",
    nivel: "Principiante",
    imagenPrincipal: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    imagenes: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600"
    ],
    videoUrl: "https://www.youtube.com/embed/kqnua4rHVVA",
    explicacion: "Este estiramiento de yoga es perfecto para mejorar la flexibilidad de la columna y aliviar la tensión en la espalda.",
    instrucciones: [
      "Colócate en cuatro puntos (manos y rodillas)",
      "Arquea la espalda hacia arriba (posición de gato)",
      "Mantén 5 segundos",
      "Arquea la espalda hacia abajo (posición de vaca)",
      "Mantén 5 segundos",
      "Repite el movimiento fluidamente"
    ],
    beneficios: [
      "Mejora la flexibilidad de la columna",
      "Alivia la tensión en la espalda",
      "Masajea los órganos internos",
      "Reduce el estrés"
    ],
    precauciones: [
      "Realiza los movimientos lentamente",
      "No fuerces el rango de movimiento",
      "Respira profundamente durante el ejercicio"
    ]
  }
];

export default function PatientExercises() {
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterCategoria, setFilterCategoria] = useState("Todos");

  const categorias = ["Todos", "Fuerza", "Cardio", "Core", "Flexibilidad"];

  const filteredEjercicios = filterCategoria === "Todos" 
    ? ejerciciosData 
    : ejerciciosData.filter(e => e.categoria === filterCategoria);

  const nextImage = () => {
    if (selectedEjercicio) {
      setCurrentImageIndex((prev) => 
        prev === selectedEjercicio.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEjercicio) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEjercicio.imagenes.length - 1 : prev - 1
      );
    }
  };

  const getNivelColor = (nivel) => {
    const colores = {
      "Principiante": "bg-green-100 text-green-800",
      "Intermedio": "bg-yellow-100 text-yellow-800",
      "Avanzado": "bg-red-100 text-red-800"
    };
    return colores[nivel] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Rutina de Ejercicios</h1>
        <p className="text-sm md:text-base text-gray-600">Ejercicios asignados por tu médico</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategoria(cat)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition active:scale-95 ${
              filterCategoria === cat
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de ejercicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEjercicios.map((ejercicio) => (
          <div
            key={ejercicio.id}
            onClick={() => {
              setSelectedEjercicio(ejercicio);
              setCurrentImageIndex(0);
            }}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden cursor-pointer hover:border-blue-400 transition active:scale-95"
          >
            <div className="relative h-48 bg-gray-200">
              <img
                src={ejercicio.imagenPrincipal}
                alt={ejercicio.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(ejercicio.nivel)}`}>
                  {ejercicio.nivel}
                </span>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white">
                  {ejercicio.categoria}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{ejercicio.nombre}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{ejercicio.duracion}</span>
              </div>
              <div className="mt-3 text-sm text-blue-600 font-medium">
                Click para ver detalles →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalle */}
      {selectedEjercicio && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setSelectedEjercicio(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEjercicio.nombre}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNivelColor(selectedEjercicio.nivel)}`}>
                      {selectedEjercicio.nivel}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedEjercicio.categoria}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEjercicio(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Carousel de imágenes */}
                <div className="relative">
                  <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={selectedEjercicio.imagenes[currentImageIndex]}
                      alt={`${selectedEjercicio.nombre} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedEjercicio.imagenes.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition active:scale-95"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition active:scale-95"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedEjercicio.imagenes.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition ${
                                index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Video */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Video Tutorial</h3>
                  </div>
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={selectedEjercicio.videoUrl}
                      className="absolute top-0 left-0 w-full h-full rounded-xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Duración */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duración</p>
                    <p className="font-semibold text-gray-900">{selectedEjercicio.duracion}</p>
                  </div>
                </div>

                {/* Explicación */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Explicación</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedEjercicio.explicacion}</p>
                </div>

                {/* Instrucciones */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Instrucciones</h3>
                  </div>
                  <ol className="space-y-2">
                    {selectedEjercicio.instrucciones.map((inst, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{inst}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Beneficios */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Beneficios</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedEjercicio.beneficios.map((ben, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Precauciones */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Precauciones</h3>
                  </div>
                  <ul className="space-y-2">
                    {selectedEjercicio.precauciones.map((prec, index) => (
                      <li key={index} className="flex gap-2 text-gray-700">
                        <span className="text-yellow-600 font-bold">⚠</span>
                        <span>{prec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
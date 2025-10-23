'use client';

import { useState, useMemo } from 'react';
import Filters from './Components/Filters';
import ExerciseCard from './Components/ExerciseCard';
import ExerciseModal from './Components/ExerciseModal';
import { ejerciciosData, categorias } from './Components/mockData';

export default function PatientExercises() {
  const [selectedEjercicio, setSelectedEjercicio] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filterCategoria, setFilterCategoria] = useState('Todos');

  const ejercicios = useMemo(
    () =>
      filterCategoria === 'Todos'
        ? ejerciciosData
        : ejerciciosData.filter((e) => e.categoria === filterCategoria),
    [filterCategoria]
  );

  return (
    <div className="space-y-4 md:space-y-6 h-full overflow-y-auto">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Rutina de Ejercicios</h1>
        <p className="text-sm text-gray-600 md:text-base">Ejercicios asignados por tu médico</p>
      </div>

      <Filters categorias={categorias} active={filterCategoria} onChange={setFilterCategoria} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ejercicios.map((ejercicio) => (
          <ExerciseCard
            key={ejercicio.id}
            ejercicio={ejercicio}
            onOpen={() => {
              setSelectedEjercicio(ejercicio);
              setCurrentImageIndex(0);
            }}
          />
        ))}
      </div>

      {selectedEjercicio && (
        <ExerciseModal
          ejercicio={selectedEjercicio}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onClose={() => setSelectedEjercicio(null)}
        />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

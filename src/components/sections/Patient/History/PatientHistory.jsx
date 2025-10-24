'use client';

import { useState } from 'react';
import { useAuthStore } from '@/Zustand/useAuthStore';
import Header from './Components/Header';
import Stats from './Components/Stats';
import RecordsTable from './Components/RecordsTable';
import RecordsMobileList from './Components/RecordsMobileList';
import EmptyState from './Components/EmptyState';
import AddRecordModal from './Components/AddRecordModal';
import { useClinicalRecords } from '@/Hooks/useClinicalRecords';

export default function PatientHistory() {
  const { currentUser } = useAuthStore();
  const currentUserId = currentUser?.id;

  const { data: historyData = [], isLoading, isError, error } = useClinicalRecords(currentUserId);

  const [showModal, setShowModal] = useState(false);
  const [peso, setPeso] = useState('');
  const [notas, setNotas] = useState('');

  if (isLoading) return <p className="p-6 text-center text-gray-500">Cargando historial...</p>;
  if (isError) return <p className="p-6 text-center text-red-600">Error: {error.message}</p>;
  if (!historyData.length) return <EmptyState onAdd={() => setShowModal(true)} />;

  const mappedHistory = historyData.map((r) => ({
    id: r._id,
    fecha: new Date(r.fechaRegistro).toISOString().split('T')[0],
    peso: r.pesoActual,
    imc: r.indiceMasaCorporal.toFixed(1),
    notas: r.motivoConsulta || 'Sin notas',
  }));

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      <Header total={historyData.length} />

      <div className="mx-auto max-w-7xl space-y-4">
        <Stats historyData={mappedHistory} />

        <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
          <RecordsTable historyData={mappedHistory} />
          <RecordsMobileList historyData={mappedHistory} />
        </div>
      </div>

      {showModal && (
        <AddRecordModal
          peso={peso}
          notas={notas}
          setPeso={setPeso}
          setNotas={setNotas}
          onClose={() => setShowModal(false)}
          onSave={() => {
            // Lógica real de guardado
            setShowModal(false);
            setPeso('');
            setNotas('');
          }}
        />
      )}
    </div>
  );
}

'use client';

import SharedDietCard from './components/dietCard/SharedDietCard';
import Link from 'next/link';
export const runtime = 'nodejs';
import SharedSectionHeader from '../headers/SharedSectionHeader';
import { useGetAllDiets } from '@/hooks/diets/useGetAllDiets';

export default function SharedDiets({ role }) {
  // Fetch all diets
  const { dietsData, isLoading, error } = useGetAllDiets();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="flex items-center justify-between">
        {/* Header */}
        <SharedSectionHeader
          role={role}
          Icon="diets"
          title={role === 'doctor' ? 'Gestion de Dietas' : 'Mis Dietas'}
          subtitle={
            role === 'doctor'
              ? 'Crea y personaliza planes nutricionales'
              : 'Planes nutricionales personalizados'
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dietsData?.map((diet) => (
          <SharedDietCard role={role} diet={diet} key={diet._id} />
        ))}
      </div>
    </div>
  );
}

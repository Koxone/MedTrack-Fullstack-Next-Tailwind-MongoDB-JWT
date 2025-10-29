'use client';

import { Eye, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DietCardActions({ id }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/doctor/diets/${id}`)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95"
      >
        <Eye className="h-4 w-4" />
        Ver
      </button>

      <button
        onClick={() => router.push(`/doctor/diets/${id}`)}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
      >
        <Edit className="h-4 w-4" />
        Editar
      </button>
    </div>
  );
}

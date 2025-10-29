import { Apple, Plus, Edit, Eye } from 'lucide-react';
import DietCard from './components/dietCard/DietCard';
import Link from 'next/link';
import GeneralDietCard from '@/components/general/diets/components/dietCard/GeneralDietCard';

const diets = [
  { id: 1, nombre: 'Plan Mediterráneo', pacientes: 12, duracion: '30 días' },
  { id: 2, nombre: 'Plan Bajo en Carbohidratos', pacientes: 8, duracion: '45 días' },
  { id: 3, nombre: 'Plan Vegetariano', pacientes: 5, duracion: '60 días' },
  { id: 4, nombre: 'Plan Keto', pacientes: 3, duracion: '90 días' },
];
export default function DoctorDiets({ type }) {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Gestión de Dietas</h1>
          <p className="text-gray-600">Crea y administra planes nutricionales</p>
        </div>
        <Link
          href="/doctor/diets/new"
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Nueva Dieta
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {diets.map((diet) => (
          <GeneralDietCard diet={diet} key={diet.id} />
        ))}
      </div>
    </div>
  );
}

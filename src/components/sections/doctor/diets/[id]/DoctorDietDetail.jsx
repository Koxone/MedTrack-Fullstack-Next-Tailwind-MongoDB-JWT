import TopBar from './components/TopBar';
import DietHeader from './components/DietHeader';
import SectionCard from './components/SectionCard';
import MealPlan from './components/MealPlan';
import NotesCallout from './components/NotesCallout';
import PatientsList from './components/PatientsList';

// Mock Data for Diets
import { diet } from './components/DoctorDietsMockData';

export default function DoctorDietDetail() {
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <TopBar />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <DietHeader
          title={diet.nombre}
          duration={diet.duracion}
          assignedCount={diet.pacientesAsignados}
        />

        <div className="space-y-4 md:space-y-6">
          <SectionCard title="Descripción">
            <p className="text-gray-600">{diet.descripcion}</p>
          </SectionCard>

          <SectionCard title="Plan Diario de Comidas">
            <MealPlan blocks={diet.plan} />
          </SectionCard>

          <SectionCard title="Notas e Instrucciones">
            <NotesCallout text={diet.notas} />
          </SectionCard>

          <SectionCard title="Pacientes Asignados">
            <PatientsList patients={diet.pacientes} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

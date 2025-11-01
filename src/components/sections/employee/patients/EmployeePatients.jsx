import GeneralSectionHeader from '@/components/shared/sections/GeneralSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import { useEmployeePatients } from './hooks/useEmployeePatients';

export default function EmployeePatients() {
  const { patients, loading } = useEmployeePatients();
  
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <GeneralSectionHeader
        Icon="pacientes"
        title="Pacientes"
        subtitle="Lista de todos los pacientes de la clínica"
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <EmployeePatientsList patients={patients} loading={loading} />
    </div>
  );
}
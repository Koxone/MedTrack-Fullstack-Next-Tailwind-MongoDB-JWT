import { fetchPatients } from '@/lib/mongoDB/getPatients';
import PatientCard from './PatientCard';
import { PatientsMockData } from './PatientsMockData';

export default async function PatientsList() {
  const patients = await fetchPatients();
  console.log(patients);
  
  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {patients.map((patient) => (
        <PatientCard key={patient._id} patient={patient} />
      ))}
    </div>
  );
}

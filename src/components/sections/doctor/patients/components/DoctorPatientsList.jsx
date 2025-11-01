import { fetchPatients } from '@/lib/mongoDB/getPatients';
import DoctorPatientCard from './DoctorPatientCard';

export default async function DoctorPatientsList({ currentUser, role }) {
  const patients = await fetchPatients();

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {patients.map((patient) => (
        <DoctorPatientCard
          key={patient._id}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}

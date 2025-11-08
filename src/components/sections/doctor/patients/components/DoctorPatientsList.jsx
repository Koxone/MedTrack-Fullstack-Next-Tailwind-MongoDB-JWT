import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import DoctorPatientCard from './DoctorPatientCard';

export default async function DoctorPatientsList({ currentUser, role }) {
  // Get Patients
  await connectDB();

  // Finds users with Role patient and isActive true
  let query = { role: 'patient', isActive: true };
  console.log(query);

  // If currentUser is Doctor, adds specialty to query to filter only patients that belongs to that specialty
  if (currentUser.role === 'doctor') {
    query.specialty = currentUser.specialty;
  }

  // Queries the database after ensuring the connection via connectDB()
  const patients = await User.find(query, '-password -resetToken').sort({ createdAt: -1 }).lean();

  // Mongo returns _id as an ObjectId, which needs to be converted to a String
  const serializedPatients = patients.map((p) => ({
    ...p,
    _id: p._id.toString(),
    lastVisit: p.lastVisit ?? null,
  }));

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {serializedPatients.map((patient) => (
        <DoctorPatientCard
          key={patient._id.toString()}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}

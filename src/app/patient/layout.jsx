import Sidebar from "../sections/global/Sidebar";
import Header from "../sections/global/Header";

export default function PatientLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="patient" />
      <div className="flex-1 flex flex-col">
        <Header userName="Juan Pérez" role="patient" />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}


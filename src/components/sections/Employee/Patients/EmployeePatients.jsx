'use client';

import { useState, useMemo } from 'react';
import { User } from 'lucide-react';
import SearchBar from './Components/SearchBar';
import PatientsList from './Components/PatientsList';
import { pacientes as defaultPacientes } from './Components/mockData';

export default function EmployeePatients() {
  const [searchTerm, setSearchTerm] = useState('');

  const pacientes = defaultPacientes;

  const filteredPacientes = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return pacientes.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.telefono.includes(searchTerm) ||
        p.email.toLowerCase().includes(term)
    );
  }, [searchTerm, pacientes]);

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Pacientes</h1>
        <p className="text-sm text-gray-600 md:text-base">Buscar y ver información de pacientes</p>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <PatientsList patients={filteredPacientes} />

      {filteredPacientes.length === 0 && (
        <div className="py-12 text-center">
          <User className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-gray-600">No se encontraron pacientes</p>
          <p className="text-sm text-gray-500">Intenta con otro término de búsqueda</p>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

function AssignedDiets() {
  // State
  const [hasAssignedDiets] = useState(true);
  const [dietsCount] = useState(2);

  // Mock data
  const mockDiets = [
    { id: '1', name: 'Dieta Keto' },
    { id: '2', name: 'Dieta Mediterránea' },
    { id: '3', name: 'Dieta Detox' },
  ];

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">
        {hasAssignedDiets ? 'Dietas asignadas a este paciente:' : 'Ninguna dieta asignada'}
      </p>

      {/* Content */}
      {hasAssignedDiets ? (
        dietsCount === 0 ? (
          /* Zero diets assigned */
          <Link
            href="/doctor/diets"
            className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
          >
            Ir a asignar dieta
          </Link>
        ) : dietsCount > 1 ? (
          /* Select when multiple diets assigned */
          <select className="bg-beehealth-blue-secondary-solid w-full rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
            <option value="">
              {dietsCount === 1 ? mockDiets[0].name : `${dietsCount} dietas asignadas`}
            </option>

            {mockDiets.map((diet) => (
              <option key={diet.id} value={diet.id}>
                {diet.name}
              </option>
            ))}
          </select>
        ) : (
          /* Single diet display */
          <div>
            <Link
              href="/doctor/diets"
              className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
            >
              {mockDiets[0].name}
            </Link>
          </div>
        )
      ) : (
        /* No diets assigned because hasAssignedDiets is false */
        <Link
          href="/doctor/diets"
          className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
        >
          Ir a asignar dieta
        </Link>
      )}
    </div>
  );
}

export default AssignedDiets;

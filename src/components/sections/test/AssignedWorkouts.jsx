'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AssignedWorkouts() {
  // State
  const [hasAssignedWorkouts] = useState(true);
  const [workoutsCount] = useState(0);

  // Mock data
  const mockWorkouts = [
    { id: '1', name: 'Plancha Abdominal' },
    { id: '2', name: 'Sentadillas' },
    { id: '3', name: 'Cardio Intensivo' },
  ];

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">
        {hasAssignedWorkouts
          ? 'Ejercicios asignados a este paciente:'
          : 'Ningún ejercicio asignado'}
      </p>

      {/* Content */}
      {hasAssignedWorkouts ? (
        workoutsCount === 0 ? (
          /* Zero workouts assigned */
          <Link
            href="/doctor/workouts"
            className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
          >
            Ir a asignar ejercicio
          </Link>
        ) : workoutsCount > 1 ? (
          /* Select when multiple workouts assigned */
          <select className="bg-beehealth-blue-secondary-solid w-full rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
            <option value="">
              {workoutsCount === 1 ? mockWorkouts[0].name : `${workoutsCount} ejercicios asignados`}
            </option>

            {mockWorkouts.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </select>
        ) : (
          /* Single workout */
          <div>
            <Link
              href="/doctor/workouts"
              className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
            >
              {mockWorkouts[0].name}
            </Link>
          </div>
        )
      ) : (
        /* No workouts (hasAssignedWorkouts = false) */
        <Link
          href="/doctor/workouts"
          className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
        >
          Ir a asignar ejercicio
        </Link>
      )}
    </div>
  );
}

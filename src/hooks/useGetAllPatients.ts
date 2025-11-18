import { useState, useEffect } from 'react';
import { ZUser } from '@/zod/user.schema';
import { patientResponseSchema } from '@/zod/api.users.patients.schema';

export function useGetAllPatients() {
  const [patients, setPatients] = useState<ZUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        setIsLoading(true);

        const res = await fetch('/api/users/patients');
        if (!res.ok) {
          throw new Error('Failed to fetch patients');
        }

        const json = await res.json();
        const data = patientResponseSchema.parse(json);

        setPatients(data.patients);
      } catch (err: any) {
        console.error('ZOD Error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPatients();
  }, []);

  return { patients, isLoading, error, setPatients };
}

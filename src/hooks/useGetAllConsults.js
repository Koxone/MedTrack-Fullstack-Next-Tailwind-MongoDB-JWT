import { useState, useEffect, useMemo } from 'react';

export function useGetAllConsults({ speciality = null } = {}) {
  const [consults, setConsults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConsults() {
      try {
        setIsLoading(true);

        const res = await fetch('/api/consults');
        if (!res.ok) {
          throw new Error('Failed to fetch consults');
        }

        const data = await res.json();

        setConsults(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchConsults();
  }, []);

  const filteredConsults = useMemo(() => {
    if (!speciality) return consults;
    return consults.filter((c) => c.speciality === speciality);
  }, [consults, speciality]);

  return { consults: filteredConsults, isLoading, error, setConsults };
}

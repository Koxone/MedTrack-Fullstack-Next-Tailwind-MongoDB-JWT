import { useState, useEffect } from 'react';

export function useGetAllConsults() {
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

  return { consults, isLoading, error, setConsults };
}

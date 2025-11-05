import { useState, useEffect } from 'react';

export function useClinicalRecord(id) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/clinical-records/${id}`);
        if (!res.ok) throw new Error('Error fetching clinical record');
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecord();
  }, [id]);

  return { data, isLoading, error };
}

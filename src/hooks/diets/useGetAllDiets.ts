import { useEffect, useState, useCallback } from 'react';
import { ZDiet } from '@/zod/diets/diet.schema';
import { dietsResponseSchema } from '@/zod/diets/api.diets.schema';

export function useGetAllDiets() {
  const [dietsData, setDietsData] = useState<ZDiet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch function
  const fetchDiets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/diets');
      if (!res.ok) throw new Error('Failed to fetch diets');

      const json = await res.json();
      const result = dietsResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error.format());
        throw new Error('Invalid diet data');
      }

      const data = result.data;

      setDietsData(data.diets);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchDiets();
  }, [fetchDiets]);

  return { dietsData, isLoading, error, refetch: fetchDiets };
}

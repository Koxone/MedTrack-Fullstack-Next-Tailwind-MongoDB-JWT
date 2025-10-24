// src/hooks/useClinicalRecords.js
import { useQuery } from '@tanstack/react-query';

export function useClinicalRecords(patientId) {
  return useQuery({
    queryKey: ['clinical-records', patientId],
    queryFn: async () => {
      const res = await fetch('/api/clinical-records/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Error fetching records');
      return data.records;
    },
    enabled: !!patientId,
    staleTime: 1000 * 60 * 5, // 5 minutos sin refetch
  });
}

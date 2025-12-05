'use client';

import { useQuery } from '@tanstack/react-query';

export interface AppointmentItem {
  _id: string;
  patient: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  specialty: string;
  date: string;
  time: string;
  reason: string;
  phone: string;
  email: string;
  googleEventId: string;
  googleCalendarId: string;
  createdAt: string;
  updatedAt: string;
}

export function useGetMyAppointments(id?: string) {
  // Fetch function
  const fetchAppointments = async (): Promise<AppointmentItem[]> => {
    if (!id) return [];

    const res = await fetch(`/api/appointments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || 'Failed to fetch appointments');
    }

    return json.appointments ?? [];
  };

  // Query
  const query = useQuery({
    queryKey: ['patientAppointments', id],
    queryFn: fetchAppointments,
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  return {
    appointments: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: query.refetch,
  };
}

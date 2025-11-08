'use client';

import { useCallback, useEffect, useState } from 'react';

/* --- Helpers --- */
function parseDescription(desc) {
  if (!desc || typeof desc !== 'string') return {};
  const lines = desc
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const pick = (label) => {
    const line = lines.find((l) => l.toLowerCase().startsWith(label.toLowerCase()));
    if (!line) return '';
    return line.split(':').slice(1).join(':').trim();
  };

  return {
    paciente: pick('Paciente'),
    motivo: pick('Motivo de consulta'),
    telefono: pick('Teléfono'),
    email: pick('Correo'),
    fecha: pick('Fecha'),
    hora: pick('Hora'),
    especialidad: pick('Especialidad'),
    patientId: pick('Paciente ID'),
  };
}

function toTime(dateISO) {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Mexico_City',
  });
}

function dateKey(dateISO) {
  if (!dateISO) return '';
  const d = new Date(dateISO);
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
}

/* --- Normalizador --- */
function normalizeEvents(items, specialty) {
  return (items || []).map((ev) => {
    const fields = parseDescription(ev.description || '');
    const startISO = ev.start?.dateTime || ev.start?.date || null;
    const tipo =
      specialty === 'dental'
        ? 'Odontología'
        : specialty === 'weight'
          ? 'Control de Peso'
          : fields.especialidad || 'Consulta';

    return {
      id: ev.id,
      specialty,
      tipo,
      hora: toTime(startISO),
      paciente: fields.paciente || ev.summary || 'Paciente',
      telefono: fields.telefono || '',
      email: fields.email || ev.attendees?.[0]?.email || '',
      motivo: fields.motivo || '',
      startISO,
      _dateKey: dateKey(startISO),
      patientId: fields.patientId || '',
    };
  });
}

/* --- Hook para todas las citas de hoy --- */
export function useAllTodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodayAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/google/calendar/appointments/all');

      if (!res.ok) throw new Error('Error al cargar las citas');

      const json = await res.json();

      // Normalizar todas las especialidades
      const weight = normalizeEvents(json.weightEvents || [], 'weight');
      const dental = normalizeEvents(json.dentalEvents || [], 'dental');
      const all = [...weight, ...dental];

      // Fecha local correcta
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' });
      const todayAppointments = all.filter((ev) => ev._dateKey === today);

      setAppointments(todayAppointments);
    } catch (e) {
      setError(e.message || 'Error desconocido');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodayAppointments();
  }, [fetchTodayAppointments]);

  return { appointments, loading, error, refetch: fetchTodayAppointments };
}

import { CurrentUserData } from '../user/user.types';

export interface ParsedDescription {
  paciente?: string;
  motivo?: string;
  telefono?: string;
  email?: string;
  fecha?: string;
  hora?: string;
  especialidad?: string;
  patientId?: string;
}

export interface CalendarEvent {
  id: string;
  description?: string;
  summary?: string;
  start?: {
    dateTime?: string;
    date?: string;
  };
  attendees?: { email?: string }[];
}

export interface NormalizedAppointment {
  id: string;
  specialty: CurrentUserData['specialty'];
  tipo: string;
  hora: string;
  paciente: string;
  telefono: string;
  email: string;
  motivo: string;
  startISO: string | null;
  _dateKey: string;
  patientId: string;
}

// Params
export interface CreateAppointmentParams {
  patientId?: string;
  patientName: string;
  date: string;
  time: string;
  phone?: string;
  email?: string;
  reason: string;
  specialty: string;
}

// Response
export interface AppointmentResponse {
  success: boolean;
  data?: any;
  message?: string;
}

// Hook return
export interface UseCreateAppointmentResult {
  createAppointment: (params: CreateAppointmentParams) => Promise<AppointmentResponse>;
  loading: boolean;
  error: string | null;
  data: any | null;
  reset: () => void;
}

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
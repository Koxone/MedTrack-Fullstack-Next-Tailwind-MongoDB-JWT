'use client';

import DashboardLayout from '@/components/shared/layouts/DashboardLayout';
import HeaderWelcome from '@/components/shared/dashboard/header/HeaderWelcome';
import AppointmentsToday from '@/components/shared/dashboard/appointmentsToday/AppointmentsToday';
import DoctorAccountingSummary from '@/components/sections/doctor/dashboard/components/DoctorAccountingSummary';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';
import { useTodayAppointmentsBySpecialty } from '@/hooks/appointments/useTodayAppointmentsBySpecialty';
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import DoctorStatsGrid from './components/DoctorStatsGrid';
import { getConsultTotals } from '../../employee/consultations/utils/getConsultTotals';
import { useGetAllConsults } from '@/hooks/consults/useGetAllConsults';

export default function DoctorDashboard({ currentUser, role, specialty }) {
  // Google Calendar Custom Hooks
  const { appointments, loading, error } = useTodayAppointmentsBySpecialty();

  // Custom Hooks
  const {
    inventory,
    loading: loadingInventory,
    error: errorInventory,
    setInventory,
  } = useGetFullInventory();

  // All Consults
  const {
    consults,
    loading: loadingConsults,
    error: errorConsults,
  } = useGetAllConsults({ speciality: specialty });

  const { consultPrice, totalItemsSold, totalCost } = getConsultTotals(consults);

  if (loading || loadingInventory || loadingConsults) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
      </div>
    );
  }
  return (
    <DashboardLayout>
      {/* Header */}
      <HeaderWelcome fullName={currentUser?.fullName} role="doctor" />

      {/* Stats */}
      <DoctorStatsGrid role="doctor" specialty={specialty} />

      {/* Appointments */}
      <AppointmentsToday role={currentUser?.role} appointments={appointments} />

      {/* Summaries */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <DoctorAccountingSummary
          role={role}
          consultPrice={consultPrice}
          totalItemsSold={totalItemsSold}
          totalCost={totalCost}
          consults={consults}
        />
        <SharedInventoryAlerts
          inventory={inventory}
          role={currentUser?.role}
          loading={loadingInventory}
        />
      </div>
    </DashboardLayout>
  );
}

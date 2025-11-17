'use client';

import { useState } from 'react';

import MetricsGrid from './components/MetricsGrid';
import WeeklyIncomeChart from './components/WeeklyIncomeChart';
import DistributionCard from './components/DistributionCard';
import MedsSoldTable from '../../../shared/medsSold/MedsSoldTable';
import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
import TodayConsultsList from '@/components/shared/todayConsults/TodayConsultsList';
import { useGetAllConsults } from '@/hooks/useGetAllConsults';
import { getConsultTotals } from '../../employee/consultations/utils/getConsultTotals';

/* Demo data */
const ingresosSemanales = [
  { dia: 'Lun', consultas: 3200, medicamentos: 450 },
  { dia: 'Mar', consultas: 2800, medicamentos: 380 },
  { dia: 'Mié', consultas: 3600, medicamentos: 520 },
  { dia: 'Jue', consultas: 3000, medicamentos: 410 },
  { dia: 'Vie', consultas: 3800, medicamentos: 940 },
  { dia: 'Sáb', consultas: 2400, medicamentos: 320 },
  { dia: 'Dom', consultas: 0, medicamentos: 0 },
];

export default function DoctorAccounting({ role }) {
  // Get consults data
  const { consults, isLoading, isError } = useGetAllConsults();
  console.log(consults);

  // Calculate totals
  const totals = getConsultTotals(consults);
  const totalConsultsCost = totals?.consultPrice || 0;
  const totalItemsSold = totals?.totalItemsSold || 0;
  const totalCost = totals?.totalCost || 0;
  const quantityItemsSold = consults.reduce(
    (sum, consult) => sum + (consult.itemsSold?.length || 0),
    0
  );
  const metrics = {
    grandTotal: totalCost,
    consultsTotal: totalConsultsCost,
    medsTotal: totalItemsSold,
  };

  /* Derived */
  const incomeDistribution = [
    { name: 'Consultas', value: metrics.consultsTotal, color: '#3b82f6' },
    { name: 'Medicamentos', value: metrics.medsTotal, color: '#10b981' },
  ];

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      {/* Header */}
      <SharedSectionHeader
        Icon="accounting"
        role={role}
        title="Mis Finanzas"
        subtitle="Control financiero del consultorio"
      />

      {/* Metrics */}
      <MetricsGrid
        totalDia={metrics?.grandTotal || 0}
        totalConsultas={metrics?.consultsTotal || 0}
        totalMedicamentos={metrics?.medsTotal || 0}
        consultasCount={consults.length}
        medsCount={quantityItemsSold}
        promedio={(metrics?.grandTotal / consults.length).toFixed(2)}
      />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <WeeklyIncomeChart data={ingresosSemanales} />
        <DistributionCard data={incomeDistribution} />
      </div>

      {/* Tables */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 md:text-xl">Consultas del Día</h2>
        </div>

        <TodayConsultsList consultsData={consults} totals={metrics} />
      </div>

      <MedsSoldTable consultsData={consults} />
    </div>
  );
}

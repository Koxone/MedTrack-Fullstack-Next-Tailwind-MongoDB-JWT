'use client';

import { Weight, TrendingDown, Ruler, Clock } from 'lucide-react';
import PatientStatsCard from './PatientStatsCard';
import { useGetAllWeightLogs } from '@/hooks/clinicalRecords/get/useGetAllWeightLogs';

export default function PatientStatsGrid({ role }) {
  // Weight Logs Hook
  const {
    weightLogs,
    loading: weightLogsLoading,
    error: weightLogsError,
    refetch: refetchWeightLogs,
  } = useGetAllWeightLogs();

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {[
        {
          Icon: Weight,
          mainData: `${weightLogs[0]?.currentWeight} kg`,
          extraData: `${(
            ((weightLogs[0]?.originalWeight - weightLogs[0]?.currentWeight) /
              weightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Peso Actual',
          variant: 'primary',
        },
        {
          Icon: Ruler,
          mainData: `${weightLogs[0]?.currentSize} cm`,
          extraData: `${(
            ((weightLogs[0]?.originalSize - weightLogs[0]?.currentSize) /
              weightLogs[0]?.originalSize) *
            100
          ).toFixed(1)}%`,
          title: 'Talla Actual',
          variant: 'success',
        },
        {
          Icon: TrendingDown,
          mainData: `${weightLogs[0]?.currentWeight - weightLogs[0]?.originalWeight} kg`,
          extraData: `${(
            ((weightLogs[0]?.originalWeight - weightLogs[0]?.currentWeight) /
              weightLogs[0]?.originalWeight) *
            100
          ).toFixed(1)}%`,
          title: 'Progreso',
          variant: 'purple',
        },
        {
          Icon: Clock,
          mainData: `06 dias`,
          title: 'Tiempo para tu siguiente consulta',
          variant: 'success',
        },
      ].map((card, index) => (
        <PatientStatsCard
          key={index}
          role={role}
          Icon={card.Icon}
          href={card.href}
          mainData={card.mainData}
          extraData={card.extraData || null}
          title={card.title}
          variant={card.variant}
        />
      ))}
    </div>
  );
}

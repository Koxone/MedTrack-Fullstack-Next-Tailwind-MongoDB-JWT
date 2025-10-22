'use client';

/* imports */
import { useState } from 'react'; // state
import { useRouter } from 'next/navigation'; // navigation

/* components */
import HeaderWelcome from './Components/HeaderWelcome';
import MetricCards from './Components/MetricCards';
import EvolutionChart from './Components/EvolutionChart';
import QuickActions from './Components/QuickActions';
import MotivationalBanner from './Components/MotivationalBanner';

/* demo data */
const evolutionData = {
  peso: [
    { mes: 'Ene', valor: 85 },
    { mes: 'Feb', valor: 83 },
    { mes: 'Mar', valor: 81 },
    { mes: 'Abr', valor: 100 },
    { mes: 'May', valor: 77 },
    { mes: 'Jun', valor: 75 },
  ],
  imc: [
    { mes: 'Ene', valor: 27.8 },
    { mes: 'Feb', valor: 27.1 },
    { mes: 'Mar', valor: 26.4 },
    { mes: 'Abr', valor: 25.8 },
    { mes: 'May', valor: 25.1 },
    { mes: 'Jun', valor: 24.5 },
  ],
  cambio: [
    { mes: 'Ene', valor: 0 },
    { mes: 'Feb', valor: -2 },
    { mes: 'Mar', valor: -12 },
    { mes: 'Abr', valor: -2 },
    { mes: 'May', valor: -2 },
    { mes: 'Jun', valor: -2 },
  ],
};

/* demo data */
const metrics = [
  {
    id: 'peso',
    icon: 'Weight',
    title: 'Peso Actual',
    value: '75 kg',
    subtitle: 'Objetivo: 70 kg',
    color: 'blue',
    chartColor: '#3b82f6',
    chartTitle: 'Evolución de Peso',
    unit: 'kg',
  },
  {
    id: 'imc',
    icon: 'Activity',
    title: 'IMC Actual',
    value: '24.5',
    subtitle: 'Normal',
    color: 'green',
    chartColor: '#10b981',
    chartTitle: 'Evolución de IMC',
    unit: '',
  },
  {
    id: 'cambio',
    icon: 'TrendingDown',
    title: 'Cambio Semanal',
    value: '-0.5 kg',
    subtitle: '-2.5%',
    color: 'purple',
    chartColor: '#8b5cf6',
    chartTitle: 'Cambio de Peso Mensual',
    unit: 'kg',
  },
];

export default function PatientDashboard() {
  /* router */
  const router = useRouter();

  /* ui state */
  const [selectedMetric, setSelectedMetric] = useState('peso');

  /* derived */
  const currentMetric = metrics.find((m) => m.id === selectedMetric);
  const chartData = evolutionData[selectedMetric];

  /* handlers */
  const goHistory = () => router.push('/patient/history');
  const goNewAppointment = () => router.push('/patient/appointments/new');
  const goAppointments = () => router.push('/patient/appointments');
  const goDiets = () => router.push('/patient/diets');

  return (
    <div className="space-y-4 md:space-y-6">
      {/* header */}
      <HeaderWelcome />

      {/* metric cards + next appointment */}
      <MetricCards
        metrics={metrics}
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
        onOpenAppointments={goAppointments}
      />

      {/* evolution chart */}
      <EvolutionChart
        title={currentMetric.chartTitle}
        legendLabel={currentMetric.title}
        legendColor={currentMetric.chartColor}
        data={chartData}
        unit={currentMetric.unit}
        stroke={currentMetric.chartColor}
      />

      {/* quick actions */}
      <QuickActions onHistory={goHistory} onNewAppointment={goNewAppointment} onDiets={goDiets} />

      {/* motivational banner */}
      <MotivationalBanner
        message="Has perdido 10 kg desde que comenzaste. Mantén tu rutina de alimentación y ejercicio."
        ctaLabel="Ver mi progreso"
        onCta={goHistory}
      />
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import DashboardCard from "../../sections/global/DashboardCard";
import { Weight, Activity, Calendar, Apple, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weightData = [
  { date: "Ene", peso: 85 },
  { date: "Feb", peso: 83 },
  { date: "Mar", peso: 81 },
  { date: "Abr", peso: 79 },
  { date: "May", peso: 77 },
  { date: "Jun", peso: 75 },
];

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600">Bienvenido de vuelta</p>
      </div>

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <DashboardCard
          icon={Weight}
          title="Peso Actual"
          value="75 kg"
          subtitle="Objetivo: 70 kg"
          color="blue"
        />
        <DashboardCard
          icon={Activity}
          title="IMC Actual"
          value="24.5"
          subtitle="Normal"
          color="green"
        />
        <DashboardCard
          icon={TrendingDown}
          title="Cambio Semanal"
          value="-0.5 kg"
          trend={-2.5}
          color="green"
        />
        <DashboardCard
          icon={Calendar}
          title="Próxima Cita"
          value="25 Oct"
          subtitle="Dr. García"
          color="purple"
        />
      </div>

      {/* Gráfica de evolución */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Evolución de Peso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="peso" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <button
            onClick={() => router.push("/patient/history")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
          >
            <Activity className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-semibold text-gray-900">Ver Historial</h3>
            <p className="text-sm text-gray-600">Consulta tu historial clínico</p>
          </button>
          <button
            onClick={() => router.push("/patient/appointments")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
          >
            <Calendar className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="font-semibold text-gray-900">Agendar Cita</h3>
            <p className="text-sm text-gray-600">Programa tu próxima consulta</p>
          </button>
          <button
            onClick={() => router.push("/patient/diets")}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition text-left"
          >
            <Apple className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-gray-900">Ver Dieta</h3>
            <p className="text-sm text-gray-600">Revisa tu plan nutricional</p>
          </button>
        </div>
      </div>
    </div>
  );
}


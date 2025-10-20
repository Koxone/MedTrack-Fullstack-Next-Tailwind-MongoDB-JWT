
"use client";

import { useRouter } from "next/navigation";
import DashboardCard from "../../sections/global/DashboardCard";
import { Users, Calendar, Apple, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const progressData = [
  { mes: "Ene", pacientes: 45 },
  { mes: "Feb", pacientes: 52 },
  { mes: "Mar", pacientes: 48 },
  { mes: "Abr", pacientes: 61 },
  { mes: "May", pacientes: 55 },
  { mes: "Jun", pacientes: 67 },
];

const upcomingAppointments = [
  { id: 1, paciente: "Juan Pérez", hora: "10:00", motivo: "Control mensual" },
  { id: 2, paciente: "María López", hora: "11:30", motivo: "Revisión de dieta" },
  { id: 3, paciente: "Carlos Ruiz", hora: "15:00", motivo: "Primera consulta" },
];

export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard Médico</h1>
        <p className="text-gray-600">Resumen de tu práctica médica</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={Users}
          title="Pacientes Activos"
          value="67"
          trend={8.2}
          color="blue"
        />
        <DashboardCard
          icon={Calendar}
          title="Citas Pendientes"
          value="12"
          subtitle="Esta semana"
          color="yellow"
        />
        <DashboardCard
          icon={Apple}
          title="Dietas Enviadas"
          value="34"
          subtitle="Este mes"
          color="green"
        />
        <DashboardCard
          icon={TrendingUp}
          title="Tasa de Éxito"
          value="94%"
          trend={3.1}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Citas de Hoy</h2>
          <div className="space-y-3">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900">{apt.paciente}</p>
                  <p className="text-sm text-gray-600">{apt.motivo}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{apt.hora}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Pacientes por Mes</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pacientes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


"use client";

import DashboardCard from "../../sections/global/DashboardCard";
import { Users, TrendingDown, Calendar, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const imcData = [
  { mes: "Ene", imc: 26.5 },
  { mes: "Feb", imc: 26.2 },
  { mes: "Mar", imc: 25.8 },
  { mes: "Abr", imc: 25.4 },
  { mes: "May", imc: 25.0 },
  { mes: "Jun", imc: 24.6 },
];

const weightLossData = [
  { mes: "Ene", perdida: 2.5 },
  { mes: "Feb", perdida: 3.2 },
  { mes: "Mar", perdida: 2.8 },
  { mes: "Abr", perdida: 3.5 },
  { mes: "May", perdida: 3.0 },
  { mes: "Jun", perdida: 3.8 },
];

const appointmentsData = [
  { mes: "Ene", citas: 45 },
  { mes: "Feb", citas: 52 },
  { mes: "Mar", citas: 48 },
  { mes: "Abr", citas: 61 },
  { mes: "May", citas: 55 },
  { mes: "Jun", citas: 67 },
];

const progressDistribution = [
  { name: "Excelente", value: 45, color: "#10b981" },
  { name: "Bueno", value: 30, color: "#3b82f6" },
  { name: "Regular", value: 20, color: "#f59e0b" },
  { name: "Necesita Atención", value: 5, color: "#ef4444" },
];

export default function DoctorAnalytics() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Estadísticas y Análisis</h1>
        <p className="text-gray-600">Métricas de rendimiento de tu práctica</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          icon={Users}
          title="Total Pacientes"
          value="67"
          trend={12.5}
          color="blue"
        />
        <DashboardCard
          icon={TrendingDown}
          title="Pérdida Promedio"
          value="3.2 kg"
          subtitle="Por mes"
          color="green"
        />
        <DashboardCard
          icon={Calendar}
          title="Citas Completadas"
          value="67"
          subtitle="Este mes"
          color="purple"
        />
        <DashboardCard
          icon={Target}
          title="Tasa de Éxito"
          value="94%"
          trend={5.2}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">IMC Promedio</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={imcData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="imc" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Pérdida de Peso Global</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weightLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="perdida" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Citas Completadas Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="citas" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Distribución de Progreso</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={progressDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {progressDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

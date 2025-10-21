"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, User, DollarSign, TrendingUp, AlertTriangle, 
  Package, Pill, Users, Activity, RefreshCw, X, AlertCircle,
  ChevronRight, FileText, Syringe
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Datos de ejemplo
const ingresosSemanales = [
  { dia: "Lun", ingresos: 3650 },
  { dia: "Mar", ingresos: 3180 },
  { dia: "Mié", ingresos: 4120 },
  { dia: "Jue", ingresos: 3410 },
  { dia: "Vie", ingresos: 4740 },
  { dia: "Sáb", ingresos: 2720 },
  { dia: "Hoy", ingresos: 3800 },
];

const pacientesSemana = [
  { dia: "Lun", pacientes: 5 },
  { dia: "Mar", pacientes: 4 },
  { dia: "Mié", pacientes: 6 },
  { dia: "Jue", pacientes: 4 },
  { dia: "Vie", pacientes: 7 },
  { dia: "Sáb", pacientes: 3 },
  { dia: "Hoy", pacientes: 5 },
];

export default function DoctorDashboard() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [citaToCancel, setCitaToCancel] = useState(null);

  const [citasHoy, setCitasHoy] = useState([
    { id: 1, hora: "09:00", paciente: "Juan Pérez", tipo: "Primera Consulta", estado: "Confirmada", avatar: "JP" },
    { id: 2, hora: "10:30", paciente: "María López", tipo: "Seguimiento", estado: "Confirmada", avatar: "ML" },
    { id: 3, hora: "11:00", paciente: "Carlos Ruiz", tipo: "Control de Peso", estado: "Pendiente", avatar: "CR" },
    { id: 4, hora: "15:00", paciente: "Ana Martínez", tipo: "Consulta General", estado: "Confirmada", avatar: "AM" },
    { id: 5, hora: "16:30", paciente: "Pedro García", tipo: "Seguimiento", estado: "Confirmada", avatar: "PG" },
  ]);

  // Datos de contabilidad
  const contabilidadHoy = {
    totalIngresos: 3800,
    consultas: 5,
    ingresosConsultas: 3200,
    medicamentosVendidos: 4,
    ingresosMedicamentos: 600,
    pendientesCobro: 800,
  };

  // Datos de inventario
  const inventarioAlertas = [
    { nombre: "Atorvastatina 20mg", stock: 12, minimo: 15, tipo: "medicamento" },
    { nombre: "Omeprazol 20mg", stock: 8, minimo: 25, tipo: "medicamento" },
    { nombre: "Receta Especial", stock: 12, minimo: 15, tipo: "receta" },
    { nombre: "Alcohol 70%", stock: 8, minimo: 15, tipo: "suministro" },
  ];

  const handleReagendar = (cita) => {
    // Guardar datos de la cita en localStorage
    localStorage.setItem('reagendarCita', JSON.stringify(cita));
    router.push('/doctor/calendar');
  };

  const openCancelModal = (cita) => {
    setCitaToCancel(cita);
    setShowCancelModal(true);
  };

  const handleCancelar = () => {
    setCitasHoy(citasHoy.map(c => 
      c.id === citaToCancel.id ? { ...c, estado: "Cancelada" } : c
    ));
    setShowCancelModal(false);
    setCitaToCancel(null);
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      "Confirmada": "bg-green-100 text-green-800 border-green-200",
      "Pendiente": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Cancelada": "bg-red-100 text-red-800 border-red-200",
    };
    return badges[estado] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Bienvenido, Dr. García
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Hoy</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-1">${contabilidadHoy.totalIngresos.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-blue-100">Ingresos totales</p>
        </div>

        <div 
          onClick={() => router.push('/doctor/calendar')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-green-300 transition active:scale-95"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">{citasHoy.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{citasHoy.filter(c => c.estado !== "Cancelada").length}</p>
          <p className="text-xs md:text-sm text-gray-600">Citas de hoy</p>
        </div>

        <div 
          onClick={() => router.push('/doctor/accounting')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 cursor-pointer hover:border-purple-300 transition active:scale-95"
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">+12%</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${(contabilidadHoy.totalIngresos / citasHoy.length).toFixed(0)}</p>
          <p className="text-xs md:text-sm text-gray-600">Promedio/paciente</p>
        </div>

        <div 
          onClick={() => router.push('/doctor/inventory')}
          className={`rounded-xl shadow-sm border-2 p-4 md:p-6 cursor-pointer transition active:scale-95 ${
            inventarioAlertas.length > 0 
              ? "bg-red-50 border-red-200 hover:border-red-300" 
              : "bg-white border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className={`w-8 h-8 ${inventarioAlertas.length > 0 ? "text-red-500" : "text-gray-400"}`} />
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              inventarioAlertas.length > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"
            }`}>
              {inventarioAlertas.length > 0 ? "Revisar" : "Todo bien"}
            </span>
          </div>
          <p className={`text-2xl md:text-3xl font-bold mb-1 ${inventarioAlertas.length > 0 ? "text-red-600" : "text-gray-900"}`}>
            {inventarioAlertas.length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Alertas inventario</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Ingresos de la semana */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Ingresos de la Semana</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ingresosSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Line type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pacientes atendidos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Pacientes por Día</h2>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pacientesSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="pacientes" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Citas de hoy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Citas de Hoy</h2>
          <button
            onClick={() => router.push('/doctor/calendar')}
            className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm active:scale-95"
          >
            Ver calendario
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {citasHoy.map((cita) => (
            <div
              key={cita.id}
              className={`border-2 rounded-xl p-4 transition ${
                cita.estado === "Cancelada" 
                  ? "border-gray-200 bg-gray-50 opacity-60" 
                  : "border-gray-200 hover:border-blue-300 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {cita.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{cita.paciente}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getEstadoBadge(cita.estado)}`}>
                      {cita.estado}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{cita.hora}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{cita.tipo}</span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                {cita.estado !== "Cancelada" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleReagendar(cita)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition active:scale-95"
                      title="Reagendar"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openCancelModal(cita)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition active:scale-95"
                      title="Cancelar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de contabilidad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Contabilidad */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Resumen Contable</h2>
            <button
              onClick={() => router.push('/doctor/accounting')}
              className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm active:scale-95"
            >
              Ver más
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Consultas</p>
                  <p className="font-semibold text-gray-900">{contabilidadHoy.consultas} pacientes</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">${contabilidadHoy.ingresosConsultas}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Pill className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Medicamentos</p>
                  <p className="font-semibold text-gray-900">{contabilidadHoy.medicamentosVendidos} vendidos</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">${contabilidadHoy.ingresosMedicamentos}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pendiente de cobro</p>
                  <p className="font-semibold text-gray-900">1 consulta</p>
                </div>
              </div>
              <p className="text-lg font-bold text-yellow-600">${contabilidadHoy.pendientesCobro}</p>
            </div>
          </div>
        </div>

        {/* Alertas de inventario */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Alertas de Inventario</h2>
            <button
              onClick={() => router.push('/doctor/inventory')}
              className="flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition text-sm active:scale-95"
            >
              Ver más
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {inventarioAlertas.length > 0 ? (
            <div className="space-y-2">
              {inventarioAlertas.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      {item.tipo === "medicamento" && <Pill className="w-4 h-4 text-red-600" />}
                      {item.tipo === "receta" && <FileText className="w-4 h-4 text-red-600" />}
                      {item.tipo === "suministro" && <Syringe className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.nombre}</p>
                      <p className="text-xs text-red-600">Stock: {item.stock} / Mín: {item.minimo}</p>
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No hay alertas de inventario</p>
              <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
            </div>
          )}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => router.push('/doctor/patients')}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Users className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Ver Pacientes</p>
          </button>
          <button
            onClick={() => router.push('/doctor/calendar')}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Calendar className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Calendario</p>
          </button>
          <button
            onClick={() => router.push('/doctor/accounting')}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <DollarSign className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Contabilidad</p>
          </button>
          <button
            onClick={() => router.push('/doctor/inventory')}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-lg transition active:scale-95 backdrop-blur-sm"
          >
            <Package className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm font-medium">Inventario</p>
          </button>
        </div>
      </div>

      {/* Modal Cancelar Cita */}
      {showCancelModal && citaToCancel && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Cancelar Cita</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  ¿Estás seguro de que deseas cancelar esta cita?
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">{citaToCancel.paciente}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <p className="text-sm text-gray-700">{citaToCancel.hora}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <p className="text-sm text-gray-700">{citaToCancel.tipo}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> El paciente será notificado de la cancelación.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95"
                  >
                    Mantener cita
                  </button>
                  <button
                    onClick={handleCancelar}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
                  >
                    Sí, cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


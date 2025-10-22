'use client';

import { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Edit2,
  X,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Filter,
  Sparkles,
  Users,
  TrendingUp,
} from 'lucide-react';

export default function EmployeeAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [citaToCancel, setCitaToCancel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todas');

  const [citas, setCitas] = useState([
    {
      id: 1,
      fecha: '2024-10-21',
      hora: '09:00',
      paciente: 'Juan Pérez',
      telefono: '555-0101',
      email: 'juan@email.com',
      motivo: 'Primera Consulta',
      estado: 'Confirmada',
      avatar: 'JP',
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      telefono: '555-0102',
      email: 'maria@email.com',
      motivo: 'Seguimiento',
      estado: 'Pendiente',
      avatar: 'ML',
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      telefono: '555-0103',
      email: 'carlos@email.com',
      motivo: 'Control de Peso',
      estado: 'Confirmada',
      avatar: 'CR',
    },
    {
      id: 4,
      fecha: '2024-10-22',
      hora: '15:00',
      paciente: 'Ana Martínez',
      telefono: '555-0104',
      email: 'ana@email.com',
      motivo: 'Consulta General',
      estado: 'Pendiente',
      avatar: 'AM',
    },
    {
      id: 5,
      fecha: '2024-10-22',
      hora: '16:30',
      paciente: 'Pedro García',
      telefono: '555-0105',
      email: 'pedro@email.com',
      motivo: 'Seguimiento',
      estado: 'Confirmada',
      avatar: 'PG',
    },
  ]);

  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    const newCita = {
      id: editingCita ? editingCita.id : Date.now(),
      ...citaForm,
      estado: 'Pendiente',
      avatar: citaForm.paciente
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase(),
    };

    if (editingCita) {
      setCitas(citas.map((c) => (c.id === editingCita.id ? newCita : c)));
    } else {
      setCitas([...citas, newCita]);
    }
    setShowModal(false);
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
  };

  const handleCancel = () => {
    setCitas(citas.map((c) => (c.id === citaToCancel.id ? { ...c, estado: 'Cancelada' } : c)));
    setShowCancelModal(false);
  };

  const filteredCitas = citas.filter((c) => {
    const matchSearch =
      c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm);
    const matchFilter = filterEstado === 'Todas' || c.estado === filterEstado;
    return matchSearch && matchFilter;
  });

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelada':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = {
    total: citas.length,
    confirmadas: citas.filter((c) => c.estado === 'Confirmada').length,
    pendientes: citas.filter((c) => c.estado === 'Pendiente').length,
    canceladas: citas.filter((c) => c.estado === 'Cancelada').length,
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header mejorado */}
      <div className="-mx-4 -mt-4 mb-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 pt-6 pb-8 md:rounded-2xl">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-start gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 p-3 shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Gestión de Citas
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Agendar y administrar citas de pacientes
              </p>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              {
                label: 'Total',
                value: stats.total,
                icon: Calendar,
                gradient: 'from-blue-500 to-indigo-600',
                bg: 'from-blue-50 to-indigo-50',
              },
              {
                label: 'Confirmadas',
                value: stats.confirmadas,
                icon: CheckCircle,
                gradient: 'from-emerald-500 to-green-600',
                bg: 'from-emerald-50 to-green-50',
              },
              {
                label: 'Pendientes',
                value: stats.pendientes,
                icon: Clock,
                gradient: 'from-amber-500 to-orange-600',
                bg: 'from-amber-50 to-orange-50',
              },
              {
                label: 'Canceladas',
                value: stats.canceladas,
                icon: X,
                gradient: 'from-rose-500 to-red-600',
                bg: 'from-rose-50 to-red-50',
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={`bg-gradient-to-br ${stat.bg} animate-fadeInUp rounded-2xl border-2 border-gray-200 p-4 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-medium text-gray-600 md:text-sm">{stat.label}</p>
                    <div className={`bg-gradient-to-br p-1.5 ${stat.gradient} rounded-lg`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Filtros y búsqueda mejorados */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-12 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="cursor-pointer appearance-none rounded-xl border-2 border-gray-200 py-3 pr-8 pl-10 font-semibold transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                >
                  <option>Todas</option>
                  <option>Confirmada</option>
                  <option>Pendiente</option>
                  <option>Cancelada</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setEditingCita(null);
                  setCitaForm({
                    fecha: '',
                    hora: '',
                    paciente: '',
                    telefono: '',
                    email: '',
                    motivo: '',
                  });
                  setShowModal(true);
                }}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 active:scale-95"
              >
                <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
                <span className="hidden sm:inline">Agendar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de citas mejorada */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCitas.map((cita, index) => (
            <div
              key={cita.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className={`group animate-fadeInUp relative overflow-hidden rounded-2xl border-2 bg-white p-5 transition-all duration-300 hover:shadow-xl ${
                cita.estado === 'Cancelada'
                  ? 'border-rose-200 bg-gradient-to-r from-rose-50/50 to-white opacity-75'
                  : 'border-gray-200 hover:scale-[1.01] hover:border-emerald-300'
              }`}
            >
              {/* Elemento decorativo */}
              <div
                className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-5 transition-all duration-300 ${
                  cita.estado === 'Cancelada'
                    ? 'bg-rose-500'
                    : 'bg-emerald-500 group-hover:scale-150'
                }`}
              />

              <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  {/* Avatar */}
                  <div
                    className={`relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
                      cita.estado === 'Cancelada'
                        ? 'bg-gradient-to-br from-gray-300 to-gray-400'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 group-hover:scale-110 group-hover:shadow-xl'
                    }`}
                  >
                    {cita.avatar}
                    {cita.estado !== 'Cancelada' && (
                      <div
                        className={`absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white ${
                          cita.estado === 'Confirmada'
                            ? 'bg-green-500'
                            : 'animate-pulse bg-amber-500'
                        }`}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3 className="truncate text-lg font-bold text-gray-900">{cita.paciente}</h3>
                      <span
                        className={`rounded-lg border px-3 py-1 text-xs font-bold ${getEstadoBadge(cita.estado)}`}
                      >
                        {cita.estado}
                      </span>
                    </div>

                    <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
                        <Calendar className="h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700">{cita.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-1.5">
                        <Clock className="h-4 w-4 flex-shrink-0 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">{cita.hora}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5">
                        <Phone className="h-4 w-4 flex-shrink-0 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{cita.telefono}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5">
                        <Mail className="h-4 w-4 flex-shrink-0 text-amber-600" />
                        <span className="truncate text-sm font-medium text-gray-700">
                          {cita.email}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-3">
                      <div className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600" />
                        <div>
                          <p className="mb-1 text-xs font-semibold text-indigo-900">
                            Motivo de consulta
                          </p>
                          <p className="text-sm font-medium text-gray-700">{cita.motivo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                {cita.estado !== 'Cancelada' && (
                  <div className="flex flex-shrink-0 gap-2 sm:flex-col lg:flex-row">
                    <button
                      onClick={() => {
                        setEditingCita(cita);
                        setCitaForm({
                          fecha: cita.fecha,
                          hora: cita.hora,
                          paciente: cita.paciente,
                          telefono: cita.telefono,
                          email: cita.email,
                          motivo: cita.motivo,
                        });
                        setShowModal(true);
                      }}
                      className="group/btn flex items-center justify-center gap-2 rounded-xl border-2 border-blue-200 p-3 text-blue-600 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 active:scale-95"
                      title="Editar"
                    >
                      <Edit2 className="h-5 w-5 transition-transform duration-200 group-hover/btn:rotate-12" />
                    </button>
                    <button
                      onClick={() => {
                        setCitaToCancel(cita);
                        setShowCancelModal(true);
                      }}
                      className="group/btn flex items-center justify-center gap-2 rounded-xl border-2 border-rose-200 p-3 text-rose-600 transition-all duration-200 hover:border-rose-400 hover:bg-rose-50 active:scale-95"
                      title="Cancelar"
                    >
                      <X className="h-5 w-5 transition-transform duration-200 group-hover/btn:rotate-90" />
                    </button>
                  </div>
                )}

                {cita.estado === 'Cancelada' && (
                  <div className="flex flex-shrink-0 items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                    <span className="text-sm font-semibold whitespace-nowrap text-rose-600">
                      Cita cancelada
                    </span>
                  </div>
                )}
              </div>

              {/* Barra decorativa */}
              {cita.estado !== 'Cancelada' && (
                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredCitas.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-emerald-50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Calendar className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">No se encontraron citas</h3>
            <p className="mb-6 text-gray-600">Intenta con otros filtros o agenda una nueva cita</p>
          </div>
        )}
      </div>

      {/* Modal Agregar/Editar mejorado */}
      {showModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative sticky top-0 z-10 overflow-hidden rounded-t-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                      {editingCita ? (
                        <Edit2 className="h-6 w-6 text-white" />
                      ) : (
                        <Plus className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {editingCita ? 'Editar' : 'Agendar'} Cita
                      </h2>
                      <p className="text-sm text-emerald-100">
                        {editingCita
                          ? 'Actualiza los detalles de la cita'
                          : 'Programa una nueva cita'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-xl p-2 transition-all duration-200 hover:bg-white/20"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-5 p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Calendar className="h-4 w-4 text-emerald-600" />
                      Fecha
                    </label>
                    <input
                      type="date"
                      required
                      value={citaForm.fecha}
                      onChange={(e) => setCitaForm({ ...citaForm, fecha: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      Hora
                    </label>
                    <input
                      type="time"
                      required
                      value={citaForm.hora}
                      onChange={(e) => setCitaForm({ ...citaForm, hora: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-semibold transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <User className="h-4 w-4 text-emerald-600" />
                    Paciente
                  </label>
                  <input
                    type="text"
                    required
                    value={citaForm.paciente}
                    onChange={(e) => setCitaForm({ ...citaForm, paciente: e.target.value })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    placeholder="Nombre completo del paciente"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Phone className="h-4 w-4 text-emerald-600" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      required
                      value={citaForm.telefono}
                      onChange={(e) => setCitaForm({ ...citaForm, telefono: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                      placeholder="555-0000"
                    />
                  </div>
                  <div>
                    <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Mail className="h-4 w-4 text-emerald-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={citaForm.email}
                      onChange={(e) => setCitaForm({ ...citaForm, email: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    Motivo de la consulta
                  </label>
                  <textarea
                    required
                    value={citaForm.motivo}
                    onChange={(e) => setCitaForm({ ...citaForm, motivo: e.target.value })}
                    className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition-all duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                    rows="4"
                    placeholder="Describe el motivo de la consulta..."
                  ></textarea>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 active:scale-95"
                  >
                    {editingCita ? 'Actualizar Cita' : 'Agendar Cita'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal Cancelar mejorado */}
      {showCancelModal && citaToCancel && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-rose-600 to-red-600 px-6 py-5">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-2 backdrop-blur-sm">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cancelar Cita</h2>
                    <p className="text-sm text-rose-100">Esta acción no se puede deshacer</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5 p-6">
                <p className="text-base text-gray-700">
                  ¿Estás seguro de que deseas cancelar esta cita?
                </p>

                <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-rose-50 p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-red-600 font-bold text-white shadow-lg">
                      {citaToCancel.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 font-bold text-gray-900">{citaToCancel.paciente}</p>
                      <p className="text-sm text-gray-600">
                        {citaToCancel.fecha} • {citaToCancel.hora}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="mb-1 text-xs text-gray-500">Motivo</p>
                    <p className="text-sm font-medium text-gray-700">{citaToCancel.motivo}</p>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95"
                  >
                    Mantener Cita
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:from-rose-700 hover:to-red-700 active:scale-95"
                  >
                    Sí, Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

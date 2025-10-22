'use client';

import { useRouter, useParams } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/es';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Plus,
  X,
  Edit2,
  Activity,
  TrendingUp,
  FileText,
  Stethoscope,
  Heart,
  Scale,
  Droplet,
  ClipboardList,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useState, useEffect } from 'react';

export default function DoctorPatientDetail() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);
  const [historyForm, setHistoryForm] = useState({
    fecha: '',
    peso: '',
    imc: '',
    presionArterial: '',
    glucosa: '',
    colesterol: '',
    notas: '',
    diagnostico: '',
    tratamiento: '',
  });

  // obtener paciente por id
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`/api/users/${patientId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al obtener paciente');
        setPatient(data.user);
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchPatient();
  }, [patientId]);

  // obtener registros clínicos por id
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch(`/api/clinical-records/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientId }),
        });
        const data = await res.json();
        if (res.ok) {
          setRecords(data.records || []);
          const mapped = (data.records || []).map((r) => ({
            fecha: new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
              month: 'short',
              day: 'numeric',
            }),
            peso: r.pesoActual,
          }));
          setWeightData(mapped);
        } else {
          setRecords([]);
          setWeightData([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (patientId) fetchRecords();
  }, [patientId]);

  const openHistoryModal = (record = null) => {
    if (record) {
      setEditingHistory(record);
      setHistoryForm({
        fecha: record.fechaRegistro?.split('T')[0] || '',
        peso: record.pesoActual || '',
        imc: record.indiceMasaCorporal || '',
        presionArterial: record.presionArterial || '',
        glucosa: record.glucosa || '',
        colesterol: record.colesterol || '',
        notas: record.notas || '',
        diagnostico: record.diagnostico || '',
        tratamiento: record.tratamiento || '',
      });
    } else {
      setEditingHistory(null);
      setHistoryForm({
        fecha: new Date().toISOString().split('T')[0],
        peso: '',
        imc: '',
        presionArterial: '',
        glucosa: '',
        colesterol: '',
        notas: '',
        diagnostico: '',
        tratamiento: '',
      });
    }
    setShowHistoryModal(true);
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setEditingHistory(null);
  };

  const handleHistorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/clinical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...historyForm,
          edad: 0,
          genero: 'N/A',
          altura: 0,
          pesoActual: historyForm.peso,
          pesoObjetivo: 0,
          habitosAlimenticios: 'N/A',
          motivoConsulta: historyForm.diagnostico,
          tipoConsulta: 'general',
          fechaRegistro: historyForm.fecha,
          patientId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Historial guardado correctamente');
        closeHistoryModal();
        // Recargar registros
        window.location.reload();
      } else {
        alert(data.error || 'Error al guardar historial');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!patient)
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-lg font-medium text-gray-600">Cargando información del paciente...</p>
        </div>
      </div>
    );

  // Calcular estadísticas
  const totalConsultas = records.length;
  const ultimoPeso = records.length > 0 ? records[0].pesoActual : 'N/A';
  const ultimoIMC = records.length > 0 ? records[0].indiceMasaCorporal?.toFixed(1) : 'N/A';

  return (
    <div className="space-y-6">
      <div className='grid grid-rows-[auto_1fr]'>
        {/* Botón de volver mejorado */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 active:scale-95"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Volver a Pacientes</span>
        </button>

        {/* Header con gradiente y avatar mejorado */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 p-8 shadow-xl">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center">
            {/* Avatar mejorado */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-full bg-white opacity-75 blur-xl transition-opacity group-hover:opacity-100"></div>
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
                <User className="h-14 w-14 text-blue-600" />
              </div>
              <div className="absolute -right-2 -bottom-2 rounded-full bg-green-500 p-2 shadow-lg ring-4 ring-white">
                <Activity className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Información del paciente */}
            <div className="flex-1 text-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
                <Stethoscope className="h-4 w-4" />
                <span className="text-sm font-medium">Paciente Activo</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold">{patient?.fullName}</h1>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-blue-100">Correo</p>
                    <p className="truncate text-sm font-semibold">{patient?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100">Teléfono</p>
                    <p className="text-sm font-semibold">{patient?.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-100">Registro</p>
                    <p className="text-sm font-semibold">
                      {moment(patient?.createdAt).format('DD/MM/YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="group rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 p-6 shadow-lg transition-all duration-300 hover:scale-105">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-green-200 p-3 transition-transform duration-300 group-hover:scale-110">
              <FileText className="h-6 w-6 text-green-700" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="mb-1 text-3xl font-bold text-gray-900">{totalConsultas}</p>
          <p className="text-sm text-gray-700">Consultas Totales</p>
        </div>

        <div className="group rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-100 p-6 shadow-lg transition-all duration-300 hover:scale-105">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-blue-200 p-3 transition-transform duration-300 group-hover:scale-110">
              <Scale className="h-6 w-6 text-blue-700" />
            </div>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mb-1 text-3xl font-bold text-gray-900">{ultimoPeso}</p>
          <p className="text-sm text-gray-700">Peso Actual (kg)</p>
        </div>

        <div className="group rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-100 p-6 shadow-lg transition-all duration-300 hover:scale-105">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-xl bg-purple-200 p-3 transition-transform duration-300 group-hover:scale-110">
              <Heart className="h-6 w-6 text-purple-700" />
            </div>
            <Activity className="h-5 w-5 text-purple-600" />
          </div>
          <p className="mb-1 text-3xl font-bold text-gray-900">{ultimoIMC}</p>
          <p className="text-sm text-gray-700">IMC Actual</p>
        </div>
      </div>

      {/* Gráfica de evolución mejorada */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Evolución de Peso</h2>
              <p className="text-sm text-gray-500">Seguimiento del progreso del paciente</p>
            </div>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2">
            <span className="text-sm font-semibold text-blue-700">
              {weightData.length} registros
            </span>
          </div>
        </div>

        {weightData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="colorPeso" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="fecha"
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: '500' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                label={{
                  value: 'Peso (kg)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: '#6b7280' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="peso"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#colorPeso)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
            <TrendingUp className="mb-3 h-12 w-12 text-gray-300" />
            <p className="mb-1 font-medium text-gray-600">Sin datos de evolución</p>
            <p className="text-sm text-gray-500">Agrega registros para ver el progreso</p>
          </div>
        )}
      </div>

      {/* Historial clínico mejorado */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Historial Clínico</h2>
              <p className="text-sm text-gray-500">Registros médicos del paciente</p>
            </div>
          </div>
          <button
            onClick={() => openHistoryModal()}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            Agregar
          </button>
        </div>

        {records.length > 0 ? (
          <div className="space-y-3">
            {records.map((r, index) => (
              <div
                key={r._id}
                className="group rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideIn 0.3s ease-out forwards',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-1 items-start gap-4">
                    {/* Icono de fecha */}
                    <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <span className="text-xs font-medium">
                        {new Date(r.fechaRegistro)
                          .toLocaleDateString('es-MX', { month: 'short' })
                          .toUpperCase()}
                      </span>
                      <span className="text-xl font-bold">
                        {new Date(r.fechaRegistro).getDate()}
                      </span>
                    </div>

                    {/* Información */}
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(r.fechaRegistro).toLocaleDateString('es-MX', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          Consulta
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2">
                          <Scale className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-xs text-blue-600">Peso</p>
                            <p className="text-sm font-bold text-blue-900">{r.pesoActual} kg</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-lg bg-purple-50 p-2">
                          <Heart className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="text-xs text-purple-600">IMC</p>
                            <p className="text-sm font-bold text-purple-900">
                              {r.indiceMasaCorporal?.toFixed(1)}
                            </p>
                          </div>
                        </div>

                        {r.presionArterial && (
                          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2">
                            <Activity className="h-4 w-4 text-red-600" />
                            <div>
                              <p className="text-xs text-red-600">Presión</p>
                              <p className="text-sm font-bold text-red-900">{r.presionArterial}</p>
                            </div>
                          </div>
                        )}

                        {r.glucosa && (
                          <div className="flex items-center gap-2 rounded-lg bg-orange-50 p-2">
                            <Droplet className="h-4 w-4 text-orange-600" />
                            <div>
                              <p className="text-xs text-orange-600">Glucosa</p>
                              <p className="text-sm font-bold text-orange-900">{r.glucosa}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {r.motivoConsulta && (
                        <div className="mt-3 rounded-lg bg-gray-50 p-3">
                          <p className="text-xs font-medium text-gray-600">Motivo de consulta:</p>
                          <p className="mt-1 text-sm text-gray-900">{r.motivoConsulta}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botón de editar */}
                  <button
                    onClick={() => openHistoryModal(r)}
                    className="rounded-lg bg-blue-50 p-2.5 transition-all hover:scale-110 hover:bg-blue-100 active:scale-95"
                    title="Editar registro"
                  >
                    <Edit2 className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16">
            <ClipboardList className="mb-3 h-12 w-12 text-gray-300" />
            <p className="mb-1 font-medium text-gray-600">Sin registros clínicos</p>
            <p className="mb-4 text-sm text-gray-500">Comienza agregando el primer registro</p>
            <button
              onClick={() => openHistoryModal()}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Agregar Registro
            </button>
          </div>
        )}
      </div>

      {/* Modal de historial clínico mejorado */}
      {showHistoryModal && (
        <>
          <div
            className="animate-fadeIn fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeHistoryModal}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-6">
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {editingHistory ? 'Editar Historial Clínico' : 'Nuevo Historial Clínico'}
                      </h2>
                      <p className="text-sm text-blue-100">Registro médico del paciente</p>
                    </div>
                  </div>
                  <button
                    onClick={closeHistoryModal}
                    className="rounded-xl bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 active:scale-95"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Formulario */}
              <form
                onSubmit={handleHistorySubmit}
                className="max-h-[calc(90vh-100px)] overflow-y-auto p-6"
              >
                <div className="space-y-6">
                  {/* Información básica */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Información Básica
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Fecha <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={historyForm.fecha}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, fecha: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Peso (kg) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Scale className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            required
                            value={historyForm.peso}
                            onChange={(e) =>
                              setHistoryForm({ ...historyForm, peso: e.target.value })
                            }
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            placeholder="75.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          IMC <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Heart className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="number"
                            step="0.1"
                            required
                            value={historyForm.imc}
                            onChange={(e) =>
                              setHistoryForm({ ...historyForm, imc: e.target.value })
                            }
                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            placeholder="25.8"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signos vitales */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Signos Vitales (Opcional)
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Presión Arterial
                        </label>
                        <input
                          type="text"
                          value={historyForm.presionArterial}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, presionArterial: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="120/80"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Glucosa (mg/dL)
                        </label>
                        <input
                          type="text"
                          value={historyForm.glucosa}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, glucosa: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="90"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Colesterol (mg/dL)
                        </label>
                        <input
                          type="text"
                          value={historyForm.colesterol}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, colesterol: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="180"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Diagnóstico y tratamiento */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                      Diagnóstico y Tratamiento
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Diagnóstico
                        </label>
                        <textarea
                          rows="2"
                          value={historyForm.diagnostico}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, diagnostico: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="Ingrese el diagnóstico..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Tratamiento
                        </label>
                        <textarea
                          rows="2"
                          value={historyForm.tratamiento}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, tratamiento: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="Ingrese el tratamiento recomendado..."
                        ></textarea>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Notas Adicionales
                        </label>
                        <textarea
                          rows="3"
                          value={historyForm.notas}
                          onChange={(e) =>
                            setHistoryForm({ ...historyForm, notas: e.target.value })
                          }
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition-all focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="Observaciones adicionales, recomendaciones, etc..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={closeHistoryModal}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    {editingHistory ? 'Actualizar Registro' : 'Guardar Registro'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function HistoryModal({
  editingHistory,
  form,
  setForm,
  onClose,
  onSubmit,
  icons,
  isReadOnly,
}) {
  const { X, FileText, CalendarIcon, Scale, Heart, Activity, Stethoscope, ClipboardList } = icons;
  const [activeTab, setActiveTab] = useState('basico');

  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-50 h-screen bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-6">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
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
                onClick={onClose}
                className="rounded-xl bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/30 active:scale-95"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="relative mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('basico')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'basico'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Información Básica
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('completo')}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'completo'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Historial Completo
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="max-h-[calc(90vh-180px)] overflow-y-auto p-6">
            {/* TAB 1: Información Básica (Original) */}
            {activeTab === 'basico' && (
              <div className="space-y-6">
                {/* basic */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    Información Básica
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Fecha <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        disabled={isReadOnly}
                        required
                        value={form.fecha}
                        onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                          disabled={isReadOnly}
                          step="0.1"
                          required
                          value={form.peso}
                          onChange={(e) => setForm({ ...form, peso: e.target.value })}
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
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
                          disabled={isReadOnly}
                          step="0.1"
                          value={form.imc}
                          onChange={(e) => setForm({ ...form, imc: e.target.value })}
                          className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                          placeholder="25.8"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* vitals */}
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
                        disabled={isReadOnly}
                        value={form.presionArterial}
                        onChange={(e) => setForm({ ...form, presionArterial: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="120/80"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Glucosa (mg/dL)
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        value={form.glucosa}
                        onChange={(e) => setForm({ ...form, glucosa: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Colesterol (mg/dL)
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        value={form.colesterol}
                        onChange={(e) => setForm({ ...form, colesterol: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="180"
                      />
                    </div>
                  </div>
                </div>

                {/* diag and treatment */}
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
                        disabled={isReadOnly}
                        value={form.diagnostico}
                        onChange={(e) => setForm({ ...form, diagnostico: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="Ingrese el diagnóstico..."
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Tratamiento
                      </label>
                      <textarea
                        rows="2"
                        disabled={isReadOnly}
                        value={form.tratamiento}
                        onChange={(e) => setForm({ ...form, tratamiento: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="Ingrese el tratamiento recomendado..."
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Notas Adicionales
                      </label>
                      <textarea
                        rows="3"
                        disabled={isReadOnly}
                        value={form.notas}
                        onChange={(e) => setForm({ ...form, notas: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        placeholder="Observaciones adicionales, recomendaciones, etc..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Historial Clínico Completo */}
            {activeTab === 'completo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <ClipboardList className="h-5 w-5 text-blue-600" />
                    Cuestionario Médico Completo
                  </h3>

                  {/* Pregunta 1 */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      1. ¿Se encuentra bajo tratamiento médico actualmente?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p1"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p1"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuál?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Especifique el tratamiento..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 2 */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      2. ¿Está tomando algún medicamento?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p2"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p2"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuál?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Especifique el medicamento..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 3 */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      3. ¿Es alérgico a algún medicamento?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p3"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p3"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿A cuál?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Especifique la alergia..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 4 */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      4. ¿Ha sido hospitalizado quirúrgicamente?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p4"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p4"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Por qué motivo?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Especifique el motivo..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 5 */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      5. ¿Ha tenido hemorragias?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p5"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p5"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 6 - Problemas de Cicatrización */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      6. ¿Ha tenido problemas de cicatrización?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p6"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p6"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 7 - Padecimientos */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      7. Padece o ha padecido:
                    </label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_hipertension"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Hipertensión</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_diabetes"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Diabetes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_cardiacos"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Problemas Cardiacos</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_hepatitis"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Hepatitis</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_vih"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">VIH/SIDA</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_gastritis"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Gastritis</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_epilepsia"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Epilepsia</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_asma"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Asma</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p7_cancer"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Cáncer</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        Otro (especifique):
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Otro padecimiento..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 8 - Embarazo */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      8. ¿Está embarazada?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p8"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p8"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        Meses de gestación:
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="9"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Número de meses..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 9 - Fuma */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      9. ¿Fuma?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p9"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p9"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuántos cigarrillos al día?
                      </label>
                      <input
                        type="number"
                        min="0"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Cantidad..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 10 - Ingiere Bebidas Alcohólicas */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      10. ¿Ingiere bebidas alcohólicas?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p10"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p10"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Con qué frecuencia?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ej: Una vez por semana..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 11 - Drogas */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      11. ¿Ha consumido o consume drogas?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p11"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p11"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuál?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Tipo de droga..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 12 - Higiene Bucal */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      12. ¿Cuántas veces al día se cepilla los dientes?
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p12"
                          value="1"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">1 vez</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p12"
                          value="2"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">2 veces</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p12"
                          value="3"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">3 veces</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p12"
                          value="ninguna"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Ninguna</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 13 - Hilo Dental */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      13. ¿Utiliza hilo dental?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p13"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p13"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 14 - Sangrado de Encías */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      14. ¿Le sangran las encías al cepillarse?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p14"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p14"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 15 - Ha perdido algún diente */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      15. ¿Ha perdido algún diente?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p15"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p15"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuántos?
                      </label>
                      <input
                        type="number"
                        min="0"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Número de dientes..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 16 - Tratamiento Dental Anterior */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      16. ¿Ha recibido tratamiento dental anteriormente?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p16"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p16"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Qué tipo de tratamiento?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Tipo de tratamiento..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 17 - Prótesis o Lentes */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      17. ¿Usa prótesis o lentes de contacto?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p17"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p17"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 18 - Reacción a Anestesia */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      18. ¿Presentó alguna reacción adversa a la anestesia?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p18"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p18"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        ¿Cuál?
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        placeholder="Tipo de reacción..."
                      />
                    </div>
                  </div>

                  {/* Pregunta 19 - Dolor Dental */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      19. ¿Le duele algún diente?
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p19"
                          value="si"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Sí</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="p19"
                          value="no"
                          disabled={isReadOnly}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">No</span>
                      </label>
                    </div>
                    <div className="mt-3">
                      <label className="mb-2 block text-xs font-semibold text-gray-600">
                        Ubicación del dolor:
                      </label>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="p19_arriba"
                            disabled={isReadOnly}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Arriba</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="p19_abajo"
                            disabled={isReadOnly}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Abajo</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="p19_izquierda"
                            disabled={isReadOnly}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Izquierda</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="p19_derecha"
                            disabled={isReadOnly}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Derecha</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            name="p19_varios"
                            disabled={isReadOnly}
                            className="h-4 w-4 rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-700">Varios</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Pregunta 20 - Con qué le duele */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      20. ¿Con qué le duele?
                    </label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p20_frio"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Frío</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p20_calor"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Calor</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p20_presion"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Presión</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="p20_morder"
                          disabled={isReadOnly}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Al morder</span>
                      </label>
                    </div>
                  </div>

                  {/* Pregunta 21 - Información Adicional */}
                  <div className="mb-6 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                      21. ¿Tiene algo importante que agregar a este cuestionario y que no se le haya
                      preguntado anteriormente?
                    </label>
                    <textarea
                      rows="4"
                      disabled={isReadOnly}
                      className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                      placeholder="Ingrese información adicional relevante..."
                    />
                  </div>
                </div>
              </div>
            )}

            {!isReadOnly && (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-linear-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  {editingHistory ? 'Actualizar Registro' : 'Guardar Registro'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

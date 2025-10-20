"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Calendar, Plus, X, Edit2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const weightData = [
  { fecha: "Sep 1", peso: 85 },
  { fecha: "Sep 15", peso: 83 },
  { fecha: "Oct 1", peso: 81 },
  { fecha: "Oct 15", peso: 79 },
];

const historyData = [
  { id: 1, fecha: "2024-10-15", peso: 79, imc: 25.8, notas: "Excelente progreso" },
  { id: 2, fecha: "2024-10-01", peso: 81, imc: 26.4, notas: "Mantener dieta" },
  { id: 3, fecha: "2024-09-15", peso: 83, imc: 27.1, notas: "Buen avance" },
];

const assignedDiets = [
  { id: 1, nombre: "Plan Mediterráneo", inicio: "2024-09-01", estado: "Activa" },
  { id: 2, nombre: "Plan Bajo en Carbohidratos", inicio: "2024-07-15", estado: "Completada" },
];

export default function DoctorPatientDetail({ params }) {
  const router = useRouter();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [editingHistory, setEditingHistory] = useState(null);
  const [historyForm, setHistoryForm] = useState({
    fecha: "",
    peso: "",
    imc: "",
    presionArterial: "",
    glucosa: "",
    colesterol: "",
    notas: "",
    diagnostico: "",
    tratamiento: "",
  });

  const openHistoryModal = (record = null) => {
    if (record) {
      setEditingHistory(record);
      setHistoryForm({
        fecha: record.fecha,
        peso: record.peso,
        imc: record.imc,
        presionArterial: record.presionArterial || "",
        glucosa: record.glucosa || "",
        colesterol: record.colesterol || "",
        notas: record.notas || "",
        diagnostico: record.diagnostico || "",
        tratamiento: record.tratamiento || "",
      });
    } else {
      setEditingHistory(null);
      setHistoryForm({
        fecha: new Date().toISOString().split('T')[0],
        peso: "",
        imc: "",
        presionArterial: "",
        glucosa: "",
        colesterol: "",
        notas: "",
        diagnostico: "",
        tratamiento: "",
      });
    }
    setShowHistoryModal(true);
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setEditingHistory(null);
  };

  const handleHistorySubmit = (e) => {
    e.preventDefault();
    console.log("Guardando historial:", historyForm);
    // Aquí se enviaría al backend
    alert(editingHistory ? "Historial actualizado" : "Historial agregado");
    closeHistoryModal();
  };

  const openDiet = (dietId) => {
    router.push(`/doctor/diets/${dietId}`);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Pacientes
      </button>

      {/* Encabezado del paciente */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <div className="flex-1 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Juan Pérez</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">juan.perez@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>35 años</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 md:gap-4">
              <div className="bg-blue-50 px-3 py-2 rounded-lg">
                <p className="text-xs text-gray-600">Peso Actual</p>
                <p className="text-base md:text-lg font-semibold text-gray-900">79 kg</p>
              </div>
              <div className="bg-green-50 px-3 py-2 rounded-lg">
                <p className="text-xs text-gray-600">IMC</p>
                <p className="text-base md:text-lg font-semibold text-gray-900">25.8</p>
              </div>
              <div className="bg-purple-50 px-3 py-2 rounded-lg">
                <p className="text-xs text-gray-600">Progreso</p>
                <p className="text-base md:text-lg font-semibold text-gray-900">-6 kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfica de evolución */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Evolución de Peso</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="peso" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Historial clínico */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Historial Clínico</h2>
            <button
              onClick={() => openHistoryModal()}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
          </div>
          <div className="space-y-3">
            {historyData.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">{record.fecha}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{record.peso} kg</span>
                    <button
                      onClick={() => openHistoryModal(record)}
                      className="p-1 hover:bg-gray-100 rounded transition active:scale-95"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600">IMC: {record.imc}</p>
                <p className="text-xs text-gray-500 mt-1">{record.notas}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dietas asignadas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Dietas Asignadas</h2>
            <button
              onClick={() => router.push("/doctor/diets/new")}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Asignar
            </button>
          </div>
          <div className="space-y-3">
            {assignedDiets.map((diet) => (
              <button
                key={diet.id}
                onClick={() => openDiet(diet.id)}
                className="w-full border border-gray-200 rounded-lg p-3 hover:border-green-300 hover:bg-green-50 transition text-left active:scale-95"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">{diet.nombre}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    diet.estado === "Activa" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {diet.estado}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Inicio: {diet.inicio}</p>
                <p className="text-xs text-blue-600 mt-1">Click para ver detalles →</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notas del médico */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Notas del Médico</h2>
        <textarea
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe notas sobre el paciente..."
        ></textarea>
        <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95">
          Guardar Notas
        </button>
      </div>

      {/* Modal de Historial Clínico */}
      {showHistoryModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={closeHistoryModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  {editingHistory ? "Editar Historial Clínico" : "Agregar Historial Clínico"}
                </h2>
                <button
                  onClick={closeHistoryModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Contenido del modal */}
              <form onSubmit={handleHistorySubmit} className="p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <input
                      type="date"
                      required
                      value={historyForm.fecha}
                      onChange={(e) => setHistoryForm({ ...historyForm, fecha: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={historyForm.peso}
                      onChange={(e) => setHistoryForm({ ...historyForm, peso: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="75.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">IMC</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={historyForm.imc}
                      onChange={(e) => setHistoryForm({ ...historyForm, imc: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="25.8"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Presión Arterial</label>
                    <input
                      type="text"
                      value={historyForm.presionArterial}
                      onChange={(e) => setHistoryForm({ ...historyForm, presionArterial: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="120/80"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Glucosa (mg/dL)</label>
                    <input
                      type="number"
                      value={historyForm.glucosa}
                      onChange={(e) => setHistoryForm({ ...historyForm, glucosa: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="95"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colesterol (mg/dL)</label>
                    <input
                      type="number"
                      value={historyForm.colesterol}
                      onChange={(e) => setHistoryForm({ ...historyForm, colesterol: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="180"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                  <textarea
                    rows="2"
                    value={historyForm.diagnostico}
                    onChange={(e) => setHistoryForm({ ...historyForm, diagnostico: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Diagnóstico médico..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tratamiento</label>
                  <textarea
                    rows="2"
                    value={historyForm.tratamiento}
                    onChange={(e) => setHistoryForm({ ...historyForm, tratamiento: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tratamiento prescrito..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                  <textarea
                    rows="3"
                    value={historyForm.notas}
                    onChange={(e) => setHistoryForm({ ...historyForm, notas: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Observaciones adicionales..."
                  ></textarea>
                </div>

                {/* Botones */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeHistoryModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
                  >
                    {editingHistory ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


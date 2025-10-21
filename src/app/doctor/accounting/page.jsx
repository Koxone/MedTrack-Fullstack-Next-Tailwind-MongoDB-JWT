"use client";

import { useState } from "react";
import { DollarSign, Users, Pill, TrendingUp, Calendar, Plus, Download, X, Edit2, Trash2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ingresosSemanales = [
  { dia: "Lun", consultas: 3200, medicamentos: 450 },
  { dia: "Mar", consultas: 2800, medicamentos: 380 },
  { dia: "Mié", consultas: 3600, medicamentos: 520 },
  { dia: "Jue", consultas: 3000, medicamentos: 410 },
  { dia: "Vie", consultas: 3800, medicamentos: 940 },
  { dia: "Sáb", consultas: 2400, medicamentos: 320 },
  { dia: "Dom", consultas: 0, medicamentos: 0 },
];

export default function DoctorAccounting() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("consulta");
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Estados para consultas y medicamentos
  const [consultasHoy, setConsultasHoy] = useState([
    { id: 1, hora: "09:00", paciente: "Juan Pérez", tipo: "Consulta General", costo: 800, pagado: true },
    { id: 2, hora: "10:00", paciente: "María López", tipo: "Seguimiento", costo: 600, pagado: true },
    { id: 3, hora: "11:00", paciente: "Carlos Ruiz", tipo: "Primera Consulta", costo: 1000, pagado: true },
    { id: 4, hora: "15:00", paciente: "Ana Martínez", tipo: "Consulta General", costo: 800, pagado: false },
    { id: 5, hora: "16:00", paciente: "Pedro García", tipo: "Seguimiento", costo: 600, pagado: true },
  ]);

  const [medicamentosVendidos, setMedicamentosVendidos] = useState([
    { id: 1, nombre: "Metformina 850mg", cantidad: 2, precioUnitario: 150, total: 300, paciente: "Juan Pérez" },
    { id: 2, nombre: "Atorvastatina 20mg", cantidad: 1, precioUnitario: 200, total: 200, paciente: "María López" },
    { id: 3, nombre: "Losartán 50mg", cantidad: 3, precioUnitario: 120, total: 360, paciente: "Carlos Ruiz" },
    { id: 4, nombre: "Omeprazol 20mg", cantidad: 1, precioUnitario: 80, total: 80, paciente: "Pedro García" },
  ]);

  // Formularios
  const [consultaForm, setConsultaForm] = useState({
    hora: "",
    paciente: "",
    tipo: "",
    costo: "",
    pagado: true,
  });

  const [medicamentoForm, setMedicamentoForm] = useState({
    nombre: "",
    cantidad: "",
    precioUnitario: "",
    paciente: "",
  });

  // Calcular totales
  const totalConsultas = consultasHoy.reduce((sum, c) => sum + c.costo, 0);
  const totalMedicamentos = medicamentosVendidos.reduce((sum, m) => sum + m.total, 0);
  const totalDia = totalConsultas + totalMedicamentos;
  const consultasPagadas = consultasHoy.filter(c => c.pagado).length;

  const distribucionIngresos = [
    { name: "Consultas", value: totalConsultas, color: "#3b82f6" },
    { name: "Medicamentos", value: totalMedicamentos, color: "#10b981" },
  ];

  // Abrir modal para agregar
  const openAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === "consulta") {
      setConsultaForm({ hora: "", paciente: "", tipo: "", costo: "", pagado: true });
    } else {
      setMedicamentoForm({ nombre: "", cantidad: "", precioUnitario: "", paciente: "" });
    }
    setShowModal(true);
  };

  // Abrir modal para editar
  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    if (type === "consulta") {
      setConsultaForm({
        hora: item.hora,
        paciente: item.paciente,
        tipo: item.tipo,
        costo: item.costo.toString(),
        pagado: item.pagado,
      });
    } else {
      setMedicamentoForm({
        nombre: item.nombre,
        cantidad: item.cantidad.toString(),
        precioUnitario: item.precioUnitario.toString(),
        paciente: item.paciente,
      });
    }
    setShowModal(true);
  };

  // Guardar consulta
  const handleSaveConsulta = (e) => {
    e.preventDefault();
    const newConsulta = {
      id: editingItem ? editingItem.id : Date.now(),
      hora: consultaForm.hora,
      paciente: consultaForm.paciente,
      tipo: consultaForm.tipo,
      costo: parseFloat(consultaForm.costo),
      pagado: consultaForm.pagado,
    };

    if (editingItem) {
      setConsultasHoy(consultasHoy.map(c => c.id === editingItem.id ? newConsulta : c));
    } else {
      setConsultasHoy([...consultasHoy, newConsulta]);
    }
    setShowModal(false);
  };

  // Guardar medicamento
  const handleSaveMedicamento = (e) => {
    e.preventDefault();
    const cantidad = parseInt(medicamentoForm.cantidad);
    const precioUnitario = parseFloat(medicamentoForm.precioUnitario);
    const newMedicamento = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: medicamentoForm.nombre,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
      total: cantidad * precioUnitario,
      paciente: medicamentoForm.paciente,
    };

    if (editingItem) {
      setMedicamentosVendidos(medicamentosVendidos.map(m => m.id === editingItem.id ? newMedicamento : m));
    } else {
      setMedicamentosVendidos([...medicamentosVendidos, newMedicamento]);
    }
    setShowModal(false);
  };

  // Abrir modal de eliminar
  const openDeleteModal = (type, item) => {
    setModalType(type);
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
  const handleDelete = () => {
    if (modalType === "consulta") {
      setConsultasHoy(consultasHoy.filter(c => c.id !== itemToDelete.id));
    } else {
      setMedicamentosVendidos(medicamentosVendidos.filter(m => m.id !== itemToDelete.id));
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Contabilidad</h1>
          <p className="text-sm md:text-base text-gray-600">Control financiero del consultorio</p>
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition active:scale-95">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Hoy</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-1">${totalDia.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-blue-100">Total del día</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-green-500" />
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">{consultasHoy.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalConsultas.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Consultas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Pill className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">{medicamentosVendidos.length}</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">${totalMedicamentos.toLocaleString()}</p>
          <p className="text-xs md:text-sm text-gray-600">Medicamentos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded font-medium">+12%</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            ${consultasHoy.length > 0 ? (totalDia / consultasHoy.length).toFixed(0) : 0}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Promedio/paciente</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Ingresos de la Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ingresosSemanales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip />
              <Bar dataKey="consultas" fill="#3b82f6" name="Consultas" />
              <Bar dataKey="medicamentos" fill="#10b981" name="Medicamentos" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Distribución</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distribucionIngresos}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {distribucionIngresos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {distribucionIngresos.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Consultas del día */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Consultas del Día</h2>
          <button
            onClick={() => openAddModal("consulta")}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Hora</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Paciente</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Tipo</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Costo</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Estado</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consultasHoy.map((consulta) => (
                <tr key={consulta.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-900">{consulta.hora}</td>
                  <td className="py-3 px-2 text-sm text-gray-900">{consulta.paciente}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">{consulta.tipo}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">${consulta.costo}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      consulta.pagado ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {consulta.pagado ? "Pagado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal("consulta", consulta)}
                        className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => openDeleteModal("consulta", consulta)}
                        className="p-1.5 hover:bg-red-50 rounded transition active:scale-95"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="py-3 px-2 text-sm text-gray-900">Total Consultas</td>
                <td className="py-3 px-2 text-sm text-gray-900 text-right">${totalConsultas.toLocaleString()}</td>
                <td className="py-3 px-2 text-center text-xs text-gray-600">{consultasPagadas}/{consultasHoy.length}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Medicamentos vendidos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">Medicamentos Vendidos</h2>
          <button
            onClick={() => openAddModal("medicamento")}
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Medicamento</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Cant.</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">P. Unit.</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 hidden md:table-cell">Paciente</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentosVendidos.map((med) => (
                <tr key={med.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm text-gray-900">{med.nombre}</td>
                  <td className="py-3 px-2 text-sm text-gray-900 text-center">{med.cantidad}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 text-right">${med.precioUnitario}</td>
                  <td className="py-3 px-2 text-sm font-semibold text-gray-900 text-right">${med.total}</td>
                  <td className="py-3 px-2 text-sm text-gray-600 hidden md:table-cell">{med.paciente}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => openEditModal("medicamento", med)}
                        className="p-1.5 hover:bg-blue-50 rounded transition active:scale-95"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => openDeleteModal("medicamento", med)}
                        className="p-1.5 hover:bg-red-50 rounded transition active:scale-95"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="3" className="py-3 px-2 text-sm text-gray-900">Total Medicamentos</td>
                <td className="py-3 px-2 text-sm text-gray-900 text-right">${totalMedicamentos.toLocaleString()}</td>
                <td className="hidden md:table-cell"></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Modal Agregar/Editar */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? "Editar" : "Agregar"} {modalType === "consulta" ? "Consulta" : "Medicamento"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition active:scale-95"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {modalType === "consulta" ? (
                <form onSubmit={handleSaveConsulta} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <input
                      type="time"
                      required
                      value={consultaForm.hora}
                      onChange={(e) => setConsultaForm({ ...consultaForm, hora: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                    <input
                      type="text"
                      required
                      value={consultaForm.paciente}
                      onChange={(e) => setConsultaForm({ ...consultaForm, paciente: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nombre del paciente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Consulta</label>
                    <select
                      required
                      value={consultaForm.tipo}
                      onChange={(e) => setConsultaForm({ ...consultaForm, tipo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Primera Consulta">Primera Consulta</option>
                      <option value="Consulta General">Consulta General</option>
                      <option value="Seguimiento">Seguimiento</option>
                      <option value="Urgencia">Urgencia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Costo</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={consultaForm.costo}
                      onChange={(e) => setConsultaForm({ ...consultaForm, costo: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="800"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pagado"
                      checked={consultaForm.pagado}
                      onChange={(e) => setConsultaForm({ ...consultaForm, pagado: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor="pagado" className="text-sm text-gray-700">Consulta pagada</label>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition active:scale-95"
                    >
                      {editingItem ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveMedicamento} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Medicamento</label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.nombre}
                      onChange={(e) => setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Nombre del medicamento"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={medicamentoForm.cantidad}
                      onChange={(e) => setMedicamentoForm({ ...medicamentoForm, cantidad: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio Unitario</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={medicamentoForm.precioUnitario}
                      onChange={(e) => setMedicamentoForm({ ...medicamentoForm, precioUnitario: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Paciente</label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.paciente}
                      onChange={(e) => setMedicamentoForm({ ...medicamentoForm, paciente: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Nombre del paciente"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition active:scale-95"
                    >
                      {editingItem ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && itemToDelete && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-fadeIn"
            onClick={() => setShowDeleteModal(false)}
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
                  <h2 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  ¿Estás seguro de que deseas eliminar {modalType === "consulta" ? "esta consulta" : "este medicamento"}?
                </p>
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-gray-900 font-medium">
                    {modalType === "consulta" 
                      ? `${itemToDelete.paciente} - ${itemToDelete.hora}` 
                      : `${itemToDelete.nombre} - ${itemToDelete.cantidad} unidades`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition active:scale-95"
                  >
                    Eliminar
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


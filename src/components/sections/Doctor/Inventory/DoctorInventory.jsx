'use client';

/* state */
import { useState, useMemo } from 'react';

/* icons */
import { Pill, FileText, Syringe, AlertTriangle, Download, Plus, Search } from 'lucide-react';

import Header from './Components/Header';
import Metrics from './Components/Metrics';
import Tabs from './Components/Tabs';
import MedicamentosTable from './Components/MedicamentosTable';
import RecetasGrid from './Components/RecetasGrid';
import SuministrosTable from './Components/SuministrosTable';
import AddEditModal from './Components/AddEditModal';
import DeleteModal from './Components/DeleteModal';

/* container */
export default function DoctorInventory() {
  /* ui state */
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  /* data state */
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      nombre: 'Metformina 850mg',
      categoria: 'Antidiabético',
      stock: 45,
      minimo: 20,
      precio: 150,
      caducidad: '2025-06-15',
      ubicacion: 'A-1',
    },
    {
      id: 2,
      nombre: 'Atorvastatina 20mg',
      categoria: 'Estatina',
      stock: 12,
      minimo: 15,
      precio: 200,
      caducidad: '2024-12-20',
      ubicacion: 'A-2',
    },
    {
      id: 3,
      nombre: 'Losartán 50mg',
      categoria: 'Antihipertensivo',
      stock: 67,
      minimo: 30,
      precio: 120,
      caducidad: '2025-08-10',
      ubicacion: 'A-3',
    },
    {
      id: 4,
      nombre: 'Omeprazol 20mg',
      categoria: 'Antiácido',
      stock: 8,
      minimo: 25,
      precio: 80,
      caducidad: '2024-11-05',
      ubicacion: 'B-1',
    },
    {
      id: 5,
      nombre: 'Paracetamol 500mg',
      categoria: 'Analgésico',
      stock: 120,
      minimo: 50,
      precio: 50,
      caducidad: '2026-03-22',
      ubicacion: 'B-2',
    },
  ]);
  const [recetas, setRecetas] = useState([
    { id: 1, tipo: 'Receta Controlada', stock: 45, minimo: 20 },
    { id: 2, tipo: 'Receta Simple', stock: 180, minimo: 50 },
    { id: 3, tipo: 'Receta Especial', stock: 12, minimo: 15 },
  ]);
  const [suministros, setSuministros] = useState([
    { id: 1, nombre: 'Jeringas 5ml', stock: 200, minimo: 100, precio: 5 },
    { id: 2, nombre: 'Guantes de látex (caja)', stock: 15, minimo: 10, precio: 180 },
    { id: 3, nombre: 'Gasas estériles (paquete)', stock: 45, minimo: 20, precio: 85 },
    { id: 4, nombre: 'Alcohol 70% (litro)', stock: 8, minimo: 15, precio: 120 },
    { id: 5, nombre: 'Termómetros digitales', stock: 25, minimo: 10, precio: 250 },
  ]);

  /* forms state */
  const [medicamentoForm, setMedicamentoForm] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    minimo: '',
    precio: '',
    caducidad: '',
    ubicacion: '',
  });
  const [recetaForm, setRecetaForm] = useState({ tipo: '', stock: '', minimo: '' });
  const [suministroForm, setSuministroForm] = useState({
    nombre: '',
    stock: '',
    minimo: '',
    precio: '',
  });

  /* utils */
  const getStockStatus = (stock, minimo) => {
    if (stock < minimo) return { color: 'text-red-600', bg: 'bg-red-50', label: 'Bajo' };
    if (stock < minimo * 1.5)
      return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Medio' };
    return { color: 'text-green-600', bg: 'bg-green-50', label: 'Bueno' };
  };
  const getCaducidadStatus = (caducidad) => {
    const hoy = new Date();
    const fechaCad = new Date(caducidad);
    const dias = Math.floor((fechaCad - hoy) / (1000 * 60 * 60 * 24));
    if (dias < 30) return { color: 'text-red-600', bg: 'bg-red-50' };
    if (dias < 90) return { color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  /* derived */
  const medicamentosAlerta = useMemo(
    () => medicamentos.filter((m) => m.stock < m.minimo),
    [medicamentos]
  );
  const recetasAlerta = useMemo(() => recetas.filter((r) => r.stock < r.minimo), [recetas]);
  const suministrosAlerta = useMemo(
    () => suministros.filter((s) => s.stock < s.minimo),
    [suministros]
  );
  const totalAlertas = medicamentosAlerta.length + recetasAlerta.length + suministrosAlerta.length;

  const valorTotalMedicamentos = useMemo(
    () => medicamentos.reduce((sum, m) => sum + m.stock * m.precio, 0),
    [medicamentos]
  );
  const valorTotalSuministros = useMemo(
    () => suministros.reduce((sum, s) => sum + s.stock * s.precio, 0),
    [suministros]
  );

  const filteredMedicamentos = useMemo(
    () =>
      medicamentos.filter(
        (m) =>
          m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [medicamentos, searchTerm]
  );
  const filteredRecetas = useMemo(
    () => recetas.filter((r) => r.tipo.toLowerCase().includes(searchTerm.toLowerCase())),
    [recetas, searchTerm]
  );
  const filteredSuministros = useMemo(
    () => suministros.filter((s) => s.nombre.toLowerCase().includes(searchTerm.toLowerCase())),
    [suministros, searchTerm]
  );

  /* actions */
  const openAddModal = () => {
    setEditingItem(null);
    if (activeTab === 'medicamentos')
      setMedicamentoForm({
        nombre: '',
        categoria: '',
        stock: '',
        minimo: '',
        precio: '',
        caducidad: '',
        ubicacion: '',
      });
    if (activeTab === 'recetas') setRecetaForm({ tipo: '', stock: '', minimo: '' });
    if (activeTab === 'suministros')
      setSuministroForm({ nombre: '', stock: '', minimo: '', precio: '' });
    setShowModal(true);
  };
  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'medicamentos')
      setMedicamentoForm({
        nombre: item.nombre,
        categoria: item.categoria,
        stock: String(item.stock),
        minimo: String(item.minimo),
        precio: String(item.precio),
        caducidad: item.caducidad,
        ubicacion: item.ubicacion,
      });
    if (activeTab === 'recetas')
      setRecetaForm({ tipo: item.tipo, stock: String(item.stock), minimo: String(item.minimo) });
    if (activeTab === 'suministros')
      setSuministroForm({
        nombre: item.nombre,
        stock: String(item.stock),
        minimo: String(item.minimo),
        precio: String(item.precio),
      });
    setShowModal(true);
  };
  const requestDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  /* saves */
  const handleSaveMedicamento = (e) => {
    e.preventDefault();
    const item = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: medicamentoForm.nombre,
      categoria: medicamentoForm.categoria,
      stock: parseInt(medicamentoForm.stock),
      minimo: parseInt(medicamentoForm.minimo),
      precio: parseFloat(medicamentoForm.precio),
      caducidad: medicamentoForm.caducidad,
      ubicacion: medicamentoForm.ubicacion,
    };
    setMedicamentos((prev) =>
      editingItem ? prev.map((m) => (m.id === editingItem.id ? item : m)) : [...prev, item]
    );
    setShowModal(false);
  };
  const handleSaveReceta = (e) => {
    e.preventDefault();
    const item = {
      id: editingItem ? editingItem.id : Date.now(),
      tipo: recetaForm.tipo,
      stock: parseInt(recetaForm.stock),
      minimo: parseInt(recetaForm.minimo),
    };
    setRecetas((prev) =>
      editingItem ? prev.map((r) => (r.id === editingItem.id ? item : r)) : [...prev, item]
    );
    setShowModal(false);
  };
  const handleSaveSuministro = (e) => {
    e.preventDefault();
    const item = {
      id: editingItem ? editingItem.id : Date.now(),
      nombre: suministroForm.nombre,
      stock: parseInt(suministroForm.stock),
      minimo: parseInt(suministroForm.minimo),
      precio: parseFloat(suministroForm.precio),
    };
    setSuministros((prev) =>
      editingItem ? prev.map((s) => (s.id === editingItem.id ? item : s)) : [...prev, item]
    );
    setShowModal(false);
  };
  const handleDelete = () => {
    if (!itemToDelete) return;
    if (activeTab === 'medicamentos')
      setMedicamentos((p) => p.filter((m) => m.id !== itemToDelete.id));
    if (activeTab === 'recetas') setRecetas((p) => p.filter((r) => r.id !== itemToDelete.id));
    if (activeTab === 'suministros')
      setSuministros((p) => p.filter((s) => s.id !== itemToDelete.id));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  /* ui */
  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <Header
        title="Inventario"
        subtitle="Gestión de medicamentos, recetas y suministros"
        right={
          <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95">
            <Download className="h-5 w-5" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        }
      />

      <Metrics
        cards={[
          {
            icon: Pill,
            badge: medicamentos.length,
            value: `$${valorTotalMedicamentos.toLocaleString()}`,
            label: 'Medicamentos',
            accent: 'text-blue-500',
            badgeBg: 'bg-blue-50',
            badgeText: 'text-blue-700',
          },
          {
            icon: FileText,
            badge: recetas.reduce((sum, r) => sum + r.stock, 0),
            value: `${recetas.length}`,
            label: 'Tipos de Recetas',
            accent: 'text-green-500',
            badgeBg: 'bg-green-50',
            badgeText: 'text-green-700',
          },
          {
            icon: Syringe,
            badge: suministros.length,
            value: `$${valorTotalSuministros.toLocaleString()}`,
            label: 'Suministros',
            accent: 'text-purple-500',
            badgeBg: 'bg-purple-50',
            badgeText: 'text-purple-700',
          },
          {
            icon: AlertTriangle,
            badge: null,
            value: `${totalAlertas}`,
            label: 'Alertas de stock',
            accent: totalAlertas > 0 ? 'text-red-500' : 'text-gray-400',
            bordered: true,
            danger: totalAlertas > 0,
          },
        ]}
        alert={{
          show: totalAlertas > 0,
          text: `${medicamentosAlerta.length > 0 ? `${medicamentosAlerta.length} medicamento(s), ` : ''}${recetasAlerta.length > 0 ? `${recetasAlerta.length} tipo(s) de receta(s), ` : ''}${suministrosAlerta.length > 0 ? `${suministrosAlerta.length} suministro(s)` : ''} necesitan reabastecimiento.`,
        }}
      />

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en inventario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <Tabs active={activeTab} onChange={setActiveTab} />
        {activeTab === 'medicamentos' && (
          <div className="p-4 md:p-6">
            <MedicamentosTable
              items={filteredMedicamentos}
              getStockStatus={getStockStatus}
              getCaducidadStatus={getCaducidadStatus}
              onEdit={openEditModal}
              onDelete={requestDelete}
            />
          </div>
        )}
        {activeTab === 'recetas' && (
          <div className="p-4 md:p-6">
            <RecetasGrid
              items={filteredRecetas}
              getStockStatus={getStockStatus}
              onEdit={openEditModal}
              onDelete={requestDelete}
            />
          </div>
        )}
        {activeTab === 'suministros' && (
          <div className="p-4 md:p-6">
            <SuministrosTable
              items={filteredSuministros}
              getStockStatus={getStockStatus}
              onEdit={openEditModal}
              onDelete={requestDelete}
            />
          </div>
        )}
      </div>

      <AddEditModal
        open={showModal}
        onClose={() => setShowModal(false)}
        activeTab={activeTab}
        editingItem={editingItem}
        medicamentoForm={medicamentoForm}
        setMedicamentoForm={setMedicamentoForm}
        recetaForm={recetaForm}
        setRecetaForm={setRecetaForm}
        suministroForm={suministroForm}
        setSuministroForm={setSuministroForm}
        onSaveMedicamento={handleSaveMedicamento}
        onSaveReceta={handleSaveReceta}
        onSaveSuministro={handleSaveSuministro}
      />

      <DeleteModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        item={itemToDelete}
        activeTab={activeTab}
        onConfirm={handleDelete}
      />
    </div>
  );
}

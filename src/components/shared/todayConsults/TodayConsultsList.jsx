'use client';
import React, { useState, useMemo } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultsList from './ConsultsList';
import ConsultationsMobile from './ConsultationsMobile';
import EmptyState from './EmptyState';
import EmployeeDeleteConsultModal from '@/components/sections/employee/consultations/components/modals/employeeDeleteConsultModal/EmployeeDeleteConsultModal';
import { Search, Plus, FileText, Edit2, Trash2, AlertCircle } from 'lucide-react';
import {
  filterConsultas,
  calculateTotalIngresos,
  openCreate,
  openEdit,
  askDelete,
  handleCreateAction,
  handleUpdateAction,
  handleDeleteAction,
  todayISO,
} from './utils/helpers';

// Modals
import EmployeeCreateConsultModal from '@/components/sections/employee/consultations/components/modals/employeeCreateConsultModal/EmployeeCreateConsultModal';
import EmployeeEditConsultModal from '@/components/sections/employee/consultations/components/modals/employeeEditConsultModal/EmployeeEditConsultModal';

export default function TodayConsultsList({ totals }) {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      fecha: '2024-10-21',
      hora: '09:00',
      paciente: 'Juan Pérez',
      tipo: 'Primera Vez',
      costo: 1000,
      paymentMethod: 'Efectivo',
      avatar: 'JP',
    },
    {
      id: 2,
      fecha: '2024-10-21',
      hora: '10:30',
      paciente: 'María López',
      tipo: 'Subsecuente',
      costo: 600,
      paymentMethod: 'Tarjeta',
      avatar: 'ML',
    },
    {
      id: 3,
      fecha: '2024-10-21',
      hora: '11:00',
      paciente: 'Carlos Ruiz',
      tipo: 'Primera Vez',
      costo: 800,
      paymentMethod: 'Transferencia',
      avatar: 'CR',
    },
    {
      id: 4,
      fecha: '2024-10-21',
      hora: '15:00',
      paciente: 'Ana Martínez',
      tipo: 'Subsecuente',
      costo: 800,
      paymentMethod: 'Tarjeta',
      avatar: 'AM',
    },
    {
      id: 5,
      fecha: '2024-10-21',
      hora: '16:30',
      paciente: 'Pedro García',
      tipo: 'Subsecuente',
      costo: 600,
      paymentMethod: 'Tarjeta',
      avatar: 'PG',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredConsultas = useMemo(
    () => filterConsultas(consultas, searchTerm),
    [consultas, searchTerm]
  );

  const totalIngresos = useMemo(() => calculateTotalIngresos(consultas), [consultas]);

  const handleCreate = (form) => {
    handleCreateAction(form, todayISO, setConsultas, setShowModal);
  };

  const handleUpdate = (form) => {
    handleUpdateAction(form, editingItem, setConsultas, setShowModal, setEditingItem);
  };

  const handleDelete = () => {
    handleDeleteAction(itemToDelete, setConsultas, setShowDeleteModal, setItemToDelete);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchAddBar
        value={searchTerm}
        onChange={setSearchTerm}
        onAdd={() => openCreate(setEditingItem, setShowModal)}
        icons={{ Search, Plus }}
      />

      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
        <ConsultsList
          rows={filteredConsultas}
          totals={totals}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <ConsultationsMobile
          rows={filteredConsultas}
          icons={{ Edit2, Trash2 }}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <EmptyState visible={filteredConsultas.length === 0} icons={{ FileText }} />
      </div>

      {showModal && !editingItem && (
        <EmployeeCreateConsultModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
      )}

      {showModal && editingItem && (
        <EmployeeEditConsultModal
          editingItem={editingItem}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <EmployeeDeleteConsultModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          icons={{ AlertCircle }}
        />
      )}
    </div>
  );
}

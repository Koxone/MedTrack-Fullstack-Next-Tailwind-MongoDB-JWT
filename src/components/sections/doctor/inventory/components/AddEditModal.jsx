'use client';

import {
  X,
  Pill,
  FileText,
  Package,
  Tag,
  Folder,
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Sparkles,
  Box,
  Info,
} from 'lucide-react';

export default function AddEditModal({
  open,
  onClose,
  activeTab,
  editingItem,
  medicamentoForm,
  setMedicamentoForm,
  recetaForm,
  setRecetaForm,
  suministroForm,
  setSuministroForm,
  onSaveMedicamento,
  onSaveReceta,
  onSaveSuministro,
}) {
  if (!open) return null;

  const getConfig = () => {
    if (activeTab === 'medicamentos') {
      return {
        title: 'Medicamento',
        icon: Pill,
        gradient: 'from-blue-500 to-indigo-500',
        accentColor: 'blue',
      };
    } else if (activeTab === 'recetas') {
      return {
        title: 'Receta',
        icon: FileText,
        gradient: 'from-green-500 to-emerald-500',
        accentColor: 'green',
      };
    } else {
      return {
        title: 'Suministro',
        icon: Box,
        gradient: 'from-purple-500 to-violet-500',
        accentColor: 'purple',
      };
    }
  };

  const config = getConfig();
  const IconComponent = config.icon;

  return (
    <>
      {/* Overlay mejorado */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-in fade-in zoom-in-95 relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50/30 to-purple-50/30 shadow-2xl duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Background Elements */}
          <div
            className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-linear-to-br ${config.gradient} opacity-20 blur-3xl`}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-linear-to-tr ${config.gradient} opacity-20 blur-3xl`}
          />

          {/* Header Premium */}
          <div className="relative overflow-hidden border-b border-white/50 bg-white/80 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-linear-to-r ${config.gradient} opacity-10`} />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    {/* Anillo pulsante */}
                    <div
                      className={`absolute inset-0 animate-ping rounded-2xl bg-${config.accentColor}-500 opacity-20`}
                    />
                    <div
                      className={`relative rounded-2xl bg-linear-to-br ${config.gradient} p-3 shadow-lg`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingItem ? 'Editar' : 'Agregar'} {config.title}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      {editingItem
                        ? 'Actualiza la información'
                        : 'Completa todos los campos requeridos'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-red-500"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative max-h-[calc(90vh-180px)] overflow-y-auto p-6">
            {activeTab === 'medicamentos' && (
              <form onSubmit={onSaveMedicamento} className="space-y-5">
                {/* Información del Medicamento */}
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-blue-500 to-indigo-500 p-1.5">
                      <Pill className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información del Medicamento</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Tag className="h-4 w-4 text-blue-500" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.nombre}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, nombre: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                      placeholder="Metformina 850mg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Folder className="h-4 w-4 text-purple-500" />
                      Categoría
                    </label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.categoria}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, categoria: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      placeholder="Antidiabético"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Package className="h-4 w-4 text-green-500" />
                        Stock
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={medicamentoForm.stock}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, stock: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Mínimo
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={medicamentoForm.minimo}
                        onChange={(e) =>
                          setMedicamentoForm({ ...medicamentoForm, minimo: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Precio
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={medicamentoForm.precio}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, precio: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/20 focus:outline-none"
                      placeholder="150.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-red-500" />
                      Fecha de Caducidad
                    </label>
                    <input
                      type="date"
                      required
                      value={medicamentoForm.caducidad}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, caducidad: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-red-500 focus:shadow-md focus:shadow-red-500/20 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <MapPin className="h-4 w-4 text-pink-500" />
                      Ubicación
                    </label>
                    <input
                      type="text"
                      required
                      value={medicamentoForm.ubicacion}
                      onChange={(e) =>
                        setMedicamentoForm({ ...medicamentoForm, ubicacion: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-pink-500 focus:shadow-md focus:shadow-pink-500/20 focus:outline-none"
                      placeholder="A-1"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="group flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Pill className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'recetas' && (
              <form onSubmit={onSaveReceta} className="space-y-5">
                {/* Información de la Receta */}
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-green-500 to-emerald-500 p-1.5">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información de la Receta</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FileText className="h-4 w-4 text-green-500" />
                      Tipo de Receta
                    </label>
                    <input
                      type="text"
                      required
                      value={recetaForm.tipo}
                      onChange={(e) => setRecetaForm({ ...recetaForm, tipo: e.target.value })}
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-green-500 focus:shadow-md focus:shadow-green-500/20 focus:outline-none"
                      placeholder="Receta Controlada"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Package className="h-4 w-4 text-blue-500" />
                        Stock
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={recetaForm.stock}
                        onChange={(e) => setRecetaForm({ ...recetaForm, stock: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Mínimo
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={recetaForm.minimo}
                        onChange={(e) => setRecetaForm({ ...recetaForm, minimo: e.target.value })}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="group flex-1 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/50 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FileText className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'suministros' && (
              <form onSubmit={onSaveSuministro} className="space-y-5">
                {/* Información del Suministro */}
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <div className="rounded-lg bg-linear-to-br from-purple-500 to-violet-500 p-1.5">
                      <Box className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Información del Suministro</h3>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Tag className="h-4 w-4 text-purple-500" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={suministroForm.nombre}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, nombre: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-purple-500 focus:shadow-md focus:shadow-purple-500/20 focus:outline-none"
                      placeholder="Jeringas 5ml"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Package className="h-4 w-4 text-blue-500" />
                        Stock
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={suministroForm.stock}
                        onChange={(e) =>
                          setSuministroForm({ ...suministroForm, stock: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-blue-500 focus:shadow-md focus:shadow-blue-500/20 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Mínimo
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={suministroForm.minimo}
                        onChange={(e) =>
                          setSuministroForm({ ...suministroForm, minimo: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-500 focus:shadow-md focus:shadow-orange-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Precio
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={suministroForm.precio}
                      onChange={(e) =>
                        setSuministroForm({ ...suministroForm, precio: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-md focus:shadow-emerald-500/20 focus:outline-none"
                      placeholder="50.00"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="group flex-1 rounded-xl bg-linear-to-r from-purple-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Box className="h-5 w-5 transition-transform group-hover:rotate-12" />
                      {editingItem ? 'Actualizar' : 'Guardar'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

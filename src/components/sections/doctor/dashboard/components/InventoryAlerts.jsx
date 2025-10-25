'use client';

// Static imports
import {
  Pill,
  FileText,
  Syringe,
  Package,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  TrendingDown,
} from 'lucide-react';

export default function InventoryAlerts() {
  // Render
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-rose-600 via-red-600 to-orange-600 px-6 py-5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <AlertTriangle className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <span className="text-xs font-bold text-rose-600">0</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Alertas de Inventario</h2>
              <p className="text-sm text-rose-100">Sin alertas activas</p>
            </div>
          </div>

          <button className="group flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 active:scale-95">
            <span>Ver más</span>
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-rose-50 px-6 py-4">
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <p className="text-xs font-semibold text-gray-600">Críticos</p>
          </div>
          <p className="text-2xl font-bold text-rose-600">0</p>
        </div>
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <TrendingDown className="h-4 w-4 text-amber-600" />
            <p className="text-xs font-semibold text-gray-600">Bajos</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">0</p>
        </div>
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <Package className="h-4 w-4 text-gray-600" />
            <p className="text-xs font-semibold text-gray-600">Total</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Example item */}
      <div className="p-6">
        <div className="relative flex items-center justify-between rounded-xl border-2 border-rose-300 bg-linear-to-r from-rose-50 to-red-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-linear-to-br from-rose-500 to-red-600 opacity-5" />

          <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
            <div className="relative rounded-xl bg-rose-100 p-3">
              <Pill className="h-5 w-5 text-rose-600" />
              <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-rose-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <p className="truncate text-sm font-bold text-gray-900">Atorvastatina 20mg</p>
                <span className="animate-pulse rounded-full bg-rose-600 px-2 py-0.5 text-xs font-bold text-white">
                  CRÍTICO
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-rose-600">Stock: 0 unidades</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">Mínimo: 15</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[20%] rounded-full bg-linear-to-r from-rose-500 to-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="mb-1 text-xs font-medium text-rose-600">Faltan 15 unid.</p>
              <p className="text-xs text-gray-500">0% del mínimo</p>
            </div>
            <AlertTriangle className="h-6 w-6 shrink-0 animate-bounce text-rose-600" />
          </div>

          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-linear-to-b from-rose-500 to-red-600" />
        </div>
      </div>

      {/* Empty state */}
      <div className="py-12 text-center">
        <div className="relative mb-4 inline-block">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-100 to-emerald-100">
            <Package className="h-10 w-10 text-green-600" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-lg">
            <span className="text-xl text-white">✓</span>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">¡Todo está bajo control!</h3>
        <p className="mb-1 text-gray-600">No hay alertas de inventario</p>
        <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
      </div>
    </div>
  );
}

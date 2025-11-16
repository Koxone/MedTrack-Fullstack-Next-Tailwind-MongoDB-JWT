import { Clock, User, DollarSign, Notebook } from 'lucide-react';
import AutocompleteMedicamentos from './components/medsSold/MedsSold';
import { useGetAllPatients } from '@/hooks/useGetAllPatients';

/* Form */
export default function ConsultationForm({ form, setForm }) {
  // Get Patients list call
  const { patients, isLoading, error } = useGetAllPatients();
  return (
    <div className="space-y-5">
      {/* Consult Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Tipo de consulta</label>

        {/* Helper text */}
        <p className="text-xs text-gray-500">
          Si es paciente de primera vez, priorizar crear su cuenta e historia clinica.
        </p>

        <select
          required
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Primera Consulta">Primera Vez</option>
          <option value="Consulta General">Subsecuente</option>
        </select>
      </div>

      {/* Patient */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <User className="h-4 w-4 text-purple-500" />
          Paciente
        </label>

        {form.type === 'Primera Consulta' ? (
          <input
            type="text"
            required
            disabled={!form.type}
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            placeholder="Nombre del paciente"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          />
        ) : (
          <select
            required
            disabled={!form.type}
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">Seleccionar paciente</option>

            {/* Ejemplo temporal */}
            {patients.map((patient) => (
              <option key={patient._id} value={patient.fullName}>
                {patient.fullName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Costo */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Costo
        </label>
        <input
          type="number"
          required
          min="0"
          step="0.01"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
          placeholder="800.00"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>

      {/* Payment Method */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-700">Método de pago</label>
        <select
          required
          value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        >
          <option value="">Seleccionar</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      </div>

      {/* Meds Sold */}
      <AutocompleteMedicamentos form={form} setForm={setForm} />

      {/* Optional Notes */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Notebook className="h-4 w-4 text-emerald-500" />
          Notas
        </label>
        <input
          type="text"
          required
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Notas adicionales (opcional)"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
        />
      </div>

      {/* Total */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          Total
        </label>

        <div className="relative">
          {/* Prefix */}
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 select-none">
            $
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.total}
            readOnly
            className="pointer-events-none w-full rounded-xl border-2 border-gray-200 px-8 py-3"
          />
        </div>
      </div>
    </div>
  );
}

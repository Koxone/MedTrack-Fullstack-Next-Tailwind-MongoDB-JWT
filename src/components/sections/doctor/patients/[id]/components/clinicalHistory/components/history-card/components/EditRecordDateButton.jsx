import { useState } from 'react';
import { Pencil, Check } from 'lucide-react';

export default function EditRecordDateButton({ onSelect }) {
  // UI state
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  // Today in MX timezone
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Mexico_City',
  });

  return (
    <div className="relative flex items-center justify-center">
      {/* Button */}
      <button
        title="Editar fecha de consulta"
        onClick={() => setOpen(!open)}
        className="text-beehealth-blue-primary-solid bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 flex items-center justify-center rounded-sm border px-2 py-1 text-xs font-semibold"
      >
        <Pencil className="h-4 w-4 text-white" />
      </button>

      {/* Date dropdown */}
      {open && (
        <div className="bg-beehealth-blue-primary-solid absolute bottom-full left-7 z-50 mb-2 -translate-x-1/2 rounded-md border p-2 shadow-lg">
          <input
            type="date"
            defaultValue={today}
            className="rounded border px-2 py-1 text-sm"
            onChange={(e) => {
              const value = e.target.value;
              onSelect(value);
              setOpen(false);

              // Show feedback
              setUpdated(true);
              setTimeout(() => setUpdated(false), 2000);
            }}
          />
        </div>
      )}

      {/* Feedback */}
      {updated && (
        <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow">
          <Check className="h-3 w-3" />
          Fecha actualizada
        </span>
      )}
    </div>
  );
}

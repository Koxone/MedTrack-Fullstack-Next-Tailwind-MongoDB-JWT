import { Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Duration({ diet, isEditing, editDiet }) {
  const [duration, setDuration] = useState(diet.duration || '');

  const [durValue, setDurValue] = useState(diet.description || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDurValue(diet.duration || '');
  }, [diet.duration]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      await editDiet(diet._id, { duration: durValue });
    } catch (err) {
      setError(err.message || 'Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      {/* Header block */}
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Clock className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Duración</h2>
      </div>

      {/* Content block */}
      {!isEditing && <p className="leading-relaxed text-gray-700">{duration}</p>}

      {/* Edit block */}
      {isEditing && (
        <textarea
          value={durValue}
          onChange={(e) => setDurValue(e.target.value)}
          placeholder="Ingresa la duración de la dieta"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 focus:border-orange-500 focus:outline-none"
          rows={2}
        />
      )}

      {isEditing && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-medtrack-green-secondary-solid hover:bg-medtrack-green-secondary-hover rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-opacity disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    </section>
  );
}

export default Duration;

import { Award, Info } from 'lucide-react';
import React from 'react';

function Benefits({
  benefitInputs,
  handleBenefitInputChange,
  handleAddBenefitInput,
  handleRemoveBenefitInput,
}) {
  return (
    <div className="border-beehealth-blue-light space-y-3 rounded-lg border p-4">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Award className="h-4 w-4 text-yellow-500" />
        Beneficios
      </label>

      {/* Benefits List */}
      <div className="space-y-3">
        {benefitInputs.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <div className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
              <span className="text-xs font-bold text-yellow-600">•</span>
            </div>
            <textarea
              value={benefit}
              onChange={(e) => handleBenefitInputChange(index, e.target.value)}
              placeholder={`Beneficio ${index + 1}...`}
              className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-yellow-500 focus:shadow-md focus:shadow-yellow-500/20 focus:outline-none"
              rows="1"
            />
            {benefitInputs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveBenefitInput(index)}
                className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddBenefitInput}
        className="w-full rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50 px-4 py-3.5 font-semibold text-yellow-600 shadow-sm transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-100 active:scale-95"
      >
        + Agregar beneficio
      </button>

      {/* Info */}
      <div className="flex items-start gap-2 rounded-lg bg-yellow-50 px-3 py-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
        <p className="text-xs text-yellow-700">
          Lista los beneficios principales que proporciona este ejercicio.
        </p>
      </div>
    </div>
  );
}

export default Benefits;

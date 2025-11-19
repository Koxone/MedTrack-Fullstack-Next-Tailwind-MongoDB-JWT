import { CheckCircle } from 'lucide-react';
import React from 'react';

export default function AllowedFoods({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Alimentos Permitidos</h2>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {diet.allowedFoods.items.map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3"
          >
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-green-600" />
            <span className="text-gray-700">{i}</span>
          </div>
        ))}
      </div>
      {diet.allowedFoods.note && (
        <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
          <p className="text-sm text-gray-600 italic">{diet.allowedFoods.note}</p>
        </div>
      )}
    </section>
  );
}

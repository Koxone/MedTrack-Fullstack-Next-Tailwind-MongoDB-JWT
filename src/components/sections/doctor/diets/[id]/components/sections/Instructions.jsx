import { Utensils } from 'lucide-react';
import React from 'react';

function Instructions({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2">
          <Utensils className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Instrucciones</h2>
      </div>
      <p className="leading-relaxed whitespace-pre-line text-gray-700">{diet.instructions}</p>
    </section>
  );
}

export default Instructions;

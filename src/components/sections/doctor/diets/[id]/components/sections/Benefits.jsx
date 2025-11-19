import { CheckCircle } from 'lucide-react';
import React from 'react';

function Benefits({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-green-100 p-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Beneficios</h2>
      </div>
      <p className="leading-relaxed text-gray-700">{diet.benefits}</p>
    </section>
  );
}

export default Benefits;

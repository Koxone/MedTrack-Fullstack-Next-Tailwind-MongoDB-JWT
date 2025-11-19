import { FileText } from 'lucide-react';
import React from 'react';

function Description({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-2">
          <FileText className="h-5 w-5 text-gray-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Descripción</h2>
      </div>
      <p className="leading-relaxed text-gray-700">{diet.description}</p>
    </section>
  );
}

export default Description;

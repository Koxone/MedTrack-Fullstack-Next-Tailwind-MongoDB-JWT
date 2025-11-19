import { Clock } from 'lucide-react';
import React from 'react';

function Duration({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Clock className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Duración</h2>
      </div>
      <p className="leading-relaxed text-gray-700">{diet.duration}</p>
    </section>
  );
}

export default Duration;

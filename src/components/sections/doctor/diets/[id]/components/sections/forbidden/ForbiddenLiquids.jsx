import React from 'react';
import { XCircle } from 'lucide-react';

function ForbiddenLiquids({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-red-100 p-2">
          <XCircle className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Líquidos Prohibidos</h2>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {diet.forbiddenLiquids.items.map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3"
          >
            <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-600" />
            <span className="text-gray-700">{i}</span>
          </div>
        ))}
      </div>
      {diet.forbiddenLiquids.note && (
        <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 p-3">
          <p className="text-sm text-gray-600 italic">{diet.forbiddenLiquids.note}</p>
        </div>
      )}
    </section>
  );
}

export default ForbiddenLiquids;

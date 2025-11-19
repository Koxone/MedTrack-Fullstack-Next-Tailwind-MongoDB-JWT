import React from 'react';

function Ingredients({ diet }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-4">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Ingredientes</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {diet.ingredients.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
            <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600"></div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Ingredients;

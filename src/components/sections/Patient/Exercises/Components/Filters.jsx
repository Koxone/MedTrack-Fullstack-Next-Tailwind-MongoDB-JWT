'use client';

export default function Filters({ categorias, active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-lg px-4 py-2 font-medium whitespace-nowrap transition active:scale-95 ${
            active === cat
              ? 'bg-blue-500 text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

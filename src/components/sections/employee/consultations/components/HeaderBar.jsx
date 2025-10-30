'use client';

/* header */
export default function HeaderBar({ icons }) {
  const { DollarSign } = icons;
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 p-3 shadow-lg">
            <DollarSign className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Control de Consultas
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Registro y gestión de cobros de consultas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

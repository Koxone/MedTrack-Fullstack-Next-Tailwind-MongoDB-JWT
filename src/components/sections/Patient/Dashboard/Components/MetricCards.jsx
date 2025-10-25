'use client';

import { Weight, Activity, TrendingDown, Calendar } from 'lucide-react';

/* helpers */
const borderColors = {
  blue: 'border-blue-500',
  green: 'border-green-500',
  purple: 'border-purple-500',
};

/* grid */
export default function MetricCards({
  metrics,
  selectedMetric,
  onSelectMetric,
  onOpenAppointments,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon =
          metric.icon === 'Weight' ? Weight : metric.icon === 'Activity' ? Activity : TrendingDown;
        const isSelected = selectedMetric === metric.id;

        return (
          <button
            key={metric.id}
            onClick={() => onSelectMetric(metric.id)}
            className={`rounded-xl border-2 bg-white p-3 text-left shadow-sm transition hover:shadow-md active:scale-95 md:p-6 ${
              isSelected ? borderColors[metric.color] : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="mb-1 text-xs font-medium text-gray-600 md:text-sm">{metric.title}</p>
                <p className="mb-1 text-xl font-bold text-gray-900 md:mb-2 md:text-3xl">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500 md:text-sm">{metric.subtitle}</p>
              </div>
              <div
                className={`rounded-lg p-2 md:p-3 ${
                  metric.color === 'blue'
                    ? 'bg-blue-50 text-blue-600'
                    : metric.color === 'green'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-purple-50 text-purple-600'
                }`}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
              </div>
            </div>

            {isSelected && (
              <div className="mt-2 border-t border-gray-200 pt-2">
                <p className="text-xs font-medium text-blue-600">Mostrando en gráfica</p>
              </div>
            )}
          </button>
        );
      })}

      {/* next appointment */}
      <button
        onClick={onOpenAppointments}
        className="rounded-xl border-2 border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md active:scale-95 md:p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-1 text-xs font-medium text-gray-600 md:text-sm">Próxima Cita</p>
            <p className="mb-1 text-xl font-bold text-gray-900 md:mb-2 md:text-3xl">25 Oct</p>
            <p className="text-xs text-gray-500 md:text-sm">Dr. García</p>
          </div>
          <div className="rounded-lg bg-red-50 p-2 text-red-600 md:p-3">
            <Calendar className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </button>
    </div>
  );
}

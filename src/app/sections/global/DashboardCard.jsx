export default function DashboardCard({ icon: Icon, title, value, subtitle, trend, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{value}</p>
          {subtitle && <p className="text-xs md:text-sm text-gray-500">{subtitle}</p>}
          {trend && (
            <p className={`text-xs md:text-sm font-medium mt-1 md:mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
              {trend > 0 ? "+" : ""}{trend}%
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2 md:p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        )}
      </div>
    </div>
  );
}


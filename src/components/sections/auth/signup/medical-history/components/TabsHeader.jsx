import { ClipboardPlus, Sparkles } from 'lucide-react';

export default function TabsHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'peso', label: 'Informacion del Paciente', color: 'blue', icon: ClipboardPlus },
    { id: 'estetico', label: 'Tratamiento Estético', color: 'purple', icon: Sparkles },
  ];

  return (
    <div className="grid grid-cols-1 border-b border-gray-200">
      {tabs.map(({ id, label, color, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center justify-center gap-2 px-4 py-4 font-medium transition ${
            activeTab === id
              ? `bg-${color}-500 text-white`
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm md:text-base">{label}</span>
        </button>
      ))}
    </div>
  );
}

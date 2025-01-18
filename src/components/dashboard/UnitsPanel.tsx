import { User, TrendingUp, Robot, Briefcase } from 'lucide-react';

const UnitsPanel = () => {
  const units = [
    { icon: User, label: 'Analysts', count: 5, color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Traders', count: 3, color: 'text-green-400' },
    { icon: Robot, label: 'AI Bots', count: 8, color: 'text-purple-400' },
    { icon: Briefcase, label: 'Consultants', count: 2, color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-crypto-dark p-6 rounded-lg border border-crypto-blue/20 shadow-lg">
      <h2 className="text-xl font-bold text-crypto-blue mb-6">Units</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {units.map((unit) => (
          <div 
            key={unit.label}
            className="flex flex-col items-center p-4 bg-crypto-gray rounded-lg hover:bg-crypto-gray/80 transition-colors cursor-pointer"
          >
            <unit.icon className={`w-8 h-8 ${unit.color} mb-2`} />
            <span className="text-gray-300 text-sm">{unit.label}</span>
            <span className={`${unit.color} font-bold`}>{unit.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitsPanel;
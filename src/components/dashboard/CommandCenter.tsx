import { LineChart, Activity, AlertTriangle } from 'lucide-react';

const CommandCenter = () => {
  const portfolioStats = [
    { label: 'Total Assets', value: '$2.5M', change: '+5.2%', isPositive: true },
    { label: 'Daily P&L', value: '$12.5K', change: '-1.8%', isPositive: false },
    { label: 'Risk Score', value: '72/100', change: '↑ Medium', isPositive: true },
  ];

  const upcomingEvents = [
    { title: 'Fed Meeting', time: '2h', risk: 'high' },
    { title: 'Earnings Report', time: '6h', risk: 'medium' },
    { title: 'Market Open', time: '12h', risk: 'low' },
  ];

  return (
    <div className="bg-crypto-dark p-6 rounded-lg border border-crypto-blue/20 shadow-lg">
      <h2 className="text-xl font-bold text-crypto-blue mb-6">Command Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg text-crypto-blue flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            Portfolio Overview
          </h3>
          <div className="space-y-3">
            {portfolioStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-3 bg-crypto-gray rounded-lg">
                <span className="text-gray-300">{stat.label}</span>
                <div className="text-right">
                  <div className="font-bold text-white">{stat.value}</div>
                  <div className={stat.isPositive ? 'text-green-400' : 'text-red-400'}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg text-crypto-blue flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="flex items-center justify-between p-3 bg-crypto-gray rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    event.risk === 'high' ? 'text-red-400' :
                    event.risk === 'medium' ? 'text-yellow-400' :
                    'text-green-400'
                  }`} />
                  <span className="text-gray-300">{event.title}</span>
                </div>
                <span className="text-crypto-blue">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
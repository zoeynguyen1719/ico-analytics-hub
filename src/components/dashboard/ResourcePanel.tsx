import { useState } from 'react';
import { DollarSign, Briefcase, Bitcoin, TrendingUp, LineChart } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const ResourcePanel = () => {
  const [capital, setCapital] = useState(1000000);
  const [stocks, setStocks] = useState(500000);
  const [bonds, setBonds] = useState(300000);
  const [crypto, setCrypto] = useState(200000);
  const [leverage, setLeverage] = useState(20);

  const resources = [
    { icon: DollarSign, label: 'Capital', value: capital, color: 'text-green-400' },
    { icon: Briefcase, label: 'Stocks', value: stocks, color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Bonds', value: bonds, color: 'text-yellow-400' },
    { icon: Bitcoin, label: 'Crypto', value: crypto, color: 'text-orange-400' },
    { icon: LineChart, label: 'Leverage', value: `${leverage}%`, color: 'text-purple-400' },
  ];

  return (
    <div className="bg-crypto-dark p-6 rounded-lg border border-crypto-blue/20 shadow-lg">
      <h2 className="text-xl font-bold text-crypto-blue mb-6">Resources</h2>
      <div className="space-y-6">
        {resources.map((resource) => (
          <div key={resource.label} className="space-y-2">
            <div className="flex items-center gap-3">
              <resource.icon className={`w-5 h-5 ${resource.color}`} />
              <span className="text-gray-300">{resource.label}</span>
              <span className={`ml-auto font-mono ${resource.color}`}>
                {typeof resource.value === 'number' 
                  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(resource.value)
                  : resource.value}
              </span>
            </div>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={(value) => {
                switch(resource.label) {
                  case 'Capital': setCapital(value[0] * 20000);
                    break;
                  case 'Stocks': setStocks(value[0] * 10000);
                    break;
                  case 'Bonds': setBonds(value[0] * 6000);
                    break;
                  case 'Crypto': setCrypto(value[0] * 4000);
                    break;
                  case 'Leverage': setLeverage(value[0]);
                    break;
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcePanel;
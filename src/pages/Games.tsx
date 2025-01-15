import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bitcoin, Wallet, Shield, UserCog, HardDrive, PlayCircle } from "lucide-react";

const Games = () => {
  const roles = [
    {
      id: 1,
      title: "Trader",
      icon: <Bitcoin className="w-8 h-8 text-yellow-400" />,
      description: "Specialize in market timing and quick trades",
      abilities: ["Price manipulation", "Quick trade bonuses", "Market analysis"]
    },
    {
      id: 2,
      title: "Investor",
      icon: <Wallet className="w-8 h-8 text-crypto-blue" />,
      description: "Build projects for passive income generation",
      abilities: ["Project development", "Passive income", "Portfolio management"]
    },
    {
      id: 3,
      title: "Hacker",
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      description: "Execute strategic attacks and defense",
      abilities: ["Resource theft", "System sabotage", "Defense breaching"]
    },
    {
      id: 4,
      title: "Regulator",
      icon: <UserCog className="w-8 h-8 text-green-500" />,
      description: "Control market stability and regulations",
      abilities: ["Market restrictions", "Stability bonuses", "Regulatory power"]
    },
    {
      id: 5,
      title: "Miner",
      icon: <HardDrive className="w-8 h-8 text-orange-500" />,
      description: "Focus on resource mining and network security",
      abilities: ["Resource generation", "Network validation", "Mining rewards"]
    }
  ];

  const games = [
    {
      id: 1,
      title: "Citadel Card Game",
      description: "A strategic card game where players compete to build the most valuable crypto portfolio. Trade, stake, and outmaneuver your opponents in this exciting blockchain-themed card game.",
      image: "/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png",
      status: "Coming Soon",
      features: [
        "Strategic deck building",
        "Crypto market simulation",
        "Multiplayer battles",
        "Daily challenges"
      ]
    },
    {
      id: 2,
      title: "Crypto Trading Simulator",
      description: "Practice trading with virtual currency in a risk-free environment",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      status: "Coming Soon",
    },
    {
      id: 3,
      title: "ICO Investment Challenge",
      description: "Test your ICO investment skills and compete with other players",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      status: "Coming Soon",
    },
    {
      id: 4,
      title: "Crypto Quiz",
      description: "Test your knowledge about cryptocurrencies and blockchain",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      status: "Coming Soon",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-crypto-dark to-black p-8 border border-crypto-gray">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">Crypto Strategy Games</h1>
            <p className="text-gray-300 max-w-2xl mb-6">
              Enter a world of strategic crypto trading and investment. Choose your role, build your portfolio, and compete against others in this immersive blockchain gaming experience.
            </p>
            <Button className="bg-crypto-blue hover:bg-crypto-blue/90">
              <PlayCircle className="mr-2" />
              Play Now
            </Button>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4BA3CC1A_1px,transparent_1px),linear-gradient(to_bottom,#4BA3CC1A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        {/* Roles Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="bg-crypto-gray border-crypto-gray hover:border-crypto-blue transition-all duration-300 group cursor-pointer">
                <CardHeader className="space-y-4 text-center">
                  <div className="mx-auto bg-crypto-dark p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {role.icon}
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-crypto-blue transition-colors">
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-400 text-center">
                    {role.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {role.abilities.map((ability, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-crypto-blue rounded-full mr-2"></span>
                        {ability}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Games Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Available Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="bg-crypto-gray border-crypto-gray hover:border-crypto-blue transition-colors cursor-pointer group">
                <CardHeader className="relative p-0">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-crypto-blue">
                      {game.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-white group-hover:text-crypto-blue transition-colors">
                    {game.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {game.description}
                  </CardDescription>
                  {game.features && (
                    <ul className="mt-4 space-y-2">
                      {game.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-400 flex items-center">
                          <span className="w-2 h-2 bg-crypto-blue rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Games;
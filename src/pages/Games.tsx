import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Bitcoin, Wallet, Shield, UserCog, HardDrive, PlayCircle } from "lucide-react";
import GameBoard from "@/components/game/GameBoard";

const roles = [
  {
    id: 1,
    title: "Trader",
    icon: <Bitcoin className="w-8 h-8 text-yellow-500" />,
    description: "Master of market timing and price manipulation",
    abilities: ["Price manipulation", "Quick trades", "Market analysis"]
  },
  {
    id: 2,
    title: "Investor",
    icon: <Wallet className="w-8 h-8 text-green-500" />,
    description: "Build and manage long-term investments",
    abilities: ["Passive income", "Project building", "Portfolio management"]
  },
  {
    id: 3,
    title: "Hacker",
    icon: <Shield className="w-8 h-8 text-red-500" />,
    description: "Exploit vulnerabilities and steal resources",
    abilities: ["Resource theft", "System attacks", "Defense breaching"]
  },
  {
    id: 4,
    title: "Regulator",
    icon: <UserCog className="w-8 h-8 text-blue-500" />,
    description: "Control the market through rules and restrictions",
    abilities: ["Market control", "Rule enforcement", "Stability bonuses"]
  },
  {
    id: 5,
    title: "Miner",
    icon: <HardDrive className="w-8 h-8 text-orange-500" />,
    description: "Focus on resource mining and network security",
    abilities: ["Resource generation", "Network validation", "Mining rewards"]
  }
];

const Games = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-crypto-dark text-white">
        {!showGame ? (
          <>
            {/* Hero Section */}
            <div className="relative py-20 px-6 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-20" />
              <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
                  Crypto Strategy Game
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Build your crypto empire, trade assets, and compete in a dynamic market
                </p>
                <Button 
                  size="lg"
                  className="bg-crypto-blue hover:bg-crypto-blue/90 text-white"
                  onClick={() => setShowGame(true)}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
              </div>
            </div>

            {/* Roles Section */}
        <div className="py-16 px-6 bg-crypto-gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-crypto-blue">
              Choose Your Role
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <Card key={role.id} className="bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {role.icon}
                      <CardTitle className="text-xl text-white">{role.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 mb-4">
                      {role.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {role.abilities.map((ability, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-crypto-blue" />
                          {ability}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

            {/* Game Modes Section */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-crypto-blue">
              Game Modes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Solo Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    Challenge AI opponents and perfect your strategy
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Multiplayer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    Compete with up to 6 players in real-time matches
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
          </>
        ) : (
          <div className="py-8">
            <Button 
              onClick={() => setShowGame(false)}
              className="mb-8 ml-8 bg-crypto-gray hover:bg-crypto-gray/90"
            >
              Back to Menu
            </Button>
            <GameBoard />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Games;

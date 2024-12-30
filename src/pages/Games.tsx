import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";

const Games = () => {
  const games = [
    {
      id: 1,
      title: "Crypto Trading Simulator",
      description: "Practice trading with virtual currency in a risk-free environment",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      status: "Coming Soon",
    },
    {
      id: 2,
      title: "ICO Investment Challenge",
      description: "Test your ICO investment skills and compete with other players",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      status: "Coming Soon",
    },
    {
      id: 3,
      title: "Crypto Quiz",
      description: "Test your knowledge about cryptocurrencies and blockchain",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      status: "Coming Soon",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Crypto Games</h1>
          <p className="text-gray-400">
            Explore our collection of crypto-themed games and challenges
          </p>
        </div>

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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Games;
import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Role = {
  id: number;
  title: string;
  description: string;
  startingResources: number;
  winCondition: number;
  abilities: string[];
};

type Player = {
  position: number;
  color: string;
  name: string;
  role?: Role;
  resources: number;
};

type GameLog = {
  message: string;
  timestamp: Date;
};

const BOARD_SIZE = 5;
const TOTAL_TILES = BOARD_SIZE * BOARD_SIZE;

const ROLES: Role[] = [
  {
    id: 1,
    title: "Trader",
    description: "Master of market timing",
    startingResources: 1000,
    winCondition: 5000,
    abilities: ["Quick trades", "Market analysis"]
  },
  {
    id: 2,
    title: "Investor",
    description: "Long-term portfolio builder",
    startingResources: 2000,
    winCondition: 10000,
    abilities: ["Passive income", "Portfolio management"]
  },
  {
    id: 3,
    title: "Hacker",
    description: "System vulnerability expert",
    startingResources: 500,
    winCondition: 3000,
    abilities: ["Resource theft", "System attacks"]
  },
  {
    id: 4,
    title: "Regulator",
    description: "Market stability enforcer",
    startingResources: 1500,
    winCondition: 7000,
    abilities: ["Market control", "Rule enforcement"]
  },
  {
    id: 5,
    title: "Miner",
    description: "Resource generation specialist",
    startingResources: 800,
    winCondition: 4000,
    abilities: ["Mining rewards", "Network validation"]
  }
];

const GameBoard = () => {
  const [players, setPlayers] = useState<Player[]>([
    { position: 0, color: '#6FD5FF', name: 'Player 1', resources: 0 },
    { position: 0, color: '#4BA3CC', name: 'Player 2', resources: 0 }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const addToLog = (message: string) => {
    setGameLog(prev => [{
      message,
      timestamp: new Date()
    }, ...prev].slice(0, 5));
  };

  const selectRole = (role: Role) => {
    const updatedPlayers = [...players];
    updatedPlayers[0] = {
      ...updatedPlayers[0],
      role,
      resources: role.startingResources
    };
    setPlayers(updatedPlayers);
    setSelectedRole(role);
    setGameStarted(true);
    addToLog(`Selected role: ${role.title}`);
    toast({
      title: "Role Selected",
      description: `You are now playing as a ${role.title}`,
    });
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
      setDiceValue(roll);
      movePlayer(roll);
      setIsRolling(false);
    }, 1000);
  };

  const movePlayer = (spaces: number) => {
    const player = players[currentPlayer];
    let newPosition = player.position + spaces;
    
    if (newPosition >= TOTAL_TILES) {
      newPosition = TOTAL_TILES - 1;
    }

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer] = {
      ...player,
      position: newPosition
    };

    setPlayers(updatedPlayers);
    handleTileEffect(newPosition);
    setCurrentPlayer(prev => (prev + 1) % 2);
    addToLog(`${player.name} moved ${spaces} spaces to position ${newPosition + 1}`);
  };

  const handleTileEffect = (position: number) => {
    const player = players[currentPlayer];
    const role = player.role;
    if (!role) return;

    const effects = [
      { message: 'Market boom! Gained 500 coins! 🚀', amount: 500 },
      { message: 'Market crash! Lost 300 coins 📉', amount: -300 },
      { message: 'Airdrop received! +200 coins 🎁', amount: 200 },
      { message: 'Network fee! -100 coins 💸', amount: -100 },
      { message: 'Mining reward! +150 coins ⛏️', amount: 150 }
    ];
    
    const effect = effects[Math.floor(Math.random() * effects.length)];
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer].resources += effect.amount;
    setPlayers(updatedPlayers);
    addToLog(effect.message);

    // Check win condition
    if (updatedPlayers[currentPlayer].resources >= role.winCondition) {
      toast({
        title: "Congratulations!",
        description: `${player.name} has won the game as ${role.title}!`,
      });
    }
  };

  const DiceIcon = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6
  }[diceValue];

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-crypto-blue mb-6">Select Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role) => (
            <div
              key={role.id}
              onClick={() => selectRole(role)}
              className="bg-crypto-dark p-6 rounded-lg border border-crypto-blue hover:border-crypto-green cursor-pointer transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-crypto-blue mb-2">{role.title}</h3>
              <p className="text-gray-300 mb-4">{role.description}</p>
              <div className="text-sm text-gray-400">
                <p>Starting Resources: {role.startingResources}</p>
                <p>Win Condition: {role.winCondition}</p>
              </div>
              <div className="mt-4">
                <h4 className="text-crypto-blue mb-2">Abilities:</h4>
                <ul className="list-disc list-inside">
                  {role.abilities.map((ability, index) => (
                    <li key={index} className="text-gray-300">{ability}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-5 gap-1 bg-crypto-dark p-2 rounded-lg">
        {Array.from({ length: TOTAL_TILES }).map((_, index) => {
          const playersHere = players.filter(p => p.position === index);
          return (
            <div
              key={index}
              className="w-16 h-16 md:w-24 md:h-24 bg-crypto-gray border border-crypto-blue rounded-lg relative flex items-center justify-center"
            >
              <span className="text-crypto-blue text-sm">{index + 1}</span>
              {playersHere.map((player, idx) => (
                <div
                  key={idx}
                  className="absolute w-6 h-6 rounded-full animate-bounce"
                  style={{
                    backgroundColor: player.color,
                    top: idx * 8 + 4,
                    right: idx * 8 + 4,
                  }}
                />
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex items-center justify-between w-full">
          <div className="text-crypto-blue">
            {players[currentPlayer].name}'s Turn
            {players[currentPlayer].role && (
              <span className="ml-2">({players[currentPlayer].role.title})</span>
            )}
          </div>
          <div className="text-crypto-blue">
            Resources: {players[currentPlayer].resources}
          </div>
        </div>

        <Button
          onClick={rollDice}
          disabled={isRolling}
          className="bg-crypto-blue hover:bg-crypto-blue/90 text-white"
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
          {DiceIcon && <DiceIcon className="ml-2" />}
        </Button>

        <div className="w-full bg-crypto-gray rounded-lg p-4">
          <h3 className="text-crypto-blue mb-2">Game Log</h3>
          <div className="space-y-2">
            {gameLog.map((log, index) => (
              <div key={index} className="text-sm text-gray-300">
                {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
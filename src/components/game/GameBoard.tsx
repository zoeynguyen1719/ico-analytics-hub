import React, { useState, useEffect } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Player = {
  position: number;
  color: string;
  name: string;
};

type GameLog = {
  message: string;
  timestamp: Date;
};

const BOARD_SIZE = 5;
const TOTAL_TILES = BOARD_SIZE * BOARD_SIZE;

const GameBoard = () => {
  const [players, setPlayers] = useState<Player[]>([
    { position: 0, color: '#6FD5FF', name: 'Player 1' },
    { position: 0, color: '#4BA3CC', name: 'Player 2' },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gameLog, setGameLog] = useState<GameLog[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const addToLog = (message: string) => {
    setGameLog(prev => [{
      message,
      timestamp: new Date()
    }, ...prev].slice(0, 5));
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
    const effects = [
      'Gained 100 crypto coins! 🚀',
      'Market crash! Lost 50 coins 📉',
      'Airdrop received! +25 coins 🎁',
      'Network fee! -10 coins 💸',
      'Mining reward! +30 coins ⛏️'
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    addToLog(randomEffect);
  };

  const DiceIcon = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6
  }[diceValue];

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
        <div className="flex items-center gap-4">
          <Button
            onClick={rollDice}
            disabled={isRolling}
            className="bg-crypto-blue hover:bg-crypto-blue/90 text-white"
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
            {DiceIcon && <DiceIcon className="ml-2" />}
          </Button>
          <div className="text-crypto-blue">
            {players[currentPlayer].name}'s Turn
          </div>
        </div>

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
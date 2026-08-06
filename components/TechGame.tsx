import React, { useState, useEffect, useRef, useCallback } from 'react';

const SHORT_COMMANDS = ['npm start', 'git pull', 'yarn init', 'npm test', 'git add .', 'ls -la', 'cd ..'];
const MEDIUM_COMMANDS = ['npm run dev', 'yarn install', 'npm run build', 'docker build', 'git status'];
const LONG_COMMANDS = [
  'git push origin main',
  'docker-compose up',
  'sudo rm -rf node_modules',
  'npx prisma generate',
  'git commit -m "fix"',
  'kubectl get pods',
  'git checkout -b feature'
];

interface FallingWord {
  id: string;
  text: string;
  y: number;
  x: number;
  speed: number;
}

const TechGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [input, setInput] = useState('');
  const [words, setWords] = useState<FallingWord[]>([]);
  
  const wordsRef = useRef<FallingWord[]>([]);
  const requestRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);
  const spawnRate = useRef<number>(3000); // ms between spawns
  const gameSpeed = useRef<number>(0.05); // y increase per frame
  const scoreRef = useRef<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const spawnWord = () => {
    let pool = SHORT_COMMANDS;
    if (scoreRef.current > 150) pool = [...SHORT_COMMANDS, ...MEDIUM_COMMANDS];
    if (scoreRef.current > 400) pool = [...MEDIUM_COMMANDS, ...LONG_COMMANDS];
    
    const text = pool[Math.floor(Math.random() * pool.length)];
    const newWord: FallingWord = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      y: -5,
      x: 5 + Math.random() * 60, // 5% to 65% width to avoid overflow
      speed: gameSpeed.current + (Math.random() * 0.05),
    };
    wordsRef.current = [...wordsRef.current, newWord];
  };

  const gameLoop = useCallback((time: number) => {
    if (time - lastSpawnTime.current > spawnRate.current) {
      spawnWord();
      lastSpawnTime.current = time;
      // gradually increase difficulty
      spawnRate.current = Math.max(700, spawnRate.current - 50);
      gameSpeed.current += 0.005;
    }

    let missed = 0;
    wordsRef.current = wordsRef.current.map(w => ({ ...w, y: w.y + w.speed })).filter(w => {
      if (w.y > 95) { // bottom of terminal
        missed++;
        return false;
      }
      return true;
    });

    if (missed > 0) {
      setLives(prev => {
        const next = prev - missed;
        if (next <= 0) {
          setGameOver(true);
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }

    setWords([...wordsRef.current]);
    
    if (isPlaying && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      lastSpawnTime.current = performance.now();
      requestRef.current = requestAnimationFrame(gameLoop);
      if (inputRef.current) inputRef.current.focus();
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameOver, gameLoop]);

  const handleStart = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    setLives(3);
    setInput('');
    wordsRef.current = [];
    setWords([]);
    spawnRate.current = 3000;
    gameSpeed.current = 0.05;
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    // Check for match
    const matchIndex = wordsRef.current.findIndex(w => w.text === val);
    if (matchIndex !== -1) {
      // Remove word, add score, clear input
      wordsRef.current = wordsRef.current.filter((_, i) => i !== matchIndex);
      const points = val.length * 10;
      setScore(prev => prev + points);
      scoreRef.current += points;
      setInput('');
      setWords([...wordsRef.current]);
    }
  };

  return (
    <section className="mb-24 relative z-[70] max-w-3xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-textPrimary tracking-tight">
          Mini-Game: Terminal Hacker
        </h2>
        <p className="text-sm text-textSecondary mt-2 max-w-md mx-auto">
          Type the commands exactly as they appear before they crash the server!
        </p>
      </div>

      <div id="playground" className="bg-[#0c0c0c] rounded-xl border border-gray-800 overflow-hidden shadow-2xl h-[500px] flex flex-col font-mono relative">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-4 py-2 flex justify-between items-center z-10">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-xs hidden sm:block">bash -- 80x24</div>
          <div className="flex gap-4 text-xs font-bold">
            <span className="text-green-400">SCORE: {score}</span>
            <span className="text-red-400">LIVES: {'❤'.repeat(lives)}</span>
          </div>
        </div>

        {/* Game Area */}
        <div 
          className="flex-grow relative overflow-hidden bg-[#0c0c0c] cursor-text" 
          onClick={() => inputRef.current?.focus()}
        >
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
              <p className="text-green-400 mb-6 font-mono">Ready to hack the mainframe?</p>
              <button 
                onClick={handleStart}
                className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors font-bold uppercase tracking-wider"
              >
                Initialize
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20 z-20 backdrop-blur-sm">
              <h3 className="text-4xl font-black text-red-500 mb-2 tracking-widest">SYSTEM FAILURE</h3>
              <p className="text-red-400 mb-6 text-lg">Final Score: {score}</p>
              <button 
                onClick={handleStart}
                className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-bold uppercase tracking-wider"
              >
                Reboot System
              </button>
            </div>
          )}

          {/* Falling Words */}
          {words.map(w => {
            // Highlight typed portion if it matches the start of this word
            const isMatchStart = input.length > 0 && w.text.startsWith(input);
            return (
              <div 
                key={w.id} 
                className="absolute whitespace-nowrap text-sm md:text-base font-medium drop-shadow-md"
                style={{ top: `${w.y}%`, left: `${w.x}%` }}
              >
                {isMatchStart ? (
                  <>
                    <span className="text-green-400 bg-green-400/20">{w.text.substring(0, input.length)}</span>
                    <span className="text-gray-500">{w.text.substring(input.length)}</span>
                  </>
                ) : (
                  <span className="text-green-500">{w.text}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Terminal Input */}
        <div className="bg-[#111] border-t border-gray-800 p-4 flex items-center z-10 text-sm md:text-base">
          <span className="text-green-500 font-bold mr-2 whitespace-nowrap">dakshata@portfolio:~$</span>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={handleInputChange}
            disabled={!isPlaying || gameOver}
            className="flex-grow bg-transparent text-gray-100 outline-none font-mono"
            spellCheck={false}
            autoComplete="off"
          />
        </div>

      </div>
    </section>
  );
};

export default TechGame;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const DODGES_TO_CATCH = 6;

const RunawayButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);
  const [caught, setCaught] = useState(false);

  const dodge = () => {
    const container = containerRef.current;
    const btn = btnRef.current;
    if (!container || !btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxX = Math.max(containerRect.width - btnRect.width, 0);
    const maxY = Math.max(containerRect.height - btnRect.height, 0);

    setPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    setDodges((prev) => {
      const next = prev + 1;
      if (next >= DODGES_TO_CATCH) setCaught(true);
      return next;
    });
  };

  const handleInteraction = () => {
    if (caught) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      return;
    }
    dodge();
  };

  const reset = () => {
    setCaught(false);
    setDodges(0);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="relative w-full h-40 sm:h-48">
      <motion.button
        ref={btnRef}
        onMouseEnter={handleInteraction}
        onClick={handleInteraction}
        animate={{ x: pos.x, y: pos.y, scale: caught ? [1, 1.15, 1] : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`absolute top-0 left-0 px-6 py-3 rounded-full font-medium shadow-lg whitespace-nowrap ${
          caught ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {caught ? 'Fine, you got me 🎉' : 'Click me if you can'}
      </motion.button>
      {caught && (
        <button
          onClick={reset}
          className="absolute bottom-0 right-0 text-xs text-textSecondary hover:text-textPrimary underline"
        >
          Play again
        </button>
      )}
    </div>
  );
};

export default RunawayButton;

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TAUNTS = [
  'Click me if you can',
  'Nice try 😏',
  'So close!',
  'Not happening',
  'Still trying? 😂',
  "You'll never catch me",
  'Persistent, huh?',
  "It's not gonna happen",
];

const RunawayButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const dodge = () => {
    const container = containerRef.current;
    const btn = btnRef.current;
    if (!container || !btn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxX = Math.max(containerRect.width - btnRect.width, 0);
    const maxY = Math.max(containerRect.height - btnRect.height, 0);

    setPos({ x: Math.random() * maxX, y: Math.random() * maxY });
    setAttempts((prev) => prev + 1);
  };

  const taunt = TAUNTS[Math.min(attempts, TAUNTS.length - 1)];

  return (
    <div ref={containerRef} className="relative w-full h-40 sm:h-48">
      <motion.button
        ref={btnRef}
        onMouseEnter={dodge}
        onClick={dodge}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute top-0 left-0 px-6 py-3 rounded-full bg-red-500 text-white font-medium shadow-lg whitespace-nowrap"
      >
        {taunt}
      </motion.button>
    </div>
  );
};

export default RunawayButton;

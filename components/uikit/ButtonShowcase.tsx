import React from 'react';
import MagneticButton from './buttons/MagneticButton';
import GradientButton from './buttons/GradientButton';
import GlassButton from './buttons/GlassButton';
import LoadingButton from './buttons/LoadingButton';
import OutlineIconButton from './buttons/OutlineIconButton';
import CodeBlock from './CodeBlock';

interface Entry {
  name: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

const ENTRIES: Entry[] = [
  {
    name: 'Magnetic Button',
    description: 'Pulls toward the cursor on hover with a spring, snaps back on leave.',
    preview: <MagneticButton>Hover me</MagneticButton>,
    code: `import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 rounded-full bg-black text-white font-medium shadow-lg"
    >
      {children}
    </motion.button>
  );
};`,
  },
  {
    name: 'Gradient Button',
    description: 'Animated gradient that slides on hover instead of just fading.',
    preview: <GradientButton>Get Started</GradientButton>,
    code: `const GradientButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full text-white font-medium
      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
      bg-[length:200%_auto] hover:bg-[position:right_center]
      transition-[background-position] duration-500
      shadow-lg hover:shadow-purple-500/30"
  >
    {children}
  </button>
);`,
  },
  {
    name: 'Glass Button',
    description: 'Frosted, translucent — reads best over a colorful or busy background.',
    preview: <GlassButton>Continue</GlassButton>,
    code: `const GlassButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full backdrop-blur-md
      bg-white/10 dark:bg-white/5 border border-white/20
      text-current font-medium
      hover:bg-white/20 dark:hover:bg-white/10
      transition-colors shadow-sm"
  >
    {children}
  </button>
);`,
  },
  {
    name: 'Loading Button',
    description: 'Swaps to a spinner and disables itself while an async action runs.',
    preview: <LoadingButton>Submit</LoadingButton>,
    code: `import { useState } from 'react';

const LoadingButton = ({ children, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick?.();
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-6 py-3 rounded-full bg-black text-white font-medium
        shadow-md disabled:opacity-70 flex items-center gap-2
        min-w-[140px] justify-center"
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {loading ? 'Loading…' : children}
    </button>
  );
};`,
  },
  {
    name: 'Outline Icon Button',
    description: 'Border-only until hover, when it fills solid and the arrow slides.',
    preview: <OutlineIconButton>Explore</OutlineIconButton>,
    code: `const OutlineIconButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="group px-6 py-3 rounded-full border-2 border-black
      text-black font-medium flex items-center gap-2
      hover:bg-black hover:text-white transition-colors"
  >
    {children}
    <svg
      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
);`,
  },
];

const ButtonShowcase: React.FC = () => (
  <div className="space-y-8">
    {ENTRIES.map((entry) => (
      <div key={entry.name} className="rounded-2xl glass border border-accent shadow-sm overflow-hidden">
        <div className="relative p-8 md:p-12 flex items-center justify-center min-h-[160px] overflow-hidden bg-accent/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_75%_80%,rgba(236,72,153,0.18),transparent_55%)]" />
          <div className="relative">{entry.preview}</div>
        </div>
        <div className="p-6 border-t border-accent">
          <h3 className="text-base font-bold text-textPrimary mb-1">{entry.name}</h3>
          <p className="text-sm text-textSecondary mb-4">{entry.description}</p>
          <CodeBlock code={entry.code} />
        </div>
      </div>
    ))}
  </div>
);

export default ButtonShowcase;

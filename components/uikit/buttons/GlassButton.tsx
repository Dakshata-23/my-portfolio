import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const GlassButton: React.FC<GlassButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 text-textPrimary font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors shadow-sm"
  >
    {children}
  </button>
);

export default GlassButton;

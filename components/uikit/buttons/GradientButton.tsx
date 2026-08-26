import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_auto] hover:bg-[position:right_center] transition-[background-position] duration-500 shadow-lg hover:shadow-purple-500/30"
  >
    {children}
  </button>
);

export default GradientButton;

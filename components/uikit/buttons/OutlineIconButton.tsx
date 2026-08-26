import React from 'react';

interface OutlineIconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const OutlineIconButton: React.FC<OutlineIconButtonProps> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="group px-6 py-3 rounded-full border-2 border-textPrimary text-textPrimary font-medium flex items-center gap-2 hover:bg-textPrimary hover:text-background transition-colors"
  >
    {children}
    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </button>
);

export default OutlineIconButton;

import React, { useState } from 'react';

interface LoadingButtonProps {
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="px-6 py-3 rounded-full bg-textPrimary text-background font-medium shadow-md disabled:opacity-70 flex items-center gap-2 min-w-[140px] justify-center transition-opacity"
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
};

export default LoadingButton;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ButtonShowcase from '../components/uikit/ButtonShowcase';

const ButtonsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative z-10 py-12">
      <main className="max-w-3xl mx-auto px-6 lg:px-8">
        <nav className="mb-12">
          <Link
            to="/components"
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary font-medium transition-colors text-sm group w-fit"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Components
          </Link>
        </nav>

        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-textPrimary mb-4">
            Buttons
          </h1>
          <p className="text-textSecondary max-w-xl mx-auto leading-relaxed">
            Five button styles, built with React and Framer Motion. Click "Copy" on any of them to grab the code.
          </p>
        </header>

        <ButtonShowcase />
      </main>
    </div>
  );
};

export default ButtonsPage;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CronParser from '../components/cron/CronParser';

const CronParserPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative z-10 py-12">
      <main className="max-w-3xl mx-auto px-6 lg:px-8">
        <nav className="mb-12">
          <Link
            to="/tools"
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary font-medium transition-colors text-sm group w-fit"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>
        </nav>

        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-textPrimary mb-4">
            Cron Expression Parser
          </h1>
          <p className="text-textSecondary max-w-xl mx-auto leading-relaxed">
            Paste a cron expression to see what it actually means and when it'll next run. Entirely client-side.
          </p>
        </header>

        <CronParser />
      </main>
    </div>
  );
};

export default CronParserPage;

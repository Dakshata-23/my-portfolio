import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../components/tools/toolsData';

const ToolsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative z-10 py-12">
      <main className="max-w-5xl mx-auto px-6 lg:px-8">
        <nav className="mb-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-textSecondary hover:text-textPrimary font-medium transition-colors text-sm group w-fit"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </nav>

        <header className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-textPrimary mb-4">
            Free Tools
          </h1>
          <p className="text-textSecondary max-w-xl mx-auto leading-relaxed">
            Small, useful utilities I've built and open up for anyone to use — no signup, nothing tracked. More get added over time.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TOOLS.map((tool) =>
            tool.status === 'live' ? (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="group p-6 rounded-2xl glass border border-accent hover:border-textSecondary/40 transition-colors shadow-sm hover:shadow-md flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-textPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tool.icon}></path>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-textPrimary group-hover:text-blue-500 transition-colors mb-2">
                  {tool.name}
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed flex-grow">{tool.description}</p>
                <span className="mt-4 text-sm font-medium text-textPrimary flex items-center gap-1.5 group-hover:text-blue-500 transition-colors">
                  Open tool
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </Link>
            ) : (
              <div
                key={tool.slug}
                className="p-6 rounded-2xl border border-dashed border-accent flex flex-col opacity-60"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/30 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tool.icon}></path>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-textPrimary mb-2">{tool.name}</h3>
                <p className="text-textSecondary text-sm leading-relaxed flex-grow">{tool.description}</p>
                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-textSecondary">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default ToolsPage;

import React, { useEffect } from 'react';
import { Project } from '../types';

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary py-12">
      <main className="max-w-3xl mx-auto px-6">
        {/* Navigation */}
        <nav className="mb-16">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-textSecondary hover:text-black font-medium transition-colors text-sm group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="flex justify-between items-baseline mb-4">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-textPrimary">
              {project.title}
            </h1>
            <span className="text-gray-400 font-mono text-sm">{project.duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs text-gray-500 font-medium">
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          <p className="text-lg text-textSecondary leading-relaxed font-medium">
            {project.description}
          </p>
        </header>

        <div className="h-px bg-gray-200 my-16"></div>

        {/* Case Study Details */}
        <article className="space-y-16">
          {project.caseStudy?.problem && (
            <section>
              <h2 className="text-xl font-medium text-textPrimary mb-4">The Challenge</h2>
              <p className="text-base text-textSecondary leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </section>
          )}

          {project.caseStudy?.solution && (
            <section>
              <h2 className="text-xl font-medium text-textPrimary mb-4">The Solution</h2>
              <p className="text-base text-textSecondary leading-relaxed mb-6">
                {project.caseStudy.solution}
              </p>
              
              {project.caseStudy.features && project.caseStudy.features.length > 0 && (
                <div className="bg-surface border border-gray-200 p-6 rounded-xl">
                  <h3 className="font-medium text-textPrimary mb-4 text-sm">Key Details</h3>
                  <ul className="space-y-3">
                    {project.caseStudy.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-textSecondary text-sm">
                        <span className="text-gray-400 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {project.caseStudy?.results && (
            <section>
              <h2 className="text-xl font-medium text-textPrimary mb-4">Impact</h2>
              <p className="text-base font-medium text-textPrimary leading-relaxed italic border-l-2 border-gray-300 pl-4 py-1">
                "{project.caseStudy.results}"
              </p>
            </section>
          )}
        </article>

        {/* Footer Actions */}
        <div className="mt-24 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          {project.link ? (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto text-center"
            >
              View Live Project
            </a>
          ) : (
            <div></div>
          )}
          
          <button 
            onClick={onBack} 
            className="text-textSecondary text-sm font-medium hover:text-black transition-colors"
          >
            Close Case Study
          </button>
        </div>
      </main>
    </div>
  );
};

export default CaseStudy;

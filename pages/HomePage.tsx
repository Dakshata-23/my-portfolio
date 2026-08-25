import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Footer from '../components/Footer';
import CaseStudy from '../components/CaseStudy';
import TechGame from '../components/TechGame';
import { EXPERIENCES } from '../constants';
import { Project } from '../types';

const HomePage: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'case-study'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTarget) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.state]);

  const handleViewCaseStudy = (project: Project) => {
    setScrollPos(window.scrollY);
    setSelectedProject(project);
    setActiveView('case-study');
  };

  const handleBackToHome = () => {
    setActiveView('home');
    setSelectedProject(null);
    setTimeout(() => {
      window.scrollTo(0, scrollPos);
    }, 0);
  };

  if (activeView === 'case-study' && selectedProject) {
    return <CaseStudy project={selectedProject} onBack={handleBackToHome} />;
  }

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        <Hero />

        <div className="h-px bg-gray-200 dark:bg-gray-800 my-16 transition-colors"></div>

        <Skills />

        <div className="h-px bg-gray-200 dark:bg-gray-800 my-16 transition-colors"></div>

        <section id="experience" className="mb-16">
          <h2 className="text-xl font-medium mb-8 text-textPrimary tracking-tight">
            Experience
          </h2>
          <div className="space-y-10">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 group">
                <div>
                  <h3 className="text-base font-medium text-textPrimary">{exp.role}</h3>
                  <p className="text-textSecondary text-sm">{exp.company}</p>
                </div>
                <span className="text-gray-400 text-xs font-mono tracking-wider shrink-0">{exp.period}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-gray-200 dark:bg-gray-800 my-16 transition-colors"></div>

        <TechGame />

        <div className="h-px bg-gray-200 dark:bg-gray-800 my-16 transition-colors"></div>

        <Projects onViewCaseStudy={handleViewCaseStudy} />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;

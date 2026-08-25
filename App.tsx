import React, { useState, useEffect, createContext, useContext, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CuteCat from './components/CuteCat';
import Footer from './components/Footer';
import CaseStudy from './components/CaseStudy';
import TechGame from './components/TechGame';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import { EXPERIENCES, PROFILE_DATA } from './constants';
import { Project } from './types';
import MusicPlayer from './components/MusicPlayer';

const InvoiceGenerator = lazy(() => import('./components/invoice/InvoiceGenerator'));

// Theme Context
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

// Music Context
export const MusicContext = createContext<{
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}>({ isPlaying: false, setIsPlaying: () => {} });

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'case-study'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Theme logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <MusicContext.Provider value={{ isPlaying: isMusicPlaying, setIsPlaying: setIsMusicPlaying }}>
          <div className="min-h-screen">
          <Background />
          <CustomCursor />
            <CaseStudy project={selectedProject} onBack={handleBackToHome} />
            <CuteCat />
            <MusicPlayer />
          </div>
        </MusicContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MusicContext.Provider value={{ isPlaying: isMusicPlaying, setIsPlaying: setIsMusicPlaying }}>
        <div className="min-h-screen relative overflow-x-hidden">
        <Background />
        <CustomCursor />
        <Header />
        
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

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-16 transition-colors"></div>

          <Suspense fallback={<div className="text-center text-textSecondary text-sm py-24">Loading invoice generator…</div>}>
            <InvoiceGenerator />
          </Suspense>
        </main>

          <Footer />
        </div>
        <CuteCat />
        <MusicPlayer />
      </MusicContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

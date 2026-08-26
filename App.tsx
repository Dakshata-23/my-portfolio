import React, { useState, useEffect, createContext, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CuteCat from './components/CuteCat';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import JwtDecoderPage from './pages/JwtDecoderPage';
import ComponentsPage from './pages/ComponentsPage';
import ButtonsPage from './pages/ButtonsPage';

const InvoiceGeneratorPage = lazy(() => import('./pages/InvoiceGeneratorPage'));

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MusicContext.Provider value={{ isPlaying: isMusicPlaying, setIsPlaying: setIsMusicPlaying }}>
        <BrowserRouter>
          <div className="min-h-screen relative overflow-x-hidden">
            <Background />
            <CustomCursor />
            <Header />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route
                path="/tools/invoice-generator"
                element={
                  <Suspense fallback={<div className="text-center text-textSecondary text-sm py-24">Loading invoice generator…</div>}>
                    <InvoiceGeneratorPage />
                  </Suspense>
                }
              />
              <Route path="/tools/jwt-decoder" element={<JwtDecoderPage />} />
              <Route path="/components" element={<ComponentsPage />} />
              <Route path="/components/buttons" element={<ButtonsPage />} />
            </Routes>
          </div>
          <CuteCat />
          <MusicPlayer />
        </BrowserRouter>
      </MusicContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;

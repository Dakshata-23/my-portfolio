import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: 'About', href: '#about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Experience', href: '#experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Projects', href: '#projects', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Contact', href: '#contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass rounded-2xl px-4 py-3 flex items-center gap-2 md:gap-4 pointer-events-auto shadow-lg shadow-black/5"
      >
        {navLinks.map((link) => (
          <motion.a 
            key={link.name}
            href={link.href}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, link.href)}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group flex flex-col items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label={link.name}
          >
            <svg className="w-5 h-5 text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon}></path>
            </svg>
            {/* Tooltip */}
            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-1 px-2 rounded font-medium whitespace-nowrap pointer-events-none">
              {link.name}
            </span>
          </motion.a>
        ))}
        
        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1"></div>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="group flex flex-col items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-500 group-hover:text-indigo-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          )}
          <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] py-1 px-2 rounded font-medium whitespace-nowrap pointer-events-none">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </motion.button>
      </motion.nav>
    </div>
  );
};

export default Header;

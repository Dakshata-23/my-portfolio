import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../constants';
import ScrambleText from './ScrambleText';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center text-center min-h-[90vh] py-16 overflow-hidden mb-8">
      {/* Subtle Dot Pattern Background overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] z-0 opacity-50"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-6 relative group cursor-pointer"
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 rounded-full bg-surface flex items-center justify-center border border-accent shadow-sm group-hover:scale-105 transition-transform"
          >
            <span className="text-textPrimary font-semibold text-xl tracking-wider">DS</span>
          </motion.div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg font-medium text-textSecondary mb-4 tracking-[0.15em] uppercase text-sm"
        >
          <ScrambleText text={PROFILE_DATA.name} />
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-2xl tracking-tight text-textPrimary"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Code. Build. Scale.
          </span>
          <br /> Repeat.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-textSecondary max-w-lg leading-relaxed text-sm md:text-base mb-10"
        >
          {PROFILE_DATA.summary}
        </motion.p>
        
        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#experience" className="px-8 py-3 rounded-full bg-textPrimary text-background font-medium hover:scale-105 transition-transform shadow-lg">
            View Work
          </a>
          <a href={`mailto:${PROFILE_DATA.email}`} className="px-8 py-3 rounded-full border border-accent bg-accent/30 text-textPrimary font-medium hover:bg-accent/50 transition-colors">
            Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

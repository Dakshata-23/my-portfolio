import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../constants';
import ScrambleText from './ScrambleText';
import Scene3D from './Scene3D';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative flex flex-col items-center justify-center text-center min-h-[70vh] py-16 overflow-hidden rounded-3xl mb-8 bg-gray-50/30 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800/50">
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <span className="text-gray-500 dark:text-gray-400 font-medium text-xl tracking-wider">DS</span>
          </motion.div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase text-sm"
        >
          <ScrambleText text={PROFILE_DATA.name} />
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-2xl tracking-tight text-gray-900 dark:text-white"
        >
          Code. Build. Scale. Repeat.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed text-sm md:text-base lg:text-lg mb-10"
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
          <a href="#experience" className="px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
            View Work
          </a>
          <a href={`mailto:${PROFILE_DATA.email}`} className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

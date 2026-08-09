import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-xl font-medium mb-6 text-textPrimary tracking-tight">
        Skills & Expertise
      </h2>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {Object.entries(PROFILE_DATA.skillCategories).map(([category, skills]) => (
          <motion.div 
            key={category} 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl glass border border-accent hover:border-textSecondary/40 transition-colors shadow-sm hover:shadow-md"
          >
            <h3 className="text-sm font-semibold text-textPrimary uppercase tracking-wider mb-4 border-b border-accent pb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--textPrimary)', color: 'var(--background)' }}
                  className="px-3 py-1.5 bg-accent/50 text-textSecondary text-xs font-medium rounded-full border border-accent transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;

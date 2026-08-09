import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  onViewCaseStudy: (project: Project) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const Projects: React.FC<ProjectsProps> = ({ onViewCaseStudy }) => {
  return (
    <section id="projects" className="mb-16">
      <h2 className="text-xl font-medium mb-8 text-textPrimary tracking-tight">
        Featured Projects
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl glass border border-accent hover:border-textSecondary/40 transition-colors shadow-sm hover:shadow-md flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 
                className="text-lg font-bold text-textPrimary hover:text-blue-500 transition-colors cursor-pointer"
                onClick={() => onViewCaseStudy(project)}
              >
                {project.title}
              </h3>
              <span className="text-gray-400 text-xs font-mono tracking-wider ml-4 bg-accent/30 px-2 py-1 rounded-md">
                {project.duration}
              </span>
            </div>
            
            <p className="text-textSecondary text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-textSecondary font-medium bg-accent/50 border border-accent px-2.5 py-1 rounded-full">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
            
            <div className="mt-auto flex gap-4 text-sm font-medium border-t border-accent pt-4">
              <button 
                onClick={() => onViewCaseStudy(project)}
                className="text-textPrimary hover:text-blue-500 transition-colors flex items-center gap-1.5 group"
              >
                Case Study 
                <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-textPrimary transition-colors flex items-center gap-1.5"
                >
                  Visit <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;

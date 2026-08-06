import React from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  onViewCaseStudy: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewCaseStudy }) => {
  return (
    <section id="projects" className="mb-16">
      <h2 className="text-xl font-medium mb-8 text-textPrimary tracking-tight">
        Featured Projects
      </h2>
      <div className="flex flex-col gap-10">
        {PROJECTS.map((project, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-baseline mb-2">
              <h3 
                className="text-lg font-medium text-textPrimary group-hover:underline cursor-pointer"
                onClick={() => onViewCaseStudy(project)}
              >
                {project.title}
              </h3>
              <span className="text-gray-400 text-xs font-mono tracking-wider ml-4">
                {project.duration}
              </span>
            </div>
            
            <p className="text-textSecondary text-sm leading-relaxed mb-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-500 font-medium">
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
            
            <div className="mt-3 flex gap-4 text-sm font-medium">
              <button 
                onClick={() => onViewCaseStudy(project)}
                className="text-textPrimary hover:text-gray-500 transition-colors flex items-center gap-1"
              >
                Case Study <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-textPrimary transition-colors flex items-center gap-1"
                >
                  GitHub <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

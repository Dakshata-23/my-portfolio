import React from 'react';
import { PROFILE_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="max-w-5xl mx-auto px-6 lg:px-8 py-16 border-t border-accent pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h2 className="text-xl font-medium mb-2 text-textPrimary tracking-tight">Contact</h2>
          <p className="text-textSecondary text-sm mb-4">
            I'm currently open to new opportunities.
          </p>
          <a 
            href={`mailto:${PROFILE_DATA.email}`} 
            className="text-sm font-medium text-textPrimary hover:underline"
          >
            {PROFILE_DATA.email}
          </a>
        </div>
        
        <div className="flex gap-6">
          <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-textPrimary transition-colors text-sm font-medium">
            LinkedIn
          </a>
          <a href={PROFILE_DATA.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-textPrimary transition-colors text-sm font-medium">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

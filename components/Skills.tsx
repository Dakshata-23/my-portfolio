import React from 'react';
import { PROFILE_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-16">
      <h2 className="text-xl font-medium mb-6 text-textPrimary tracking-tight">
        Skills
      </h2>
      <p className="text-textSecondary text-sm leading-relaxed">
        {PROFILE_DATA.skills.join(', ')}.
      </p>
    </section>
  );
};

export default Skills;

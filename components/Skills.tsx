import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROFILE_DATA } from '../constants';

import SkillShowcaseModal from './SkillShowcaseModal';

// --- MAGNETIC PILL COMPONENT ---
const MagneticPill: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Physics values for X and Y movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to make the snap-back feel jelly-like
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Max movement is 10px in any direction
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1, backgroundColor: 'var(--textPrimary)', color: 'var(--background)' }}
      className="px-4 py-2 bg-accent/30 text-textSecondary text-sm font-medium rounded-full border border-accent transition-colors cursor-pointer select-none shadow-sm relative z-20"
    >
      {children}
    </motion.div>
  );
};

// --- SPOTLIGHT CARD COMPONENT ---
const SpotlightCard: React.FC<{ title: string; skills: string[]; onSkillClick: (skill: string) => void }> = ({ title, skills, onSkillClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-accent bg-transparent backdrop-blur-sm p-6 shadow-xl"
      style={{ perspective: 1000 }}
    >
      {/* Spotlight effect that follows the mouse */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 243, 255, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Secondary accent color spotlight for a mixed tech vibe */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(188, 19, 254, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-20">
        <h3 className="text-sm font-bold text-textPrimary uppercase tracking-widest mb-6 inline-block pb-2 border-b-2 border-accent/50">
          {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <MagneticPill key={skill} onClick={() => onSkillClick(skill)}>
              {skill}
            </MagneticPill>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN SKILLS COMPONENT ---
const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="mb-24 mt-8 relative">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-textPrimary tracking-tight">
          Skills & Expertise
        </h2>
        <p className="text-textSecondary max-w-xl text-sm">
          A collection of the tools and technologies I use to build things. Hover over the cards to interact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {Object.entries(PROFILE_DATA.skillCategories).map(([category, skills]) => (
          <SpotlightCard key={category} title={category} skills={skills} onSkillClick={setSelectedSkill} />
        ))}
      </div>

      {/* Skill Interactive Modal */}
      <SkillShowcaseModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </section>
  );
};

export default Skills;

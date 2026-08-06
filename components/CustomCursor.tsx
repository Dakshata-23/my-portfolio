import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center offset
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center text-white"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        rotate: isHovering ? -15 : 0
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
        <path d="M226.5 92.9c14.3 7.3 22.8 23 21.1 39.6l-3.5 35c-2.4 23.5-22.3 41.5-45.9 41.5H196c-24.8 0-45.2-19.4-46.4-44.2l-2-41.6c-1-20.7 10.3-39.6 28.7-48l7.6-3.5c14.1-6.4 30.2-5.4 42.6 3.1zM93.3 218.1c22.6-9.6 48.9-1.9 61.1 19.3l20.4 35.4c12.2 21.2 5.9 48.8-14.4 62.4l-29.2 19.5c-22.3 14.9-52 8.7-66.5-13.6l-20.9-32.2c-15.6-24.1-10.2-56.7 12-74.9l8.6-7.1c8.8-7.2 19.4-10.8 28.9-8.8zM418.7 218.1c9.5-1.9 20.1 1.6 28.9 8.8l8.6 7.1c22.2 18.2 27.6 50.8 12 74.9l-20.9 32.2c-14.5 22.3-44.2 28.5-66.5 13.6l-29.2-19.5c-20.3-13.6-26.6-41.2-14.4-62.4l20.4-35.4c12.2-21.2 38.5-28.9 61.1-19.3zM285.5 92.9c12.4-8.5 28.5-9.5 42.6-3.1l7.6 3.5c18.4 8.4 29.7 27.3 28.7 48l-2 41.6c-1.2 24.8-21.6 44.2-46.4 44.2h-2.1c-23.6 0-43.5-18-45.9-41.5l-3.5-35c-1.7-16.6 6.8-32.3 21.1-39.6zM256 272c47.7 0 94.7 25 125 65.6c31.1 41.7 43.1 97.4 23 141.2c-15 32.6-54.8 45.4-88.7 27.5c-25-13.2-43-39.1-59.3-39.1s-34.3 25.9-59.3 39.1c-33.9 17.9-73.7 5-88.7-27.5c-20.1-43.8-8.1-99.5 23-141.2C161.3 297 208.3 272 256 272z" />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;

import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let frame = 0;
    const queue = Array.from(text).map((char, i) => ({
      from: chars[Math.floor(Math.random() * chars.length)],
      to: char,
      start: Math.floor(Math.random() * 40),
      end: Math.floor(Math.random() * 40) + Math.floor(Math.random() * 40),
      char: ''
    }));

    const update = () => {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = queue.length; i < n; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="text-gray-400">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      setDisplayText(output);
      
      if (complete === queue.length) {
        setDisplayText(text); // Final reset to avoid HTML string issues
        setIsScrambling(false);
      } else {
        frame++;
        requestAnimationFrame(update);
      }
    };
    
    update();
  };

  return (
    <span 
      className={`cursor-crosshair ${className || ''}`}
      onMouseEnter={scramble}
      dangerouslySetInnerHTML={{ __html: isScrambling ? displayText : text }}
    />
  );
};

export default ScrambleText;

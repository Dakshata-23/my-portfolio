import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: { x: number; y: number; size: number; color: string; vx: number; vy: number; life: number; maxLife: number }[] = [];
    let mouse = { x: width / 2, y: height / 2, moved: false };

    // Nice tech colors: cyan, purple, pink
    const colors = ['#00f3ff', '#bc13fe', '#ff007f'];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
      
      // Spawn particles on move
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 0,
          maxLife: Math.random() * 30 + 20
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        const progress = p.life / p.maxLife;
        const currentSize = p.size * (1 - progress);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(currentSize, 0), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        
        ctx.globalAlpha = 1 - progress;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      // Remove dead particles
      particles = particles.filter(p => p.life < p.maxLife);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[120] hidden md:block"
    />
  );
};

export default CustomCursor;

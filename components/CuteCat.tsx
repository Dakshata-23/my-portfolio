import React, { useEffect, useRef, useState, useContext } from 'react';
import confetti from 'canvas-confetti';
import { ThemeContext, MusicContext } from '../App';
import MEOW_SRC from '../assets/sound_garage-cat-meow-8-fx-306184.mp3';

const CuteCat: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  // Dynamic Cat Colors based on Theme
  const cBody = isLight ? '#b89076' : '#e6e6fa';    // Soft fawn/latte brown
  const cShadow = isLight ? '#a67c62' : '#d8d8f6';  // Slightly darker brown for tail/legs
  const cEyeBase = isLight ? '#3d2b1f' : '#2b2440'; // Very dark brown for eyes
  const cEyeGlint = '#ffffff';

  const catRef = useRef<HTMLDivElement>(null);
  const { isPlaying } = useContext(MusicContext);

  const [catState, setCatState] = useState<{
    x: number;
    y: number;
    flip: boolean;
    bob: boolean;
    sleep: boolean;
    happy: boolean;
    blink: boolean;
    bubbleText: string;
    showBubble: boolean;
    showMenu: boolean;
    eyeOffsetX: number;
    eyeOffsetY: number;
    dancePhase: number;
  }>({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.62,
    flip: false,
    bob: false,
    sleep: false,
    happy: false,
    blink: false,
    bubbleText: '',
    showBubble: false,
    showMenu: false,
    eyeOffsetX: 0,
    eyeOffsetY: 0,
    dancePhase: 0
  });

  const [floatingElements, setFloatingElements] = useState<{ id: number; type: 'z' | 'heart'; txt: string; x: number; y: number }[]>([]);

  // State refs for animation loop
  const stateRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.62,
    tx: window.innerWidth / 2,
    ty: window.innerHeight * 0.62,
    cx: window.innerWidth / 2,
    cy: window.innerHeight * 0.62,
    mode: 'roam' as 'roam' | 'follow',
    modeUntil: 0,
    lastMove: performance.now(),
    moving: false,
    blinkT: performance.now() + 1500 + Math.random() * 2500,
    bubbleShown: false,
    menuShown: false,
    sleep: false,
    happy: false,
    isHovered: false,
    // Nav Flow State
    navState: 'none' as 'none' | 'following',
    dancing: false,
    dancePhase: 0
  });

  const floatId = useRef(0);

  const THOUGHTS = ['pet me please 🥺', 'click me!', "I'm hungry...", 'meow?', 'got any treats? 🦐', 'notice me~', 'just vibing 🐾', 'boop?', 'nice site, huh?', '*stretch*', 'feed me maybe?', "what's up?"];
  const SLEEPY = ['zzz... 😴', 'nap time~', 'so sleepy...', '5 more minutes...'];
  const HAPPY = ['yay! 💜', '*purr* 😻', 'again! again!', 'mrrp!', 'best human 🐾', 'I love you'];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const now = () => performance.now();

  const meowAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    meowAudioRef.current = new Audio(MEOW_SRC);
    meowAudioRef.current.volume = 0.75;
  }, []);

  const playMeow = (forcePlay = false) => {
    try {
      if (meowAudioRef.current) {
        const clone = meowAudioRef.current.cloneNode() as HTMLAudioElement;
        clone.volume = 0.75;
        clone.play();
      }
    } catch (e) { }
  };

  const addFloatingElement = (type: 'z' | 'heart', txt: string, x: number, y: number) => {
    const id = floatId.current++;
    setFloatingElements(prev => [...prev, { id, type, txt, x, y }]);
    setTimeout(() => {
      setFloatingElements(prev => prev.filter(el => el.id !== id));
    }, type === 'z' ? 1600 : 1000);
  };

  const say = (txt: string, dur: number) => {
    if (stateRef.current.menuShown || stateRef.current.navState !== 'none') return; // Don't interrupt menus or nav flow

    setCatState(prev => ({ ...prev, bubbleText: txt, showBubble: true }));
    stateRef.current.bubbleShown = true;
    setTimeout(() => {
      if (!stateRef.current.menuShown && stateRef.current.navState === 'none') {
        setCatState(prev => ({ ...prev, showBubble: false }));
        stateRef.current.bubbleShown = false;
      }
    }, dur);
  };

  const handleCatClick = () => {
    stateRef.current.sleep = false;
    stateRef.current.happy = true;

    // Toggle Menu (Normal Click)
    const isMenuOpening = !stateRef.current.menuShown;
    stateRef.current.menuShown = isMenuOpening;
    stateRef.current.bubbleShown = isMenuOpening;

    setCatState(prev => ({
      ...prev,
      sleep: false,
      happy: true,
      showMenu: isMenuOpening,
      showBubble: isMenuOpening
    }));

    if (isMenuOpening) {
      addFloatingElement('heart', ['💜', '❤️', '😻', '⭐'][Math.floor(Math.random() * 4)], stateRef.current.x - 6, stateRef.current.y - 30);
      playMeow(true); // Force play on click
    }

    setTimeout(() => {
      if (stateRef.current.navState === 'none') {
        stateRef.current.happy = false;
        setCatState(prev => ({ ...prev, happy: false }));
      }
    }, 1400);
  };

  const navigateTo = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();

    const elem = document.getElementById(targetId);
    if (!elem) return;

    // Close menu
    stateRef.current.menuShown = false;
    stateRef.current.bubbleShown = true;
    stateRef.current.navState = 'none'; // Ensure she doesn't follow cursor

    setCatState(prev => ({
      ...prev,
      showMenu: false,
      showBubble: true,
      bubbleText: 'Here we go! 🚀'
    }));

    playMeow(true);
    addFloatingElement('heart', '🚀', stateRef.current.x - 6, stateRef.current.y - 30);

    // Stay in roam mode so she doesn't follow the cursor
    stateRef.current.mode = 'roam';
    stateRef.current.modeUntil = now() - 1000; 

    // Scroll there with an offset so it doesn't touch the very top edge
    const yOffset = elem.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
    
    // Hide bubble shortly after
    setTimeout(() => {
      stateRef.current.bubbleShown = false;
      setCatState(prev => ({ ...prev, showBubble: false }));
    }, 2500);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.cx = e.clientX;
      stateRef.current.cy = e.clientY;
      stateRef.current.lastMove = now();
      
      const playground = document.getElementById('playground');
      let isOverPlayground = false;
      if (playground) {
        const rect = playground.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
          isOverPlayground = true;
        }
      }

      if (isOverPlayground) {
        if (stateRef.current.mode === 'follow' && stateRef.current.navState === 'none') {
          stateRef.current.mode = 'roam';
          stateRef.current.modeUntil = now() - 1000; // Force picking a new roam target immediately
        }
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      // Close menu if clicked outside cat and bubble
      if (stateRef.current.menuShown && catRef.current && !catRef.current.contains(e.target as Node)) {
        const bubbleElem = document.getElementById('cat-bubble');
        if (bubbleElem && !bubbleElem.contains(e.target as Node)) {
          stateRef.current.menuShown = false;
          stateRef.current.bubbleShown = false;
          setCatState(prev => ({ ...prev, showMenu: false, showBubble: false }));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stateRef.current.dancing = true;
      stateRef.current.sleep = false; // Wake her up!
      
      // Ensure she has enough space on the left for her moonwalk!
      const isMobile = window.innerWidth < 768;
      const safeLeftSpace = isMobile ? 110 : 180; // 90px + 20px padding on mobile, 150px + 30px on desktop
      if (stateRef.current.x < safeLeftSpace) {
        stateRef.current.x = safeLeftSpace;
      }

      // 10% chance to show a music bubble when it starts playing
      if (Math.random() < 0.1 && !stateRef.current.bubbleShown) {
        say(['♪', '♫', '♬', '💃', '🕺'][Math.floor(Math.random() * 5)], 1500);
      }
    } else {
      stateRef.current.dancing = false;
      setCatState(prev => ({ ...prev, dancePhase: 0 }));
    }
  }, [isPlaying]);

  useEffect(() => {
    const roamTarget = () => {
      let targetX = 0;
      let targetY = 0;
      let valid = false;
      let attempts = 0;
      
      const playground = document.getElementById('playground');
      let pRect: DOMRect | null = null;
      if (playground) {
        pRect = playground.getBoundingClientRect();
      }

      const isMobile = window.innerWidth < 768;
      const marginX = isMobile ? 30 : 50;
      const roamYOffset = isMobile ? 130 : 220; // 220 pushes her much higher above the desktop menu

      while (!valid && attempts < 15) {
        targetX = rand(marginX, document.documentElement.clientWidth - marginX);
        targetY = window.innerHeight - roamYOffset; // Fixed Y position for horizontal roaming
        valid = true;
        
        if (pRect) {
           if (targetX > pRect.left - 60 && targetX < pRect.right + 60 && targetY > pRect.top - 60 && targetY < pRect.bottom + 60) {
              valid = false;
           }
        }
        attempts++;
      }
      
      stateRef.current.tx = targetX;
      stateRef.current.ty = targetY;
    };

    let animationFrameId: number;
    let reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      const t = now();
      const s = stateRef.current;
      const isMobile = window.innerWidth < 768;
      const roamYOffset = isMobile ? 130 : 90;

      // Logic for regular follow mode
      if (!s.menuShown && s.navState === 'none') {
        if (s.mode === 'follow') {
          s.tx = s.cx;
          s.ty = s.cy + window.scrollY;
          if (t > s.modeUntil) {
            s.mode = 'roam';
            roamTarget();
            s.ty += window.scrollY;
          }
        }
      }

      if (s.mode === 'roam' && s.navState === 'none') {
        s.ty = window.innerHeight - roamYOffset + window.scrollY;
      }
      
      // Convert global y target to fixed screen space for animation
      const screenTargetY = s.ty - window.scrollY;

      const dx = s.tx - s.x;
      const dy = screenTargetY - s.y;
      const dist = Math.hypot(dx, dy);
      const idle = (t - s.lastMove > 6000) && s.mode === 'roam' && s.navState === 'none';

      let flip = dx < -0.5;

      if (s.dancing) {
        const cycleTime = t % 11000;
        if (cycleTime < 5000) {
          s.dancePhase = 1;
        } else if (cycleTime < 7000) {
          s.dancePhase = 2;
        } else {
          s.dancePhase = 3;
          flip = (cycleTime - 7000) < 2000;
        }
      } else {
        s.dancePhase = 0;
      }

      let bob = false;
      let sleep = false;
      let blink = false;

      // Calculate Eye Offset to look at cursor
      const dxToMouse = s.cx - s.x;
      const dyToMouse = s.cy - screenTargetY; // Relative to current screen Y
      const angleToMouse = Math.atan2(dyToMouse, dxToMouse);
      const distToMouse = Math.hypot(dxToMouse, dyToMouse);
      
      const maxOffset = Math.min(distToMouse / 60, 3.5);
      const eyeOffsetX = Math.cos(angleToMouse) * maxOffset * (flip ? -1 : 1); // Reverse offset if body is flipped
      const eyeOffsetY = Math.sin(angleToMouse) * maxOffset;

      // Handle Nav Flow sequence transitions
      if (s.navState === 'following') {
        // Did we arrive? (Close enough to target in screen space)
        if (dist < 15) {
          s.navState = 'none';
          s.bubbleShown = false;
          setCatState(prev => ({ ...prev, showBubble: false }));
        }
      }

      const isFollowingCursor = s.mode === 'follow' && s.navState === 'none';
      // Only move if we aren't showing the menu, or we need to catch up, and NOT hovered, AND NOT dancing
      if (!s.dancing && !s.menuShown && !s.isHovered && dist > (isFollowingCursor ? 80 : 6)) {
        const sp = Math.min(dist, s.navState !== 'none' ? 10 : (isFollowingCursor ? 6 : 1.5));
        s.x += (dx / dist) * sp;
        s.y += (dy / dist) * sp;
        s.moving = true;
        bob = true;
      } else {
        s.moving = false;
        bob = false;
      }

      // Clamp position to ensure she never walks out of the screen (accounting for scrollbars)
      s.x = Math.max(50, Math.min(s.x, document.documentElement.clientWidth - 50));

      if (!s.moving) {
        if (s.mode === 'roam' && t > s.modeUntil && s.navState === 'none') {
          roamTarget();
          s.ty += window.scrollY;
          s.modeUntil = t + rand(2000, 5000);
        }
      }

      if (!s.happy && !s.menuShown && s.navState === 'none' && !s.dancing) {
        if (idle && !s.moving) {
          s.sleep = true;
          sleep = true;
          if (Math.random() < 0.01) {
            addFloatingElement('z', 'Z', s.x - 6, s.y - 30);
          }
        } else {
          s.sleep = false;
          sleep = false;
        }
      } else if (s.menuShown || s.navState !== 'none') {
        s.sleep = false;
        sleep = false;
      }

      if (!s.moving && !s.sleep && t > s.blinkT) {
        blink = true;
        s.blinkT = t + rand(2000, 5000);
      }

      setCatState(prev => ({
        ...prev,
        x: s.x,
        y: s.y,
        flip,
        bob,
        sleep: s.sleep,
        happy: s.happy,
        blink: prev.blink || blink,
        eyeOffsetX,
        eyeOffsetY,
        dancePhase: s.dancePhase
      }));

      if (blink) {
        setTimeout(() => setCatState(p => ({ ...p, blink: false })), 140);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    if (!reduce) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const schedule = () => {
      setTimeout(() => {
        if (!document.hidden && !stateRef.current.bubbleShown && stateRef.current.navState === 'none') {
          if (stateRef.current.dancing) {
            // Only show music notes occasionally while dancing
            if (Math.random() < 0.3) {
              say(['♪', '♫', '♬', '💃', '🕺'][Math.floor(Math.random() * 5)], 2000);
            }
          } else {
            const pool = stateRef.current.sleep ? SLEEPY : THOUGHTS;
            say(pool[Math.floor(Math.random() * pool.length)], 3200);
          }
        }
        schedule();
      }, rand(7000, 13000));
    };
    schedule();
  }, []);
  // Welcome message on mount (Only once per session)
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasWelcomed = sessionStorage.getItem('cat_welcomed');
      if (!stateRef.current.bubbleShown && !hasWelcomed) {
        sessionStorage.setItem('cat_welcomed', 'true');
        
        stateRef.current.happy = true;
        say("Welcome to my portfolio! 👋", 5000);
        
        playMeow(true); // Meow!
        
        // Fire confetti originating from the cat
        const xPerc = stateRef.current.x / window.innerWidth;
        const yPerc = stateRef.current.y / window.innerHeight;
        
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { x: xPerc, y: yPerc },
          colors: ['#E6E6FA', '#D8BFD8', '#FFB6C1', '#87CEEB'] // Pastel cute colors
        });
        
        setTimeout(() => {
          stateRef.current.happy = false;
        }, 5000);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .cat-bob { animation: bob .28s ease-in-out infinite; }
        @keyframes bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        .cat-tail { transform-origin: 22px 66px; animation: tail 2s ease-in-out infinite; }
        @keyframes tail { 0%, 100% { transform: rotate(15deg) } 50% { transform: rotate(-15deg) } }
        .cat-heart { position: fixed; z-index: 110; pointer-events: none; font-size: 20px; animation: heart 1s ease-out forwards; }
        @keyframes heart { 0% { opacity: 0; transform: translateY(0) scale(.4) } 20% { opacity: 1 } 100% { opacity: 0; transform: translateY(-46px) scale(1.1) } }
        .cat-zzz { position: fixed; z-index: 110; pointer-events: none; color: #a2a3ad; font-family: monospace; font-size: 14px; animation: heart 1.6s ease-out forwards; }
        .cat-bubble { position: fixed; z-index: 110; transform: translate(-50%, -100%); background: #f4eff9; color: #2b2440; font: 600 12.5px -apple-system, sans-serif; padding: 7px 13px; border-radius: 13px; box-shadow: 0 6px 18px rgba(0,0,0,.32); opacity: 0; transition: opacity .22s ease, transform .22s ease; pointer-events: none; }
        .cat-bubble.show { opacity: 1; pointer-events: auto; }
        .cat-bubble::after { content: ""; position: absolute; left: 50%; bottom: -4px; width: 11px; height: 11px; background: #f4eff9; transform: translateX(-50%) rotate(45deg); border-radius: 2px; }
        .cat-dancing-1 { animation: dance 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) infinite !important; }
        .cat-dancing-2 { animation: dance-wide 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite !important; }
        .cat-dancing-3 { animation: dance-step 3.6s ease-in-out infinite !important; }
        @keyframes dance { 
          0%, 100% { transform: translateY(0) scale(1) rotate(0); } 
          25% { transform: translateY(-12px) scale(1.05) rotate(-10deg); } 
          50% { transform: translateY(-4px) scale(1.02) rotate(0); }
          75% { transform: translateY(-12px) scale(1.05) rotate(10deg); } 
        }
        @keyframes dance-wide {
          0%, 100% { transform: translateX(0) scale(1) rotate(0); }
          25% { transform: translateX(-35px) scale(1.05) rotate(-15deg); }
          50% { transform: translateX(0) scale(1) rotate(0); }
          75% { transform: translateX(35px) scale(1.05) rotate(15deg); }
        }
        @keyframes dance-step {
          0% { transform: translateX(0) translateY(0); }
          8% { transform: translateX(-25px) translateY(-10px); }
          16% { transform: translateX(-50px) translateY(0); }
          24% { transform: translateX(-75px) translateY(-10px); }
          32% { transform: translateX(-100px) translateY(0); }
          40% { transform: translateX(-125px) translateY(-10px); }
          48% { transform: translateX(-150px) translateY(0); }
          50% { transform: translateX(-150px) translateY(0); }
          58% { transform: translateX(-125px) translateY(-10px); }
          66% { transform: translateX(-100px) translateY(0); }
          74% { transform: translateX(-75px) translateY(-10px); }
          82% { transform: translateX(-50px) translateY(0); }
          90% { transform: translateX(-25px) translateY(-10px); }
          98%, 100% { transform: translateX(0) translateY(0); }
        }
        @media (max-width: 768px) {
          @keyframes dance-step {
            0% { transform: translateX(0) translateY(0); }
            8% { transform: translateX(-15px) translateY(-10px); }
            16% { transform: translateX(-30px) translateY(0); }
            24% { transform: translateX(-45px) translateY(-10px); }
            32% { transform: translateX(-60px) translateY(0); }
            40% { transform: translateX(-75px) translateY(-10px); }
            48% { transform: translateX(-90px) translateY(0); }
            50% { transform: translateX(-90px) translateY(0); }
            58% { transform: translateX(-75px) translateY(-10px); }
            66% { transform: translateX(-60px) translateY(0); }
            74% { transform: translateX(-45px) translateY(-10px); }
            82% { transform: translateX(-30px) translateY(0); }
            90% { transform: translateX(-15px) translateY(-10px); }
            98%, 100% { transform: translateX(0) translateY(0); }
          }
        }
        .cat-dancing-1 .cat-tail, .cat-dancing-2 .cat-tail, .cat-dancing-3 .cat-tail { animation: tail-dance 0.45s ease-in-out infinite !important; }
        @keyframes tail-dance { 0%, 100% { transform: rotate(40deg) } 50% { transform: rotate(-40deg) } }
        .cat-dancing-1 .cat-eyes-dance, .cat-dancing-2 .cat-eyes-dance, .cat-dancing-3 .cat-eyes-dance { animation: eyes-dance 0.9s ease-in-out infinite !important; }
        @keyframes eyes-dance {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-4px, -2px); }
          50% { transform: translate(4px, 2px); }
          75% { transform: translate(-2px, 2px); }
        }
      `}</style>

      {floatingElements.map(el => (
        <div key={el.id} className={el.type === 'z' ? 'cat-zzz' : 'cat-heart'} style={{ left: el.x, top: el.y }}>
          {el.txt}
        </div>
      ))}

      <div id="cat-bubble" className={`cat-bubble ${catState.showBubble ? 'show' : ''}`} style={{ left: catState.x, top: catState.y - 40 }}>
        {catState.showMenu ? (
          <div className="flex flex-col gap-1.5 p-1">
            <span className="text-xs font-bold mb-1 text-center text-indigo-900 border-b border-indigo-100 pb-1">Where to?</span>
            <button onClick={(e) => navigateTo(e, 'about')} className="text-xs hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors text-left">👋 About</button>
            <button onClick={(e) => navigateTo(e, 'experience')} className="text-xs hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors text-left">💼 Experience</button>
            <button onClick={(e) => navigateTo(e, 'projects')} className="text-xs hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors text-left">🚀 Projects</button>
          </div>
        ) : (
          <span className="whitespace-nowrap">{catState.bubbleText}</span>
        )}
      </div>

      <div
        ref={catRef}
        onClick={handleCatClick}
        onMouseEnter={() => stateRef.current.isHovered = true}
        onMouseLeave={() => stateRef.current.isHovered = false}
        className="fixed z-[100] cursor-pointer drop-shadow-lg w-16 h-16 md:w-24 md:h-24"
        style={{ left: catState.x, top: catState.y, transform: 'translate(-50%, -50%)', willChange: 'transform, left, top' }}
        title="pet me"
      >
        <div className={`${catState.bob ? 'cat-bob' : ''} ${catState.dancePhase === 1 ? 'cat-dancing-1' : catState.dancePhase === 2 ? 'cat-dancing-2' : catState.dancePhase === 3 ? 'cat-dancing-3' : ''}`} style={{ width: '100%', height: '100%' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', transform: catState.flip ? 'scaleX(-1)' : 'none' }}>
            {/* Tail */}
          <path className="cat-tail" d="M24 66 C 4 64, 2 44, 14 40 C 8 52, 20 56, 26 58 Z" fill={cShadow} />
          
          {/* Body */}
          <ellipse cx="50" cy="72" rx="29" ry="23" fill={cBody} />
          
          {/* Back Paws */}
          <ellipse cx="34" cy="90" rx="8" ry="6" fill={cShadow} />
          <ellipse cx="66" cy="90" rx="8" ry="6" fill={cShadow} />

          {/* Front Paws (Cuter!) */}
          <ellipse cx="42" cy="85" rx="5" ry="8" fill={cBody} />
          <ellipse cx="58" cy="85" rx="5" ry="8" fill={cBody} />
          
          {/* Ears */}
          <path d="M26 32 C26 20 30 10 33 8 C38 15 42 22 50 28 Z" fill={cBody} />
          <path d="M74 32 C74 20 70 10 67 8 C62 15 58 22 50 28 Z" fill={cBody} />
          
          {/* Inner Ears (Pinker) */}
          <path d="M30 30 C31 22 33 16 34 14 C36 18 39 24 43 28 Z" fill="#ffb6c1" />
          <path d="M70 30 C69 22 67 16 66 14 C64 18 61 24 57 28 Z" fill="#ffb6c1" />
          
          {/* Head (Rounder & wider) */}
          <ellipse cx="50" cy="46" rx="30" ry="26" fill={cBody} />
          
          {/* Big Pink Cheeks */}
          <ellipse cx="30" cy="55" rx="8" ry="5.5" fill="#ffb6c1" opacity="0.85" />
          <ellipse cx="70" cy="55" rx="8" ry="5.5" fill="#ffb6c1" opacity="0.85" />

          {/* Open/Normal Eyes (Bigger, starry) */}
          <g style={{ display: catState.happy || catState.sleep ? 'none' : 'block' }}>
            {/* Left Eye Base */}
            <ellipse cx="38" cy="46" rx="7" ry="8" fill={cEyeBase} style={{ transform: catState.blink ? 'scaleY(0.1)' : 'none', transformOrigin: 'center', transformBox: 'fill-box' }} />
            {/* Right Eye Base */}
            <ellipse cx="62" cy="46" rx="7" ry="8" fill={cEyeBase} style={{ transform: catState.blink ? 'scaleY(0.1)' : 'none', transformOrigin: 'center', transformBox: 'fill-box' }} />
            
            {/* Eye Glints (Cuteness!) - only these move to look around */}
            <g className={catState.dancePhase > 0 ? 'cat-eyes-dance' : ''}>
              <g style={{ transform: `translate(${catState.eyeOffsetX}px, ${catState.eyeOffsetY}px)` }}>
                <circle cx="40" cy="43" r="2.5" fill={cEyeGlint} />
                <circle cx="36" cy="48" r="1" fill={cEyeGlint} />
                
                <circle cx="64" cy="43" r="2.5" fill={cEyeGlint} />
                <circle cx="60" cy="48" r="1" fill={cEyeGlint} />
              </g>
            </g>
          </g>

          {/* Happy Eyes (^ ^) */}
          <g style={{ display: catState.happy ? 'block' : 'none' }} fill="none" stroke={cEyeBase} strokeWidth="3.5" strokeLinecap="round">
            <path d="M32 48 Q38 39 44 48" />
            <path d="M56 48 Q62 39 68 48" />
          </g>

          {/* Sleepy Eyes (- -) */}
          <g style={{ display: catState.sleep && !catState.happy ? 'block' : 'none' }} stroke={cEyeBase} strokeWidth="3.5" strokeLinecap="round">
            <line x1="33" y1="47" x2="43" y2="47" />
            <line x1="57" y1="47" x2="67" y2="47" />
          </g>

          {/* Tiny Cute Nose */}
          <path d="M48 53 C49 53 50 54 50 55 C50 54 51 53 52 53 Z" fill="#ff8da1" stroke="#ff8da1" strokeWidth="1.5" strokeLinecap="round" />

          {/* Normal Mouth */}
          <path style={{ display: catState.happy ? 'none' : 'block' }} d="M50 56 Q45 61 40 57 M50 56 Q55 61 60 57" fill="none" stroke={cEyeBase} strokeWidth="2.2" strokeLinecap="round" />

          {/* Happy Mouth (Wide open!) */}
          <path style={{ display: catState.happy ? 'block' : 'none' }} d="M42 56 Q50 68 58 56" fill="none" stroke={cEyeBase} strokeWidth="2.5" strokeLinecap="round" />
          <path style={{ display: catState.happy ? 'block' : 'none' }} d="M44 57 Q50 66 56 57 Z" fill="#ff8da1" />

          {/* Whiskers (Slightly lowered) */}
          <g stroke="#c9c2d6" strokeWidth="1.5" strokeLinecap="round">
            <line x1="16" y1="52" x2="28" y2="54" /><line x1="15" y1="58" x2="28" y2="57" />
            <line x1="84" y1="52" x2="72" y2="54" /><line x1="85" y1="58" x2="72" y2="57" />
          </g>
          
          {/* Tiny Red Bow (near right ear) */}
          <g transform="translate(62, 22) rotate(15)">
            <path d="M0,0 Q-4,-6 -8,-4 Q-10,-2 -8,2 Q-4,4 0,0 Z" fill="#ff4d4d" />
            <path d="M0,0 Q4,-6 8,-4 Q10,-2 8,2 Q4,4 0,0 Z" fill="#ff4d4d" />
            <circle cx="0" cy="0" r="2.5" fill="#ff1a1a" />
          </g>
          </svg>
        </div>
      </div>

    </>
  );
};

export default CuteCat;

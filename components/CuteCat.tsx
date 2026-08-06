import React, { useEffect, useRef, useState } from 'react';
import MEOW_SRC from '../assets/sound_garage-cat-meow-8-fx-306184.mp3';

const CuteCat: React.FC = () => {
  const catRef = useRef<HTMLDivElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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
    showMenu: false
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
    // Nav Flow State
    navState: 'none' as 'none' | 'following'
  });

  const floatId = useRef(0);

  const THOUGHTS = ['pet me please 🥺', 'click me!', "I'm hungry...", 'meow?', 'got any treats? 🦐', 'notice me~', 'just vibing 🐾', 'boop?', 'nice site, huh?', '*stretch*', 'feed me maybe?', "what's up?"];
  const SLEEPY = ['zzz... 😴', 'nap time~', 'so sleepy...', '5 more minutes...'];
  const HAPPY = ['yay! 💜', '*purr* 😻', 'again! again!', 'mrrp!', 'best human 🐾', 'I love you'];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const now = () => performance.now();

  const playMeow = (forcePlay = false) => {
    if (!soundOn && !forcePlay) return;
    try {
      const a = new Audio(MEOW_SRC);
      a.volume = 0.75;
      a.play();
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

    // Close menu, start following sequence
    stateRef.current.menuShown = false;
    stateRef.current.bubbleShown = true;
    stateRef.current.navState = 'following';

    setCatState(prev => ({
      ...prev,
      showMenu: false,
      showBubble: true,
      bubbleText: 'follow me!'
    }));

    playMeow(true);
    addFloatingElement('heart', '🚀', stateRef.current.x - 6, stateRef.current.y - 30);

    // Set cat target to the section
    const rect = elem.getBoundingClientRect();
    stateRef.current.mode = 'follow';
    stateRef.current.tx = window.innerWidth / 2;
    stateRef.current.ty = rect.top + window.scrollY + 100;
    stateRef.current.modeUntil = now() + 10000; // lots of time to follow

    // Scroll there
    elem.scrollIntoView({ behavior: 'smooth' });
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
      } else if (Math.random() < 0.5 && !stateRef.current.menuShown && stateRef.current.navState === 'none') {
        stateRef.current.mode = 'follow';
        stateRef.current.modeUntil = now() + rand(2500, 5000);
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

      while (!valid && attempts < 15) {
        targetX = rand(80, window.innerWidth - 80);
        targetY = rand(140, window.innerHeight - 90);
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

      // Convert global y target to fixed screen space for animation
      const screenTargetY = s.ty - window.scrollY;

      const dx = s.tx - s.x;
      const dy = screenTargetY - s.y;
      const dist = Math.hypot(dx, dy);
      const idle = (t - s.lastMove > 6000) && s.mode === 'roam' && s.navState === 'none';

      let flip = false;
      let bob = false;
      let sleep = false;
      let blink = false;

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
      // Only move if we aren't showing the menu, or we need to catch up
      if (!s.menuShown && dist > (isFollowingCursor ? 80 : 6)) {
        const sp = Math.min(dist, s.navState !== 'none' ? 10 : (isFollowingCursor ? 6 : 3.2));
        s.x += (dx / dist) * sp;
        s.y += (dy / dist) * sp;
        s.moving = true;
        flip = dx < -0.5;
        bob = true;
      } else {
        s.moving = false;
        bob = false;
        if (s.mode === 'roam' && t > s.modeUntil && s.navState === 'none') {
          roamTarget();
          s.ty += window.scrollY;
          s.modeUntil = t + rand(2000, 5000);
        }
      }

      if (!s.happy && !s.menuShown && s.navState === 'none') {
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
        blink: prev.blink || blink
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
        if (!document.hidden && !isHidden && !stateRef.current.bubbleShown && stateRef.current.navState === 'none') {
          const pool = stateRef.current.sleep ? SLEEPY : THOUGHTS;
          say(pool[Math.floor(Math.random() * pool.length)], 3200);
        }
        schedule();
      }, rand(7000, 13000));
    };
    schedule();
  }, [isHidden]);

  if (isHidden) {
    return null;
  }

  return (
    <>
      <style>{`
        .cat-bob { animation: bob .28s ease-in-out infinite; }
        @keyframes bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
        .cat-tail { transform-origin: 22px 66px; animation: tail 1.6s ease-in-out infinite; }
        @keyframes tail { 0%, 100% { transform: rotate(0) } 50% { transform: rotate(-16deg) } }
        .cat-heart { position: fixed; z-index: 110; pointer-events: none; font-size: 20px; animation: heart 1s ease-out forwards; }
        @keyframes heart { 0% { opacity: 0; transform: translateY(0) scale(.4) } 20% { opacity: 1 } 100% { opacity: 0; transform: translateY(-46px) scale(1.1) } }
        .cat-zzz { position: fixed; z-index: 110; pointer-events: none; color: #a2a3ad; font-family: monospace; font-size: 14px; animation: heart 1.6s ease-out forwards; }
        .cat-bubble { position: fixed; z-index: 110; transform: translate(-50%, -100%); background: #f4eff9; color: #2b2440; font: 600 12.5px -apple-system, sans-serif; padding: 7px 13px; border-radius: 13px; box-shadow: 0 6px 18px rgba(0,0,0,.32); opacity: 0; transition: opacity .22s ease, transform .22s ease; pointer-events: none; }
        .cat-bubble.show { opacity: 1; pointer-events: auto; }
        .cat-bubble::after { content: ""; position: absolute; left: 50%; bottom: -4px; width: 11px; height: 11px; background: #f4eff9; transform: translateX(-50%) rotate(45deg); border-radius: 2px; }
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
        className="fixed z-[100] cursor-pointer"
        style={{ left: catState.x, top: catState.y, transform: 'translate(-50%, -50%)', width: '96px', height: '96px', willChange: 'transform, left, top' }}
        title="pet me"
      >
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible', transform: catState.flip ? 'scaleX(-1)' : 'none' }} className={catState.bob ? 'cat-bob' : ''}>
          <path className="cat-tail" d="M24 66 C 4 64, 2 44, 14 40 C 8 52, 20 56, 26 58 Z" fill="#c9c2d6" />
          <ellipse cx="50" cy="70" rx="27" ry="21" fill="#e7e3ef" />
          <ellipse cx="38" cy="88" rx="7" ry="5" fill="#d7d2e2" />
          <ellipse cx="62" cy="88" rx="7" ry="5" fill="#d7d2e2" />
          <path d="M27 30 L33 8 L49 26 Z" fill="#e7e3ef" />
          <path d="M73 30 L67 8 L51 26 Z" fill="#e7e3ef" />
          <path d="M32 24 L35 13 L43 24 Z" fill="#f3aecb" />
          <path d="M68 24 L65 13 L57 24 Z" fill="#f3aecb" />
          <circle cx="50" cy="44" r="27" fill="#f2eef8" />
          <ellipse cx="33" cy="52" rx="6" ry="4" fill="#f7bcd6" opacity=".8" />
          <ellipse cx="67" cy="52" rx="6" ry="4" fill="#f7bcd6" opacity=".8" />

          <g style={{ display: catState.happy || catState.sleep ? 'none' : 'block' }}>
            <circle cx="40" cy="44" r="5.5" fill="#2b2440" style={{ transform: catState.blink ? 'scaleY(0.1)' : 'none', transformOrigin: 'center', transformBox: 'fill-box' }} />
            <circle cx="60" cy="44" r="5.5" fill="#2b2440" style={{ transform: catState.blink ? 'scaleY(0.1)' : 'none', transformOrigin: 'center', transformBox: 'fill-box' }} />
            <circle cx="42" cy="42" r="1.6" fill="#fff" />
            <circle cx="62" cy="42" r="1.6" fill="#fff" />
          </g>

          <g style={{ display: catState.happy ? 'block' : 'none' }} fill="none" stroke="#2b2440" strokeWidth="3" strokeLinecap="round">
            <path d="M34 46 Q40 39 46 46" />
            <path d="M54 46 Q60 39 66 46" />
          </g>

          <g style={{ display: catState.sleep && !catState.happy ? 'block' : 'none' }} stroke="#2b2440" strokeWidth="3" strokeLinecap="round">
            <line x1="35" y1="45" x2="45" y2="45" />
            <line x1="55" y1="45" x2="65" y2="45" />
          </g>

          <path d="M47 52 L53 52 L50 55 Z" fill="#e086ad" />

          <path style={{ display: catState.happy ? 'none' : 'block' }} d="M50 55 Q46 60 42 57 M50 55 Q54 60 58 57" fill="none" stroke="#2b2440" strokeWidth="2" strokeLinecap="round" />

          <path style={{ display: catState.happy ? 'block' : 'none' }} d="M42 56 Q50 65 58 56" fill="none" stroke="#2b2440" strokeWidth="2.4" strokeLinecap="round" />

          <g stroke="#c9c2d6" strokeWidth="1.5" strokeLinecap="round">
            <line x1="20" y1="50" x2="33" y2="52" /><line x1="20" y1="56" x2="33" y2="56" />
            <line x1="80" y1="50" x2="67" y2="52" /><line x1="80" y1="56" x2="67" y2="56" />
          </g>
        </svg>
      </div>

    </>
  );
};

export default CuteCat;

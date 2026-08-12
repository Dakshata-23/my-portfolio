import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillShowcaseModalProps {
  skill: string | null;
  onClose: () => void;
}

const TypewriterText: React.FC<{ text: string; delay?: number; speed?: number; onComplete?: () => void }> = ({ text, delay = 0, speed = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      let i = 0;
      setDisplayedText('');
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
      return interval;
    };

    if (delay > 0) {
      timeout = setTimeout(() => {
        const intv = startTyping();
        return () => clearInterval(intv);
      }, delay);
    } else {
      const intv = startTyping();
      return () => clearInterval(intv);
    }

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return <span>{displayedText}</span>;
};

const ReactDemo = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      {/* Code Editor Side */}
      <div className="flex-1 p-4 md:p-6 md:border-r border-white/10 font-mono text-xs md:text-sm overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white/50 ml-2">LikeButton.tsx</span>
        </div>
        <pre className="text-gray-300">
          <code className="text-pink-400">export default function</code> <code className="text-blue-400">LikeButton</code>() {'{\n'}
          {'  '}<code className="text-pink-400">const</code> [likes, setLikes] = <code className="text-yellow-200">useState</code>({count});{'\n\n'}
          {'  '}<code className="text-pink-400">return</code> ({'\n'}
          {'    '}&lt;<code className="text-blue-300">button</code> {'\n'}
          {'      '}className=<code className="text-green-300">"bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"</code>{'\n'}
          {'      '}onClick={'{'}() =&gt; <code className="text-yellow-200">setLikes</code>(likes + 1){'}'}{'\n'}
          {'    '}&gt;{'\n'}
          {'      '}👍 Like ({count}){'\n'}
          {'    '}&lt;/<code className="text-blue-300">button</code>&gt;{'\n'}
          {'  '});{'\n'}
          {'}'}
        </pre>
      </div>
      
      {/* Live Preview Side */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-4 right-4 bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded font-mono">Live Preview</div>
        <button 
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg active:scale-95 flex items-center gap-2"
        >
          👍 Like ({count})
        </button>
      </div>
    </div>
  );
};

const NodeDemo = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div className="w-full h-full bg-[#121212] rounded-xl border border-white/10 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-white/50 ml-2">bash - node server.js</span>
      </div>
      <div className="p-4 md:p-6 flex-1 overflow-auto text-gray-300 flex flex-col gap-2">
        <div>
          <span className="text-green-400">dakshata@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/server</span><span className="text-white">$</span> <TypewriterText text="npm start" onComplete={() => setStep(1)} />
        </div>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-300">
            &gt; server@1.0.0 start<br/>
            &gt; node index.js<br/><br/>
            [INFO] Server running on port 3000 🚀<br/>
            [INFO] Connected to MongoDB database
          </motion.div>
        )}
        {step >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onAnimationComplete={() => setStep(2)}>
            <br/>
            <span className="text-green-400">dakshata@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/server</span><span className="text-white">$</span> <TypewriterText text="curl http://localhost:3000/api/status" delay={1500} onComplete={() => setStep(3)} />
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-300 mt-2 bg-black/30 p-4 rounded border border-white/5">
            {'{'}<br/>
            &nbsp;&nbsp;"status": 200,<br/>
            &nbsp;&nbsp;"message": "API is healthy",<br/>
            &nbsp;&nbsp;"uptime": "99.99%",<br/>
            &nbsp;&nbsp;"developer": "Dakshata Shukla"<br/>
            {'}'}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TailwindDemo = () => {
  const [step, setStep] = useState(0);
  
  const classes = [
    "bg-indigo-500",
    "text-white",
    "font-bold",
    "py-4",
    "px-8",
    "rounded-full",
    "shadow-lg",
    "hover:scale-110",
    "transition-transform"
  ];
  
  const currentClasses = classes.slice(0, step).join(' ');

  useEffect(() => {
    if (step < classes.length) {
      const timer = setTimeout(() => setStep(s => s + 1), 600);
      return () => clearTimeout(timer);
    }
  }, [step, classes.length]);

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div className="flex-1 p-4 md:p-6 md:border-r border-white/10 font-mono text-xs md:text-sm overflow-auto">
         <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white/50 ml-2">index.html</span>
        </div>
        <pre className="text-gray-300">
          &lt;<code className="text-pink-400">button</code> className="<code className="text-green-300">{currentClasses}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span></code>"&gt;{'\n'}
          {'  '}Hover Me!{'\n'}
          &lt;/<code className="text-pink-400">button</code>&gt;
        </pre>
      </div>
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 relative pattern-dots">
         <button className={currentClasses}>Hover Me!</button>
      </div>
    </div>
  );
};

const SQLDemo = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div className="w-full h-full bg-[#121212] rounded-xl border border-white/10 font-mono text-xs md:text-sm overflow-hidden flex flex-col shadow-2xl">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-white/50 ml-2">psql - PostgreSQL</span>
      </div>
      <div className="p-4 md:p-6 flex-1 overflow-auto text-gray-300 flex flex-col gap-2">
        <div>
          <span className="text-blue-400">portfolio=#</span> <TypewriterText text="SELECT name, role FROM users WHERE is_awesome = true;" speed={40} onComplete={() => setStep(1)} />
        </div>
        {step >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 pr-8 text-white font-normal">name</th>
                  <th className="py-2 text-white font-normal">role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-8 text-green-300">Dakshata Shukla</td>
                  <td className="py-2 text-green-300">Full-Stack Developer</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-gray-500">(1 row)</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const PHPDemo = () => {
  const [step, setStep] = useState(0);
  
  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div className="flex-1 p-4 md:p-6 md:border-r border-white/10 font-mono text-xs md:text-sm overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white/50 ml-2">auth.php</span>
        </div>
        <pre className="text-gray-300">
          <code className="text-pink-400">&lt;?php</code>{'\n\n'}
          <code className="text-blue-400">$username</code> = <code className="text-green-300">$_POST['user']</code>;{'\n'}
          <code className="text-blue-400">$password</code> = <code className="text-green-300">$_POST['pass']</code>;{'\n\n'}
          
          <code className="text-pink-400">if</code> (<code className="text-yellow-200">verify_password</code>(<code className="text-blue-400">$password</code>, <code className="text-blue-400">$hash</code>)) {'{\n'}
          {'  '}<code className="text-blue-400">$_SESSION['logged_in']</code> = <code className="text-pink-400">true</code>;{'\n'}
          {'  '}<code className="text-pink-400">echo</code> <code className="text-green-300">json_encode(['status' =&gt; 'success'])</code>;{'\n'}
          {'}'} <code className="text-pink-400">else</code> {'{\n'}
          {'  '}<code className="text-yellow-200">http_response_code</code>(401);{'\n'}
          {'}'}{'\n\n'}
          <code className="text-pink-400">?&gt;</code>
        </pre>
      </div>
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-8 relative">
        {!step ? (
           <button onClick={() => setStep(1)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded shadow transition-colors">
             Login as Dakshata
           </button>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="bg-white border-l-4 border-green-500 shadow-xl p-4 rounded flex items-center gap-3">
             <div className="bg-green-100 text-green-600 p-2 rounded-full">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
             </div>
             <div>
               <h4 className="text-gray-800 font-bold text-sm">Authentication Success</h4>
               <p className="text-gray-500 text-xs mt-0.5">Welcome back, Dakshata! Session started.</p>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const PrismaDemo = () => {
  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10">
      <div className="flex-1 p-4 md:p-6 md:border-r border-white/10 font-mono text-xs md:text-sm overflow-auto">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-white/50 ml-2">db.ts</span>
        </div>
        <pre className="text-gray-300">
          <code className="text-pink-400">const</code> user = <code className="text-pink-400">await</code> prisma.user.<code className="text-yellow-200">create</code>({'{\n'}
          {'  '}data: {'{\n'}
          {'    '}name: <code className="text-green-300">'Dakshata'</code>,{'\n'}
          {'    '}role: <code className="text-green-300">'Full-Stack Developer'</code>,{'\n'}
          {'    '}skills: {'{\n'}
          {'      '}create: [{'{'} name: <code className="text-green-300">'React'</code> {'}'}]{'\n'}
          {'    }'}{'\n'}
          {'  }'}{'\n'}
          {'}'});
        </pre>
      </div>
      <div className="flex-1 bg-[#1e1e1e] flex flex-col justify-center p-8 relative border-l border-white/10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="font-mono text-xs md:text-sm text-gray-300">
           <span className="text-white/50 block mb-2">// Fully Typed Result</span>
           <span className="text-blue-300">type</span> User = {'{\n'}
           {'  '}id: <span className="text-yellow-400">string</span>;<br/>
           {'  '}name: <span className="text-yellow-400">string</span>;<br/>
           {'  '}role: <span className="text-yellow-400">string</span>;<br/>
           {'  '}createdAt: <span className="text-yellow-400">Date</span>;<br/>
           {'}'}<br/><br/>
           <span className="text-green-400">✓ User successfully persisted to DB</span>
        </motion.div>
      </div>
    </div>
  );
}


const SkillShowcaseModal: React.FC<SkillShowcaseModalProps> = ({ skill, onClose }) => {
  const renderContent = () => {
    switch (skill) {
      case 'React.js':
      case 'React':
        return <ReactDemo />;
      case 'Node.js':
        return <NodeDemo />;
      case 'Tailwind CSS':
        return <TailwindDemo />;
      case 'SQL':
      case 'PostgreSQL':
      case 'MySQL':
        return <SQLDemo />;
      case 'PHP':
        return <PHPDemo />;
      case 'Prisma ORM':
      case 'Prisma':
        return <PrismaDemo />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">{skill}</h3>
            <p className="text-gray-400 text-sm md:text-base max-w-sm">
              I have hands-on experience using {skill} to build scalable, robust applications. 
              Ask me about the specific projects where I've implemented this!
            </p>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {skill && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl h-[400px] md:h-[500px] z-10 flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2 flex items-center gap-2"
            >
              <span className="text-sm font-medium">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            {renderContent()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SkillShowcaseModal;

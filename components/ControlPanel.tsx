import React, { useState } from 'react';
import { motion } from 'framer-motion';

const defaultTheme = {
  "--background": "#0f0f14",
  "--textPrimary": "#ececf1",
  "--primary": "#6366f1"
};

const ControlPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theme' | 'architecture'>('theme');
  const [themeJson, setThemeJson] = useState(JSON.stringify(defaultTheme, null, 2));
  const [themeError, setThemeError] = useState('');

  const handleThemeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setThemeJson(val);
    try {
      const parsed = JSON.parse(val);
      Object.keys(parsed).forEach(key => {
        document.documentElement.style.setProperty(key, parsed[key]);
      });
      setThemeError('');
    } catch (err) {
      setThemeError('Invalid JSON Format');
    }
  };

  return (
    <section id="playground" className="mb-24 relative z-[70]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-textPrimary tracking-tight">
            Developer Controls
          </h2>
          <p className="text-sm text-textSecondary mt-1">Live configuration and system topology</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200/40 dark:border-white/10 bg-white/70 dark:bg-[#0f0f14]/80 backdrop-blur-xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
        {/* MacOS Window Header */}
        <div className="flex items-center px-4 py-3 bg-gray-100/50 dark:bg-black/40 border-b border-gray-200/50 dark:border-white/10">
          <div className="flex space-x-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/50 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/50 shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/50 shadow-sm"></div>
          </div>
          
          <div className="flex space-x-1 bg-gray-200/50 dark:bg-white/5 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'theme' 
                  ? 'bg-white dark:bg-[#2a2a33] text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-400'
              }`}
            >
              theme.json
            </button>
            <button 
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                activeTab === 'architecture' 
                  ? 'bg-white dark:bg-[#2a2a33] text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-400'
              }`}
            >
              topology.tsx
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 min-h-[350px] relative">
          {activeTab === 'theme' && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-full font-mono"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  <span className="text-indigo-500 dark:text-indigo-400 font-semibold">const</span> <span className="text-blue-600 dark:text-blue-400">themeConfig</span> = <span className="text-yellow-600 dark:text-yellow-400">inject</span>()
                </p>
                {themeError && (
                  <span className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded-full border border-red-500/20 font-semibold">
                    {themeError}
                  </span>
                )}
              </div>
              
              <div className="relative group flex-grow">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <textarea
                  value={themeJson}
                  onChange={handleThemeChange}
                  className="w-full h-56 bg-gray-50/50 dark:bg-black/50 text-gray-800 dark:text-gray-300 p-5 rounded-lg outline-none resize-none border border-gray-200/50 dark:border-white/5 focus:border-indigo-500/30 transition-colors shadow-inner text-sm leading-relaxed"
                  spellCheck={false}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'architecture' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full w-full py-8"
            >
              <div className="relative w-full max-w-xl mx-auto flex items-center justify-between">
                
                {/* SVG Connecting Lines with animated data flow */}
                <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-0.5 bg-gray-200 dark:bg-gray-800 z-0">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-1/3 rounded-full opacity-70"
                     animate={{ x: ["0%", "200%"] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                   />
                </div>

                {/* Nodes */}
                <div className="relative z-10 flex flex-col items-center p-5 rounded-2xl bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 shadow-lg">
                  <div className="w-14 h-14 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex items-center justify-center mb-3 border border-cyan-100 dark:border-cyan-800">
                    <span className="text-cyan-600 dark:text-cyan-400 text-xl font-bold">R</span>
                  </div>
                  <span className="text-sm font-semibold text-textPrimary">Frontend</span>
                  <span className="text-[11px] text-gray-500 font-mono mt-1">React Client</span>
                </div>

                <div className="relative z-10 flex flex-col items-center p-5 rounded-2xl bg-white dark:bg-[#1a1a24] border border-indigo-200 dark:border-indigo-500/30 shadow-indigo-500/20 shadow-xl scale-110">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-15 animate-pulse pointer-events-none"></div>
                  <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-3 relative border border-indigo-100 dark:border-indigo-800">
                    <span className="text-indigo-600 dark:text-indigo-400 text-xl font-bold">N</span>
                  </div>
                  <span className="text-sm font-semibold text-textPrimary relative">API Gateway</span>
                  <span className="text-[11px] text-gray-500 font-mono mt-1 relative">Node.js API</span>
                </div>

                <div className="relative z-10 flex flex-col items-center p-5 rounded-2xl bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 shadow-lg">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-3 border border-blue-100 dark:border-blue-800">
                    <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">DB</span>
                  </div>
                  <span className="text-sm font-semibold text-textPrimary">Database</span>
                  <span className="text-[11px] text-gray-500 font-mono mt-1">PostgreSQL</span>
                </div>

              </div>
              
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-12 font-mono text-center max-w-sm">
                // System topology demonstrating bidirectional real-time data flow through REST architecture.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ControlPanel;

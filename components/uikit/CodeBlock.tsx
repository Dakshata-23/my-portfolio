import React, { useState } from 'react';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied — nothing useful to do, button just won't confirm
    }
  };

  return (
    <div className="rounded-xl border border-accent bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-accent">
        <span className="text-[10px] font-semibold text-textSecondary uppercase tracking-wider">Code</span>
        <button onClick={copy} className="text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-textPrimary overflow-x-auto whitespace-pre">{code}</pre>
    </div>
  );
};

export default CodeBlock;

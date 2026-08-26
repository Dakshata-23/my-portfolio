import React, { useMemo, useState } from 'react';
import { CronParseError, FIELD_LABELS, describeCron, getNextRuns, parseCron, resolveExpression } from './cronUtils';

const inputClass =
  'w-full bg-surface border border-accent rounded-lg px-4 py-3 text-base font-mono text-textPrimary placeholder:text-textSecondary/50 outline-none focus:border-textSecondary/50 transition-colors';

const EXAMPLES = ['*/15 * * * *', '0 9 * * 1-5', '0 0 1 * *', '@daily'];

const CronParser: React.FC = () => {
  const [expression, setExpression] = useState('');

  const fields = useMemo(() => {
    try {
      return resolveExpression(expression);
    } catch {
      return null;
    }
  }, [expression]);

  const result = useMemo(() => {
    if (!expression.trim()) return null;
    try {
      const parsed = parseCron(expression);
      return {
        ok: true as const,
        description: describeCron(parsed),
        nextRuns: getNextRuns(parsed, 5),
      };
    } catch (err) {
      return { ok: false as const, message: err instanceof CronParseError ? err.message : 'Could not parse this expression.' };
    }
  }, [expression]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Cron Expression</p>
          <div className="flex gap-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setExpression(ex)}
                className="text-xs font-mono text-textSecondary hover:text-textPrimary transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
        <input
          className={inputClass}
          placeholder="*/15 * * * *"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />

        {fields && (
          <div className="grid grid-cols-5 gap-2 mt-4">
            {fields.map((token, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-sm text-textPrimary bg-accent/40 rounded-md py-1.5">{token}</div>
                <div className="text-[10px] text-textSecondary uppercase tracking-wider mt-1">{FIELD_LABELS[i]}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {result && !result.ok && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-500">{result.message}</div>
      )}

      {result && result.ok && (
        <>
          <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">In Plain English</p>
            <p className="text-lg text-textPrimary leading-relaxed">{result.description}</p>
          </div>

          <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-4">Next Runs</p>
            {result.nextRuns.length === 0 ? (
              <p className="text-sm text-textSecondary">Couldn't find an upcoming run within the next 2 years — check the expression.</p>
            ) : (
              <ul className="space-y-2">
                {result.nextRuns.map((date, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-textPrimary">
                    <span className="text-textSecondary font-mono text-xs w-5">{i + 1}.</span>
                    {date.toLocaleString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CronParser;

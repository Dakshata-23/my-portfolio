import React, { useMemo, useState } from 'react';
import { decodeJwt, formatClaimDate, EXAMPLE_JWT, JwtDecodeError } from './jwtUtils';

const textareaClass =
  'w-full bg-surface border border-accent rounded-lg px-4 py-3 text-sm font-mono text-textPrimary placeholder:text-textSecondary/50 outline-none focus:border-textSecondary/50 transition-colors resize-none';

const JsonBlock: React.FC<{ title: string; data: unknown }> = ({ title, data }) => {
  const [copied, setCopied] = useState(false);
  const json = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access denied — nothing useful to do, button just won't confirm
    }
  };

  return (
    <div className="rounded-2xl glass border border-accent shadow-sm overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-accent">
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider">{title}</span>
        <button onClick={copy} className="text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 text-sm font-mono text-textPrimary overflow-x-auto whitespace-pre-wrap break-all flex-grow">{json}</pre>
    </div>
  );
};

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState('');

  const result = useMemo(() => {
    if (!token.trim()) return null;
    try {
      return { ok: true as const, data: decodeJwt(token) };
    } catch (err) {
      return { ok: false as const, message: err instanceof JwtDecodeError ? err.message : 'Could not decode this token.' };
    }
  }, [token]);

  const claims = result?.ok ? result.data.payload : null;
  const exp = claims && typeof claims.exp === 'number' ? (claims.exp as number) : null;
  const isExpired = exp !== null ? Date.now() >= exp * 1000 : null;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Paste a JWT</p>
          <button
            onClick={() => setToken(EXAMPLE_JWT)}
            className="text-xs font-medium text-textPrimary hover:text-blue-500 transition-colors"
          >
            Try an example
          </button>
        </div>
        <textarea
          className={textareaClass}
          rows={4}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          spellCheck={false}
        />
      </div>

      {result && !result.ok && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-500">
          {result.message}
        </div>
      )}

      {result && result.ok && (
        <>
          {exp !== null && (
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium ${
                isExpired
                  ? 'border-red-500/30 bg-red-500/10 text-red-500'
                  : 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}></span>
              {isExpired ? 'Expired' : 'Valid'} — expires {formatClaimDate(exp)}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <JsonBlock title="Header" data={result.data.header} />
            <JsonBlock title="Payload" data={result.data.payload} />
          </div>

          <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Signature</p>
            <p className="text-sm font-mono text-textSecondary break-all">{result.data.signature}</p>
            <p className="text-xs text-textSecondary mt-3">
              This only decodes the token — it doesn't verify the signature against a secret or public key, since that would mean sending it to a server.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default JwtDecoder;

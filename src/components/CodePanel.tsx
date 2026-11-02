import { useEffect, useState } from 'react'
import { codeSnippet } from '../data/portfolio'
const hl = (l: string) => l
  .replace(/(const)/, '<span style="color:#ff6b9d">$1</span>')
  .replace(/("[^"]*")/g, '<span style="color:#4ade80">$1</span>')
  .replace(/^(\s*)(\w+):/, '$1<span style="color:#a78bfa">$2</span>:')
export default function CodePanel() {
  const [n, setN] = useState(0)
  useEffect(() => { if (n >= codeSnippet.length) return; const t = setTimeout(() => setN(n + 3), 25); return () => clearTimeout(t) }, [n])
  const lines = codeSnippet.slice(0, n).split('\n')
  return (
    <div className="glass rounded-xl p-5 font-mono text-[13px] leading-6 shadow-[0_0_60px_-15px_#5865FF] border-blue/30 [transform:perspective(900px)_rotateY(-8deg)] hover:[transform:perspective(900px)_rotateY(0)] transition-transform duration-500" aria-label="Code snippet about Pragathi">
      <div className="flex gap-1.5 mb-3"><i className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><i className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><i className="w-2.5 h-2.5 rounded-full bg-green-400/70"/><span className="ml-3 text-mute text-xs">pragathi.ts</span></div>
      <pre className="whitespace-pre-wrap">{lines.map((l, i) => <div key={i} dangerouslySetInnerHTML={{ __html: hl(l) || '&nbsp;' }} />)}</pre>
    </div>)
}

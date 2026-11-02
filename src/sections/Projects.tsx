import { useState, useEffect, useCallback, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, X } from 'lucide-react'
import Section from './Section'
import { projects } from '../data/portfolio'

type P = typeof projects[number]

/* ── Card ────────────────────────────────────────────────────────────── */
function Card({ p, onOpen }: { p: P; onOpen: () => void }) {
  const tilt = (e: MouseEvent<HTMLButtonElement>) => {
    const b = e.currentTarget, r = b.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    b.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  return (
    <button
      onClick={onOpen}
      onMouseMove={tilt}
      onMouseLeave={e => (e.currentTarget.style.transform = '')}
      className="card text-left transition-transform duration-150 w-full"
    >
      <p className="text-xs text-cyan font-medium tracking-wide">{p.sub}</p>
      <h3 className="text-xl font-bold mt-2 leading-snug">{p.name}</h3>
      <p className="text-mute text-sm mt-3 leading-relaxed line-clamp-2">{p.cardDesc}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {p.tags.slice(0, 5).map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
            {t}
          </span>
        ))}
      </div>
    </button>
  )
}

/* ── Modal ───────────────────────────────────────────────────────────── */
function Modal({ sel, onClose }: { sel: P; onClose: () => void }) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        role="dialog"
        aria-modal
        aria-label={sel.name}
        className="glass rounded-2xl p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full grid place-items-center
                     text-mute hover:text-ink bg-white/5 hover:bg-white/10 transition"
        >
          <X size={16} />
        </button>

        {/* Sub-label + title */}
        <p className="text-xs text-cyan font-medium tracking-wider uppercase pr-8">{sel.sub}</p>
        <h3 className="text-2xl font-extrabold mt-1 leading-tight pr-8">{sel.name}</h3>

        <div className="mt-5 border-t border-white/[0.08]" />

        {/* Description */}
        <h4 className="mt-5 text-[0.65rem] text-violet font-semibold uppercase tracking-widest">
          Description
        </h4>
        <p className="mt-2 text-mute text-sm leading-relaxed">{sel.text}</p>

        {/* Technologies */}
        <h4 className="mt-6 text-[0.65rem] text-violet font-semibold uppercase tracking-widest">
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2 mt-2.5">
          {sel.tags.map(t => (
            <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {t}
            </span>
          ))}
        </div>

        {/* GitHub button — only when a real repo exists */}
        {sel.repo && (
          <div className="mt-7">
            <a
              href={sel.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5
                         text-sm font-medium hover:border-violet/60
                         hover:shadow-[0_0_20px_-6px_#9B5CFF] transition duration-300"
            >
              <Github size={15} /> View on GitHub
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────── */
export default function Projects() {
  const [sel, setSel] = useState<P | null>(null)
  return (
    <Section id="projects" title="Featured projects">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Card key={p.id} p={p} onOpen={() => setSel(p)} />
        ))}
      </div>
      <AnimatePresence>
        {sel && <Modal key={sel.id} sel={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </Section>
  )
}

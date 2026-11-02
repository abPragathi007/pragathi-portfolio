import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, X, Trophy, ChevronRight } from 'lucide-react'
import Section from './Section'
import { achievements } from '../data/portfolio'

type A = typeof achievements[number]

/* ── helpers ─────────────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

const ACCENT = {
  violet: {
    label:  'text-violet border-violet/30 bg-violet/10',
    glow:   'hover:shadow-[0_0_32px_-8px_#9B5CFF] hover:border-violet/50',
    bar:    'bg-gradient-to-r from-violet/60 to-transparent',
    badge:  'bg-violet/10 border-violet/25 text-violet/90',
    btn:    'hover:border-violet/60 hover:shadow-[0_0_20px_-6px_#9B5CFF]',
  },
  cyan: {
    label:  'text-cyan border-cyan/30 bg-cyan/10',
    glow:   'hover:shadow-[0_0_32px_-8px_#48DFFF] hover:border-cyan/50',
    bar:    'bg-gradient-to-r from-cyan/60 to-transparent',
    badge:  'bg-cyan/10 border-cyan/25 text-cyan/90',
    btn:    'hover:border-cyan/50 hover:shadow-[0_0_20px_-6px_#48DFFF]',
  },
} as const

/* ── Achievement Card ────────────────────────────────────────────────── */
function AchievementCard({ a, delay, onOpen }: { a: A; delay: number; onOpen: () => void }) {
  const ac = ACCENT[a.accentColor as keyof typeof ACCENT]

  return (
    <motion.button
      {...fadeUp(delay)}
      onClick={onOpen}
      className={`card text-left w-full relative overflow-hidden transition-all duration-300
                  hover:-translate-y-1 ${ac.glow} group`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${ac.bar}`} />

      {/* Thumbnail image */}
      {a.photo && (
        <div className="w-full mb-5 overflow-hidden rounded-xl">
          <img
            src={a.photo}
            alt={a.title}
            className="w-full object-cover max-h-40 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Category label */}
      <span className={`inline-block text-[0.65rem] font-semibold uppercase tracking-widest
                        px-2.5 py-1 rounded-full border ${ac.label}`}>
        {a.label}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold mt-3 leading-snug">{a.title}</h3>

      {/* Short description */}
      <p className="text-mute text-sm mt-2.5 leading-relaxed line-clamp-2">{a.cardDesc}</p>

      {/* View indicator */}
      <div className="flex items-center gap-1 mt-4 text-xs font-medium text-mute/70 group-hover:text-ink transition">
        <span>View Achievement</span>
        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.button>
  )
}

/* ── Modal ───────────────────────────────────────────────────────────── */
function AchievementModal({ a, onClose }: { a: A; onClose: () => void }) {
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

  const ac = ACCENT[a.accentColor as keyof typeof ACCENT]

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
        aria-label={a.title}
        className="glass rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Photo (top, full-width) */}
        {a.photo && (
          <div className="w-full overflow-hidden rounded-t-2xl">
            <img
              src={a.photo}
              alt={`${a.title} – photograph`}
              className="w-full object-cover max-h-60"
            />
          </div>
        )}

        <div className="p-7">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full grid place-items-center
                       text-mute hover:text-ink bg-white/5 hover:bg-white/10 transition"
          >
            <X size={16} />
          </button>

          {/* Category label */}
          <span className={`inline-block text-[0.65rem] font-semibold uppercase tracking-widest
                            px-2.5 py-1 rounded-full border ${ac.label}`}>
            {a.label}
          </span>

          {/* Full title */}
          <h3 className="text-2xl font-extrabold mt-3 leading-tight pr-8">{a.fullTitle}</h3>

          <div className="mt-5 border-t border-white/[0.08]" />

          {/* Description */}
          <h4 className="mt-5 text-[0.65rem] text-violet font-semibold uppercase tracking-widest">
            About
          </h4>
          <p className="mt-2 text-mute text-sm leading-relaxed">{a.text}</p>

          {/* Project highlights (HackVerse & FKCCI) */}
          {'highlights' in a && Array.isArray(a.highlights) && a.highlights.length > 0 && (
            <>
              <h4 className="mt-6 text-[0.65rem] text-violet font-semibold uppercase tracking-widest">
                Highlights
              </h4>
              <ul className="mt-2.5 space-y-2">
                {(a.highlights as string[]).map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-mute">
                    <Trophy size={13} className="shrink-0 mt-0.5 text-yellow-400/80" />
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Key details grid */}
          {a.details.length > 0 && (
            <>
              <h4 className="mt-6 text-[0.65rem] text-violet font-semibold uppercase tracking-widest">
                Details
              </h4>
              <div className="mt-2.5 grid gap-2">
                {a.details.map(({ label, value }) => (
                  <div key={label}
                    className={`flex items-start justify-between gap-4 rounded-xl
                                border px-4 py-2.5 text-sm ${ac.badge}`}>
                    <span className="font-medium shrink-0 opacity-70">{label}</span>
                    <span className="text-right text-ink/90">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Document button */}
          {a.doc && (
            <div className="mt-7">
              <a
                href={a.doc}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 glass rounded-full px-5 py-2.5
                            text-sm font-medium transition duration-300 ${ac.btn}`}
              >
                <FileText size={15} /> {a.docLabel}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────── */
export default function Achievements() {
  const [sel, setSel] = useState<A | null>(null)

  return (
    <Section id="achievements" title="Achievements & Recognition">
      {/* Subtitle */}
      <motion.p
        {...fadeUp(0.05)}
        className="text-mute text-base mb-10 -mt-4 max-w-2xl"
      >
        Milestones that reflect innovation, collaboration, and the drive to create meaningful impact.
      </motion.p>

      {/* Card grid — 2 cols on md, 1 col on mobile */}
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((a, i) => (
          <AchievementCard
            key={a.id}
            a={a}
            delay={0.1 + i * 0.1}
            onOpen={() => setSel(a)}
          />
        ))}
      </div>

      <AnimatePresence>
        {sel && (
          <AchievementModal key={sel.id} a={sel} onClose={() => setSel(null)} />
        )}
      </AnimatePresence>
    </Section>
  )
}

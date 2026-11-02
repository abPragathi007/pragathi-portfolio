import { motion } from 'framer-motion'
import { Code2, Lightbulb, Users } from 'lucide-react'
import { profile } from '../data/portfolio'

/* ─── animation helpers ─────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
})

/* ─── data ───────────────────────────────────────────────────────── */
const bio = [
  "I'm Pragathi A B, a Computer Science & Technology undergraduate at Dayananda Sagar University, Bengaluru (2024–2028), with a CGPA of 8.88.",
  "I enjoy building technology that solves meaningful problems. My interests span software engineering, artificial intelligence, and cloud computing, with a strong focus on turning ideas into functional, real-world solutions.",
  "From developing AI-powered applications and exploring end-to-end deployment workflows to working on innovative healthcare technology, I believe the best way to learn is by building, experimenting, and solving challenging problems.",
  "Beyond academics, I actively engage in technical communities, competitive programming, innovation challenges, and collaborative projects. I'm always looking for opportunities to learn from others, contribute to meaningful work, and grow as an engineer.",
]

const stats = [
  { value: '8.88',        label: 'Current CGPA'     },
  { value: '2024–28',     label: 'B.Tech Journey'    },
  { value: 'Continuous',  label: 'Learning Mindset'  },
]

const pillars = [
  {
    Icon: Code2,
    title: 'Engineering & Development',
    desc:  'Building practical applications, exploring full-stack development, and understanding end-to-end software delivery.',
  },
  {
    Icon: Lightbulb,
    title: 'Innovation & Research',
    desc:  'Exploring AI-driven solutions, assistive technology, healthcare innovation, and patent-oriented development.',
  },
  {
    Icon: Users,
    title: 'Leadership & Collaboration',
    desc:  'Participating in hackathons, technical communities, open-source initiatives, and collaborative engineering projects.',
  },
]

/* ─── component ──────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="px-6 py-24 scroll-mt-[90px]">
      <div className="max-w-6xl mx-auto">

        {/* ── Section heading ───────────────────────────────────── */}
        <motion.div {...fadeUp()} className="mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Beyond the <span className="grad">Code.</span>
          </h2>
          <p className="mt-3 text-lg md:text-xl text-mute font-medium">
            Driven by <span className="grad">Curiosity.</span>{' '}
            Focused on <span className="grad">Impact.</span>
          </p>
        </motion.div>

        {/* ── Two-column: image + bio ───────────────────────────── */}
        <div className="grid md:grid-cols-[.85fr_1.15fr] gap-12 items-start">

          {/* Profile image */}
          <motion.div {...fadeUp(0.1)} className="relative group max-w-sm mx-auto md:mx-0">
            <div
              className="absolute -inset-[3px] rounded-3xl opacity-60 blur-xl group-hover:opacity-90 transition duration-500"
              style={{ background: 'linear-gradient(135deg,#5865FF,#9B5CFF,#48DFFF)' }}
              aria-hidden="true"
            />
            <img
              src={profile.photo}
              alt="Pragathi A B — profile photograph"
              loading="lazy"
              className="relative rounded-3xl w-full aspect-[4/5] object-cover object-top shadow-2xl"
            />
          </motion.div>

          {/* Bio text + stat cards */}
          <motion.div {...fadeUp(0.2)} className="space-y-5">
            {bio.map((p, i) => (
              <p key={i} className="text-mute text-[1.05rem] leading-relaxed">{p}</p>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  {...fadeUp(0.25 + i * 0.1)}
                  className="glass rounded-2xl p-4 text-center border border-white/[0.06]
                             hover:border-violet/50 hover:shadow-[0_0_24px_-6px_#9B5CFF]
                             transition duration-300"
                >
                  <p className="text-xl md:text-2xl font-extrabold grad leading-none">{value}</p>
                  <p className="mt-1.5 text-[0.72rem] md:text-xs text-mute uppercase tracking-widest">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── What Defines My Journey ───────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="mt-20">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
            What Defines My <span className="grad">Journey</span>
          </h3>
          <p className="text-mute text-sm mb-10">The pillars that shape how I think, build, and grow.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp(0.15 + i * 0.1)}
                className="glass rounded-2xl p-6 flex flex-col gap-4 border border-white/[0.06]
                           hover:border-blue/50 hover:shadow-[0_0_28px_-8px_#5865FF]
                           hover:-translate-y-1 transition duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(88,101,255,.18),rgba(155,92,255,.18))' }}
                >
                  <Icon size={20} className="text-violet" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-base mb-1.5">{title}</h4>
                  <p className="text-mute text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

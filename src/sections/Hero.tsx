import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'
import ParticleBackground from '../components/ParticleBackground'
import CodePanel from '../components/CodePanel'
import { profile } from '../data/portfolio'

export default function Hero() {
  const socialIcons = [
    [Github, profile.github, 'GitHub'],
    [Linkedin, profile.linkedin, 'LinkedIn'],
    [Mail, `mailto:${profile.email}`, 'Email'],
  ] as const

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-12">
      <ParticleBackground />
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">

        {/* Left — text content */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          {/* Availability badge */}
          <span className="glass rounded-full px-3 py-1 text-xs inline-flex items-center gap-2 mb-6">
            <i className="w-2 h-2 rounded-full bg-green-400" />
            Open to Internships &amp; Opportunities
          </span>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Hello, I'm <span className="grad">Pragathi A B.</span>
          </h1>

          {/* Highlighted role — static, no typewriter cycle needed */}
          <p className="mt-3 text-3xl md:text-4xl font-bold text-mute/80" aria-label="Role">
            Aspiring Software Engineer.
          </p>

          {/* Description */}
          <p className="mt-8 border-l-2 border-white/20 pl-4 text-mute max-w-xl leading-relaxed">
            {profile.intro}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="bg-ink text-bg font-semibold rounded-full px-6 py-3 flex items-center gap-2 hover:scale-105 transition"
            >
              Explore My Work <ArrowRight size={16} />
            </a>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="glass rounded-full px-6 py-3 hover:border-violet transition"
            >
              Download Resume
            </a>
          </div>

          {/* Social icons — GitHub, LinkedIn, Email */}
          <div className="mt-6 flex gap-3">
            {socialIcons.filter(([, href]) => href).map(([Icon, href, label]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="glass w-10 h-10 rounded-full grid place-items-center text-mute hover:text-ink hover:border-blue transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — animated code panel */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .9, delay: .3 }}
        >
          <CodePanel />
        </motion.div>

      </div>
    </section>
  )
}


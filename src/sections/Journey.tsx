import Section from './Section'
import { motion } from 'framer-motion'
import { journey } from '../data/portfolio'
export default function Journey() {
  return (<Section id="journey" title="Experience & journey"><div className="relative border-l border-white/15 ml-2 space-y-8">
    {journey.map(j => (<motion.div key={j.role + j.date} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="pl-8 relative">
      <i className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-violet shadow-[0_0_12px_#9B5CFF]"/>
      <div className="card"><p className="text-xs text-cyan">{j.date}</p><h3 className="text-xl font-bold mt-1">{j.role}</h3><p className="text-mute text-sm">{j.place}</p>
        <p className="mt-3 text-mute">{j.text}</p><div className="flex flex-wrap gap-2 mt-4">{j.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>)}</div></div></motion.div>))}</div></Section>)
}

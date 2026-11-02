import Section from './Section'
import { skills } from '../data/portfolio'
export default function Skills() {
  return (<Section id="skills" title="Technical skills"><div className="grid md:grid-cols-3 gap-5">
    {skills.map(s => <div key={s.cat} className="card"><h3 className="font-bold grad mb-4">{s.cat}</h3><div className="flex flex-wrap gap-2">{s.items.map(i => <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet hover:-translate-y-0.5 transition">{i}</span>)}</div></div>)}</div></Section>)
}

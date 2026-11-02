import Section from './Section'
import { education } from '../data/portfolio'
export default function Education() {
  return (<Section id="education" title="Education"><div className="grid md:grid-cols-3 gap-5">
    {education.map(e => <div key={e.school} className="card"><p className="text-xs text-cyan">{e.period}</p><h3 className="font-bold mt-2">{e.school}</h3><p className="text-mute text-sm mt-1">{e.degree}</p><p className="grad text-2xl font-extrabold mt-4">{e.score}</p></div>)}</div></Section>)
}

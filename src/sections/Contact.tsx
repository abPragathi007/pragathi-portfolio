import { useState, type FormEvent } from 'react'
import { Mail, Github, Linkedin } from 'lucide-react'
import Section from './Section'
import { profile } from '../data/portfolio'
// No backend is configured, so the form opens the visitor's email app (mailto). It never claims a message was sent.
export default function Contact() {
  const [err, setErr] = useState('')
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) || '').trim()
    if (!g('name') || !g('subject') || !g('message')) return setErr('Please fill in name, subject and message.')
    if (!/^\S+@\S+\.\S+$/.test(g('email'))) return setErr('Enter a valid email address.')
    setErr(''); location.href = `mailto:${profile.email}?subject=${encodeURIComponent(g('subject'))}&body=${encodeURIComponent(`${g('message')}\n\nFrom: ${g('name')} (${g('email')})`)}`
  }
  const inp = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet'
  return (<Section id="contact" title="Let's build something meaningful."><div className="grid md:grid-cols-2 gap-10">
    <div><p className="text-mute text-lg">I'm always interested in connecting with people, exploring ideas, and building technology that makes a difference.</p>
      <div className="mt-6 space-y-3"><a href={`mailto:${profile.email}`} className="flex gap-3 items-center hover:text-violet"><Mail size={18}/>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="flex gap-3 items-center hover:text-violet"><Github size={18}/>GitHub</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex gap-3 items-center hover:text-violet"><Linkedin size={18}/>LinkedIn</a>}</div></div>
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input name="name" placeholder="Name" aria-label="Name" className={inp}/><input name="email" type="email" placeholder="Email" aria-label="Email" className={inp}/>
      <input name="subject" placeholder="Subject" aria-label="Subject" className={inp}/><textarea name="message" rows={5} placeholder="Message" aria-label="Message" className={inp}/>
      {err && <p role="alert" className="text-red-400 text-sm">{err}</p>}
      <button className="bg-gradient-to-r from-blue to-violet rounded-full px-8 py-3 font-semibold hover:scale-105 transition">Open in email app</button></form></div></Section>)
}

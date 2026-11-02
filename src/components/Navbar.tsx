import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { nav, profile } from '../data/portfolio'
export default function Navbar() {
  const [active, setActive] = useState('home'); const [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach(n => { const s = document.getElementById(n.toLowerCase()); s && io.observe(s) }); return () => io.disconnect()
  }, [])
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4"><nav className="glass rounded-full max-w-6xl mx-auto flex items-center justify-between px-4 py-2 relative" aria-label="Main">
      <a href="#home" className="flex items-center gap-3"><span className="w-9 h-9 rounded-full grid place-items-center text-[11px] font-bold bg-gradient-to-br from-blue to-violet">{profile.short}</span>
        <span className="leading-tight hidden sm:block"><b className="text-sm grad">{profile.name}</b><br/><small className="text-[10px] text-mute">{profile.title}</small></span></a>
      <ul className="hidden lg:flex gap-1 text-sm">{nav.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} className={`px-3 py-1.5 rounded-full transition ${active === n.toLowerCase() ? 'bg-white/10 text-ink' : 'text-mute hover:text-ink'}`}>{n}</a></li>)}</ul>
      <div className="flex items-center gap-2">
        <a href={profile.resume} download={profile.resumeName} className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2 hover:border-violet transition"><Download size={14}/>Resume</a>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div>
      {open && <ul className="absolute top-16 inset-x-0 glass rounded-2xl p-3 lg:hidden grid">{nav.map(n => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block px-4 py-3 text-mute hover:text-ink">{n}</a></li>)}</ul>}
    </nav></header>)
}

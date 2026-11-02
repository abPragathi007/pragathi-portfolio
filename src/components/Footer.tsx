import { profile, nav } from '../data/portfolio'
export default function Footer() {
  return (<footer className="border-t border-white/10 py-10 px-6 text-sm text-mute"><div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
    <div className="flex items-center gap-3"><span className="w-9 h-9 rounded-full grid place-items-center text-[11px] font-bold bg-gradient-to-br from-blue to-violet text-ink">{profile.short}</span>{profile.name}</div>
    <div className="flex flex-wrap gap-4 justify-center">{nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-ink">{n}</a>)}<a href={profile.resume} download={profile.resumeName} className="hover:text-ink">Resume</a></div>
    <p>© {new Date().getFullYear()} Designed & built by Pragathi.</p></div></footer>)
}

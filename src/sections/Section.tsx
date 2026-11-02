import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (<section id={id} className="px-6 py-24"><div className="max-w-6xl mx-auto">
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-extrabold mb-12">{title}</motion.h2>
    {children}</div></section>)
}

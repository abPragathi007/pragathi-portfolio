import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
// Blue-violet particle cloud that drifts organically and is pushed away by the mouse.
export default function ParticleBackground() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current!; const mobile = window.innerWidth < 768
    const N = mobile ? 2500 : 9000
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100); cam.position.z = 6
    const r = new THREE.WebGLRenderer({ alpha: true, antialias: false }); r.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    r.setSize(el.clientWidth, el.clientHeight); el.appendChild(r.domElement)
    const base = new Float32Array(N * 3), pos = new Float32Array(N * 3), col = new Float32Array(N * 3), ph = new Float32Array(N)
    const cA = new THREE.Color('#5865FF'), cB = new THREE.Color('#9B5CFF'), cC = new THREE.Color('#48DFFF')
    for (let i = 0; i < N; i++) {
      const rad = Math.pow(Math.random(), 0.6) * 2.4, th = Math.random() * 6.283, ps = Math.acos(2 * Math.random() - 1)
      base[i*3] = rad * Math.sin(ps) * Math.cos(th) * 1.2; base[i*3+1] = rad * Math.sin(ps) * Math.sin(th); base[i*3+2] = rad * Math.cos(ps) * 0.8
      ph[i] = Math.random() * 6.283
      const c = Math.random() < 0.08 ? cC : cA.clone().lerp(cB, Math.random()); col.set([c.r, c.g, c.b], i * 3)
    }
    pos.set(base)
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: mobile ? 0.03 : 0.022, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }))
    scene.add(pts)
    const mouse = new THREE.Vector3(99, 99, 0); const reduce = prefersReducedMotion()
    const onMove = (e: PointerEvent) => { const b = el.getBoundingClientRect(); mouse.set(((e.clientX - b.left) / b.width * 2 - 1) * 3.2, -((e.clientY - b.top) / b.height * 2 - 1) * 2.4, 0) }
    window.addEventListener('pointermove', onMove)
    const onResize = () => { r.setSize(el.clientWidth, el.clientHeight); cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix() }
    window.addEventListener('resize', onResize)
    let raf = 0, t = 0
    const loop = () => {
      t += 0.004; pts.rotation.y = t * 0.4
      for (let i = 0; i < N; i++) {
        const p = ph[i]
        let x = base[i*3] + Math.sin(t * 2 + p) * 0.12, y = base[i*3+1] + Math.cos(t * 1.7 + p * 1.3) * 0.12, z = base[i*3+2] + Math.sin(t * 1.3 + p) * 0.1
        const dx = x - mouse.x, dy = y - mouse.y, d = Math.hypot(dx, dy)
        if (d < 0.9) { const f = (0.9 - d) / 0.9; x += dx / d * f * 0.6; y += dy / d * f * 0.6 }
        pos[i*3] += (x - pos[i*3]) * 0.08; pos[i*3+1] += (y - pos[i*3+1]) * 0.08; pos[i*3+2] += (z - pos[i*3+2]) * 0.08
      }
      g.attributes.position.needsUpdate = true; r.render(scene, cam)
      if (!reduce) raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); window.removeEventListener('resize', onResize); r.dispose(); g.dispose(); el.removeChild(r.domElement) }
  }, [])
  return <div ref={ref} className="absolute inset-0" aria-hidden />
}

import { useEffect, useRef, useState } from 'react'
import type React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export type Photo360 = {
  src: string
  label: string
  description: string
}

type Props = {
  photos: Photo360[]
  onClose: () => void
}

const FOV_START  = 55   // zoomed-in start
const FOV_END    = 75   // normal field of view
const ZOOM_MS    = 1400 // zoom-out duration

export default function Viewer360({ photos, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const [showHint,   setShowHint]   = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const current = photos[activeIndex]

  /* ── Three.js ──────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || window.innerWidth
    const h = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(FOV_START, w / h, 1, 1100)
    camera.position.set(0, 0, 0.1)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(w, h, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1)

    const texture  = new THREE.TextureLoader().load(current.src)
    texture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const sphere   = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const controls = new OrbitControls(camera, canvas)
    controls.enableZoom    = false
    controls.enablePan     = false
    controls.rotateSpeed   = -0.35
    controls.autoRotate    = true
    controls.autoRotateSpeed = 0.45
    controlsRef.current    = controls

    const zoomStart = Date.now()
    let animId: number

    const animate = () => {
      animId = requestAnimationFrame(animate)

      /* smooth FOV zoom-out on load */
      const elapsed = Date.now() - zoomStart
      if (elapsed < ZOOM_MS) {
        const t     = elapsed / ZOOM_MS
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
        camera.fov  = FOV_START + (FOV_END - FOV_START) * eased
        camera.updateProjectionMatrix()
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!canvas.parentElement) return
      const pw = canvas.parentElement.offsetWidth
      const ph = canvas.parentElement.offsetHeight
      camera.aspect = pw / ph
      camera.updateProjectionMatrix()
      renderer.setSize(pw, ph, false)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      controls.dispose()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
      controlsRef.current = null
    }
  }, [current.src])

  /* ── Body scroll lock ──────────────────────────────────────────── */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* ── Keyboard navigation ───────────────────────────────────────── */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')  setActiveIndex(i => (i - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % photos.length)
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose, photos.length])

  /* Canvas drag handlers */
  const handlePointerDown = (e: React.PointerEvent) => {
    setShowHint(false)
    setIsDragging(true)
    if (controlsRef.current) controlsRef.current.autoRotate = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerUp = () => setIsDragging(false)

  /* Nav button helpers — stop event from reaching the canvas drag handler */
  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i - 1 + photos.length) % photos.length)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i + 1) % photos.length)
  }
  const stopPtr = (e: React.PointerEvent) => e.stopPropagation()

  /* Shared style for the side blur panels */
  const sidePanel = (dir: 'left' | 'right'): React.CSSProperties => ({
    background: dir === 'left'
      ? 'linear-gradient(to right,  rgba(0,0,0,0.45) 0%, transparent 100%)'
      : 'linear-gradient(to left,   rgba(0,0,0,0.45) 0%, transparent 100%)',
    backdropFilter:         'blur(10px)',
    WebkitBackdropFilter:   'blur(10px)',
    maskImage:              dir === 'left'
      ? 'linear-gradient(to right, black 45%, transparent 100%)'
      : 'linear-gradient(to left,  black 45%, transparent 100%)',
    WebkitMaskImage:        dir === 'left'
      ? 'linear-gradient(to right, black 45%, transparent 100%)'
      : 'linear-gradient(to left,  black 45%, transparent 100%)',
  })

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-9999 bg-black flex flex-col"
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4 bg-black/60 backdrop-blur-sm border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-accent" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2c-2.5 3-4 6.4-4 10s1.5 7 4 10" />
              <path d="M12 2c2.5 3 4 6.4 4 10s-1.5 7-4 10" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-white font-medium text-sm leading-tight truncate">{current.label}</p>
            <p className="text-white/50 text-xs leading-tight mt-0.5 truncate">{current.description}</p>
          </div>
        </div>
        <button onClick={onClose} className="ml-4 shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all" aria-label="Chiudi">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-4 h-4" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Viewer ─────────────────────────────────────────────────── */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />

        {/* ── Left nav zone (blur panel + button) ─────────────────── */}
        {photos.length > 1 && (
          <div className="absolute left-0 inset-y-0 w-28 z-10 flex items-center">
            <div className="absolute inset-0 pointer-events-none" style={sidePanel('left')} />
            <button
              className="relative ml-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
              onClick={goPrev}
              onPointerDown={stopPtr}
              aria-label="Precedente"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Right nav zone (blur panel + button) ────────────────── */}
        {photos.length > 1 && (
          <div className="absolute right-0 inset-y-0 w-28 z-10 flex items-center justify-end">
            <div className="absolute inset-0 pointer-events-none" style={sidePanel('right')} />
            <button
              className="relative mr-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all"
              onClick={goNext}
              onPointerDown={stopPtr}
              aria-label="Successivo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Photo counter */}
        {photos.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/60 text-xs tabular-nums pointer-events-none select-none">
            {activeIndex + 1} / {photos.length}
          </div>
        )}

        {/* Drag hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 text-[13px] pointer-events-none select-none whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
              </svg>
              Trascina per esplorare
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────────────── */}
      {photos.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-black/60 backdrop-blur-sm border-t border-white/10 shrink-0">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setActiveIndex(i)}
              onPointerDown={stopPtr}
              className={`shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === activeIndex ? 'border-accent scale-105 opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
              aria-label={p.label}
            >
              <img src={p.src} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  )
}

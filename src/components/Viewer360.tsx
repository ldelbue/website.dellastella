import { useEffect, useState } from 'react'
import type React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'

export type Photo360 = {
  url: string
  label: string
  description: string
}

type Props = {
  photos: Photo360[]
  onClose: () => void
}

export default function Viewer360({ photos, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const current = photos[activeIndex]

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

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i - 1 + photos.length) % photos.length)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveIndex(i => (i + 1) % photos.length)
  }

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
      <div className="relative flex-1 overflow-hidden">
        <iframe
          key={current.url}
          src={current.url}
          className="absolute inset-0 w-full h-full border-0"
          allow="fullscreen; gyroscope; accelerometer"
          allowFullScreen
          title={current.label}
        />

        {/* ── Left nav ─────────────────────────────────────────────── */}
        {photos.length > 1 && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-sm"
            onClick={goPrev}
            aria-label="Precedente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* ── Right nav ────────────────────────────────────────────── */}
        {photos.length > 1 && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-sm"
            onClick={goNext}
            aria-label="Successivo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Room tab strip ──────────────────────────────────────────── */}
      {photos.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-black/60 backdrop-blur-sm border-t border-white/10 shrink-0">
          {photos.map((p, i) => (
            <button
              key={p.url}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === activeIndex
                  ? 'bg-accent text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  )
}
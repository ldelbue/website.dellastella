/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'

/* ── Types ────────────────────────────────────────────────────────────────── */

type MediaKind = 'image' | 'video'

export type MediaItemData = {
  src: string
  type?: MediaKind
  alt?: string
  /** Poster for video — also shown as thumbnail. */
  poster?: string
}

type RegistryEntry = {
  id: string
  src: string
  type: MediaKind
  alt?: string
  poster?: string
}

/* ── Context ─────────────────────────────────────────────────────────────── */

type GalleryCtx = {
  register: (id: string, item: MediaItemData) => void
  unregister: (id: string) => void
  open: (id: string) => void
  openByIndex: (index: number) => void
}

const GalleryContext = createContext<GalleryCtx | null>(null)

function useGalleryCtx() {
  const ctx = useContext(GalleryContext)
  if (!ctx) throw new Error('<MediaGallery.Item> must be inside <MediaGallery>')
  return ctx
}

/* ── Lightbox ─────────────────────────────────────────────────────────────── */

const ZOOM_STEP = 0.4
const ZOOM_MAX = 4

type LightboxProps = {
  items: RegistryEntry[]
  initialIndex: number
  onClose: () => void
}

function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const zoomRef = useRef(zoom)
  const panRef = useRef(pan)
  useLayoutEffect(() => {
    zoomRef.current = zoom
    panRef.current = pan
  })

  const current = items[index]
  const isZoomed = zoom > 1.01

  const navigate = useCallback((next: number) => {
    setIndex(next)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const goPrev = useCallback(
    () => navigate((index - 1 + items.length) % items.length),
    [index, items.length, navigate],
  )
  const goNext = useCallback(
    () => navigate((index + 1) % items.length),
    [index, items.length, navigate],
  )

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  /* Keyboard */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft'  && zoomRef.current <= 1.01) goPrev()
      if (e.key === 'ArrowRight' && zoomRef.current <= 1.01) goNext()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose, goPrev, goNext])

  /* Wheel zoom (non-passive) + touch pinch/swipe */
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      setZoom(z => Math.max(1, Math.min(ZOOM_MAX, z + (e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP))))
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    const ts = { dist: 0, startZoom: 1, swipeX: null as number | null }
    const touchDist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        ts.dist = touchDist(e.touches)
        ts.startZoom = zoomRef.current
        ts.swipeX = null
      } else if (e.touches.length === 1 && zoomRef.current <= 1.01) {
        ts.swipeX = e.touches[0].clientX
      }
    }
    const onMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || ts.dist === 0) return
      e.preventDefault()
      setZoom(Math.max(1, Math.min(ZOOM_MAX, ts.startZoom * (touchDist(e.touches) / ts.dist))))
    }
    const onEnd = (e: TouchEvent) => {
      if (ts.swipeX != null && e.changedTouches.length > 0 && zoomRef.current <= 1.01) {
        const dx = e.changedTouches[0].clientX - ts.swipeX
        if (Math.abs(dx) > 60) { if (dx < 0) goNext(); else goPrev() }
        ts.swipeX = null
      }
      if (e.touches.length === 0 && zoomRef.current < 1.1) {
        setZoom(1)
        setPan({ x: 0, y: 0 })
      }
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
  }, [goPrev, goNext])

  /* Pointer drag for panning when zoomed */
  const drag = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isZoomed) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { sx: e.clientX, sy: e.clientY, px: panRef.current.x, py: panRef.current.y }
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    setPan({ x: drag.current.px + e.clientX - drag.current.sx, y: drag.current.py + e.clientY - drag.current.sy })
  }
  const onPointerUp = () => { drag.current = null; setDragging(false) }

  const onDblClick = () => {
    if (isZoomed) { setZoom(1); setPan({ x: 0, y: 0 }) } else setZoom(2.5)
  }

  return createPortal(
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      style={{ cursor: isZoomed ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDblClick}
      onClick={(e) => { if (e.target === e.currentTarget && !isZoomed) onClose() }}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/75 hover:text-white transition-all"
        onClick={onClose}
        aria-label="Chiudi"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 rounded-pill bg-white/10 text-white/80 text-[13px] tabular-nums pointer-events-none select-none">
          {index + 1} / {items.length}
        </div>
      )}

      {/* Zoom level indicator */}
      {isZoomed && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-pill bg-white/10 text-white/60 text-xs pointer-events-none select-none">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Media */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transition: dragging ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {current.type === 'video' ? (
              <video
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                data-ready="true"
                className="max-w-[90vw] max-h-[90vh] rounded-lg"
                style={{ pointerEvents: 'all' }}
              />
            ) : (
              <img
                src={current.src}
                alt={current.alt ?? ''}
                draggable={false}
                className="max-w-[90vw] max-h-[90vh] object-contain"
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      {items.length > 1 && !isZoomed && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/22 flex items-center justify-center text-white/75 hover:text-white transition-all hover:-translate-x-0.5 hover:-translate-y-1/2"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Precedente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/22 flex items-center justify-center text-white/75 hover:text-white transition-all hover:translate-x-0.5 hover:-translate-y-1/2"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Successivo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </motion.div>,
    document.body,
  )
}

/* ── MediaGallery (root) ──────────────────────────────────────────────────── */

type GalleryProps = { children: ReactNode; className?: string }

function MediaGalleryRoot({ children, className }: GalleryProps) {
  const [items, setItems] = useState<RegistryEntry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const register = useCallback((id: string, item: MediaItemData) => {
    const entry: RegistryEntry = {
      id,
      src: item.src,
      type: item.type ?? 'image',
      alt: item.alt,
      poster: item.poster,
    }
    setItems(prev => prev.some(i => i.id === id) ? prev : [...prev, entry])
  }, [])

  const unregister = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const open = useCallback((id: string) => setActiveId(id), [])

  const openByIndex = useCallback((index: number) => {
    const item = items[index]
    if (item) setActiveId(item.id)
  }, [items])

  const activeIndex = activeId != null ? items.findIndex(i => i.id === activeId) : -1

  return (
    <GalleryContext.Provider value={{ register, unregister, open, openByIndex }}>
      {className ? <div className={className}>{children}</div> : <>{children}</>}
      <AnimatePresence>
        {activeId != null && activeIndex >= 0 && (
          <Lightbox
            key="lb"
            items={items}
            initialIndex={activeIndex}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </GalleryContext.Provider>
  )
}

/* ── MediaGallery.Item ────────────────────────────────────────────────────── */

type ItemProps = MediaItemData & { className?: string }

function GalleryItem({ src, type = 'image', alt, poster, className = '' }: ItemProps) {
  const id = useId()
  const { register, unregister, open } = useGalleryCtx()

  useEffect(() => {
    register(id, { src, type, alt, poster })
    return () => unregister(id)
  }, [id, src, type, alt, poster, register, unregister])

  return (
    <div
      className={`group relative overflow-hidden cursor-zoom-in ${className}`}
      role="button"
      tabIndex={0}
      aria-label={type === 'video' ? 'Apri video a schermo intero' : 'Apri immagine a schermo intero'}
      onClick={() => open(id)}
      onKeyDown={(e) => e.key === 'Enter' && open(id)}
    >
      {type === 'video' ? (
        <video
          poster={poster}
          muted
          playsInline
          data-ready="true"
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <img
          src={src}
          alt={alt ?? ''}
          draggable={false}
          className="w-full h-full object-cover"
        />
      )}
      {/* Expand hint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-ink" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ── Export ───────────────────────────────────────────────────────────────── */

export const MediaGallery = Object.assign(MediaGalleryRoot, { Item: GalleryItem })

export function useMediaGallery() {
  return useGalleryCtx()
}
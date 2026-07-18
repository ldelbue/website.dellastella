import { useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '../i18n'

type ImageSliderProps = {
  images: string[]
  /** CSS aspect-ratio (es. "16/10", "4/3"). Default "16/10". */
  aspectRatio?: string
  /** Alt-text per la i-esima immagine. */
  alt?: (index: number) => string
  /** Soglia in px (o momentum equivalente) per far scattare il cambio slide. */
  swipeThreshold?: number
  className?: string
}

const SLIDER_LABELS = {
  IT: {
    defaultAlt: (i: number) => `Immagine ${i + 1}`,
    prev: 'Immagine precedente',
    next: 'Immagine successiva',
    goto: (i: number) => `Vai all’immagine ${i + 1}`,
  },
  EN: {
    defaultAlt: (i: number) => `Image ${i + 1}`,
    prev: 'Previous image',
    next: 'Next image',
    goto: (i: number) => `Go to image ${i + 1}`,
  },
  DE: {
    defaultAlt: (i: number) => `Bild ${i + 1}`,
    prev: 'Vorheriges Bild',
    next: 'Nächstes Bild',
    goto: (i: number) => `Zu Bild ${i + 1} wechseln`,
  },
}

export default function ImageSlider({
  images,
  aspectRatio = '16/10',
  alt,
  swipeThreshold = 80,
  className = '',
}: ImageSliderProps) {
  const { lang } = useLang()
  const labels = SLIDER_LABELS[lang]
  const altText = alt ?? labels.defaultAlt
  const [index, setIndex] = useState(0)
  const total = images.length

  const next = () => setIndex((i) => (i + 1) % total)
  const prev = () => setIndex((i) => (i - 1 + total) % total)

  if (total === 0) return null

  return (
    <div className={`relative ${className}`}>
      <div
        className="group relative overflow-hidden rounded-card bg-brand-muted shadow-[0_20px_60px_rgba(22,36,42,0.10)] transition-shadow duration-700 hover:shadow-[0_30px_80px_rgba(22,36,42,0.18)]"
        style={{ aspectRatio }}
      >
        <motion.div
          className="flex h-full select-none"
          drag="x"
          dragElastic={0.15}
          dragConstraints={{ left: 0, right: 0 }}
          animate={{ x: `-${index * 100}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          onDragEnd={(_, info) => {
            const power = info.offset.x + info.velocity.x * 0.25
            if (power < -swipeThreshold) next()
            else if (power > swipeThreshold) prev()
          }}
          style={{ cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {images.map((src, i) => (
            <div key={src} className="flex-none w-full h-full relative">
              <img
                src={src}
                alt={altText(i)}
                draggable={false}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-[1400ms] ease-out"
              />
            </div>
          ))}
        </motion.div>

        <div className="absolute left-4 bottom-4 flex items-center gap-1.5 rounded-pill bg-white/85 backdrop-blur px-3 py-1 text-[11.5px] font-medium tracking-wide text-ink-soft border border-hairline">
          <span className="tabular-nums text-ink">{index + 1}</span>
          <span className="text-ink-soft/60">/</span>
          <span className="tabular-nums">{total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label={labels.prev}
        className="absolute left-3 md:-left-4 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-hairline shadow-nav hover:bg-white transition-transform hover:-translate-x-0.5 hover:-translate-y-1/2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5 text-ink"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={labels.next}
        className="absolute right-3 md:-right-4 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-hairline shadow-nav hover:bg-white transition-transform hover:translate-x-0.5 hover:-translate-y-1/2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5 text-ink"
          aria-hidden="true"
        >
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={labels.goto(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-8 bg-accent'
                : 'w-1.5 bg-ink-soft/30 hover:bg-ink-soft/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

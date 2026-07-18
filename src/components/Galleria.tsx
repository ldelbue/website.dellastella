import { useRef, useState } from 'react'
import { motion } from 'motion/react'

type GalleryItem = {
  src: string
  /** Se presente, viene riprodotto muto in loop passando col mouse sull'item. */
  video?: string
  /** Layout della cella nella griglia (default 1x1). */
  span?: 'wide' | 'tall' | 'large'
  alt?: string
}

/**
 * Gli item della galleria. Sostituisci le URL con foto/video veri quando disponibili.
 * `span` controlla come la cella occupa il mosaico su desktop.
 */
const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: 'https://picsum.photos/seed/gallery-1/1400/1000',
    span: 'large',
    video: 'https://www.dellastella.it/assets/battaglia-animeted-low.mp4',
    alt: 'Della Stella, vista principale',
  },
  { src: 'https://picsum.photos/seed/gallery-2/800/800', alt: 'Dettaglio 1' },
  {
    src: 'https://picsum.photos/seed/gallery-3/800/1200',
    span: 'tall',
    alt: 'Dettaglio verticale',
  },
  { src: 'https://picsum.photos/seed/gallery-4/800/800', alt: 'Dettaglio 2' },
  {
    src: 'https://picsum.photos/seed/gallery-5/1400/800',
    span: 'wide',
    video: 'https://www.dellastella.it/assets/battaglia-animeted-low.mp4',
    alt: 'Panoramica',
  },
  { src: 'https://picsum.photos/seed/gallery-6/800/800', alt: 'Dettaglio 3' },
  { src: 'https://picsum.photos/seed/gallery-7/800/800', alt: 'Dettaglio 4' },
]

const spanClasses: Record<NonNullable<GalleryItem['span']>, string> = {
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  large: 'md:col-span-2 md:row-span-2',
}

export default function Galleria() {
  return (
    <section
      id="galleria"
      aria-label="Galleria"
      className="relative w-full bg-white py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-14 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-brand-muted px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Galleria
          </span>
        </motion.div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-2 md:gap-3"
          style={{ gridAutoFlow: 'dense' }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryTile key={item.src} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

type GalleryTileProps = { item: GalleryItem; index: number }

function GalleryTile({ item, index }: GalleryTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      void video.play().catch(() => {
        /* autoplay bloccato o file non ancora pronto: ignora */
      })
    }
  }

  const handleLeave = () => {
    setHovered(false)
    const video = videoRef.current
    if (video) {
      video.pause()
    }
  }

  const spanClass = item.span ? spanClasses[item.span] : ''

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 4) * 0.06,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-card bg-brand-muted ${spanClass}`}
    >
      <img
        src={item.src}
        alt={item.alt ?? 'Della Stella'}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />

      {item.video && (
        <>
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onLoadedData={(e) => {
              ;(e.currentTarget as HTMLVideoElement).dataset.ready = 'true'
            }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-pill bg-white/85 backdrop-blur px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-ink border border-hairline pointer-events-none">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-accent"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Video
          </div>
        </>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  )
}
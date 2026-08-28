import type { ReactNode } from 'react'
import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import ImageSlider from '../shared/components/ImageSlider'
import { MediaGallery, useMediaGallery } from '../shared/components/MediaGallery'
import SimpleCard from '../shared/components/SimpleCard'
import { useT } from '../shared/i18n'
import type { Photo360 } from './Viewer360'

const Viewer360 = lazy(() => import('./Viewer360'))

const PHOTOS_360: Photo360[] = [
  {
    src: '/3d/camera1.webp',
    label: 'Camera matrimoniale',
    description: 'La camera da letto matrimoniale',
  },
  {
    src: '/3d/cucina.webp',
    label: 'Cucina',
    description: 'La cucina attrezzata',
  },
  {
    src: '/3d/bagno.webp',
    label: 'Bagno',
    description: 'Il bagno privato',
  },
  {
    src: '/3d/camera2.webp',
    label: 'Camera con letti singoli',
    description: 'La seconda camera da letto',
  },
]

const CASA_IMAGES: string[] = [
  'https://cdn.dellastella.it/assets/casa/camera1.1.webp',
  'https://cdn.dellastella.it/assets/casa/camera1.2.webp',
  'https://cdn.dellastella.it/assets/casa/camera1.3.webp',
  'https://cdn.dellastella.it/assets/casa/bagno.webp',

  'https://cdn.dellastella.it/assets/casa/cucina1.webp',


  'https://cdn.dellastella.it/assets/casa/camera2.1.webp',
  'https://cdn.dellastella.it/assets/casa/camera2.2.webp',
'https://cdn.dellastella.it/assets/casa/camera2.3.webp'
]

const iconStroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/**
 * Icone in ordine allineato a `t.casa.features` — titolo e descrizione arrivano
 * dai dizionari i18n.
 */
const FEATURE_ICONS: ReactNode[] = [
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M3 10.5L12 3l9 7.5V21H3z" />
    <path d="M9.5 21v-6h5v6" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
    <path d="M14 20c.3-2 1.7-3.5 3.5-3.5S21 18 21 20" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M3 20V9h18v11" />
    <path d="M3 15h18" />
    <path d="M7 9V6h4v3" />
    <path d="M13 9V6h4v3" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
    <path d="M9 6h3" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <rect x="4" y="10" width="16" height="10" rx="1.5" />
    <path d="M8 14h.01M12 14h.01M16 14h.01" />
    <path d="M7 10V6a1 1 0 0 1 1-1h2" />
    <path d="M14 5h3a1 1 0 0 1 1 1v4" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M12 3v18" />
    <path d="M6 8l6-3 6 3" />
    <path d="M6 16l6 3 6-3" />
    <path d="M3 12h18" />
  </svg>,
]

export default function Casa() {
  const t = useT()
  const [show360, setShow360] = useState(false)

  return (
    <section
      id="casa"
      aria-label={t.casa.aria}
      className="relative bg-brand py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <Suspense>
        <AnimatePresence>
          {show360 && (
            <Viewer360
              photos={PHOTOS_360}
              onClose={() => setShow360(false)}
            />
          )}
        </AnimatePresence>
      </Suspense>

      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.casa.badge}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
              {t.casa.headingLead}{' '}
              <span className="text-accent">{t.casa.headingAccent}</span>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="sm:pt-1 shrink-0"
          >
            <button
              onClick={() => setShow360(true)}
              className="inline-flex items-center gap-2.5 rounded-pill bg-accent text-white px-5 py-2.5 text-sm font-medium hover:bg-accent/85 active:scale-95 transition-all shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2c-2.5 3-4 6.4-4 10s1.5 7 4 10" />
                <path d="M12 2c2.5 3 4 6.4 4 10s-1.5 7-4 10" />
              </svg>
              {t.casa.view3dBtn}
            </button>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
          <MediaGallery>
            <CasaGallerySlider images={CASA_IMAGES} altFn={(i) => t.casa.photoAlt(i)} />
          </MediaGallery>
        </motion.div>


          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {t.casa.features.map((f, i) => (
                <SimpleCard
                  key={i}
                  icon={FEATURE_ICONS[i]}
                  title={f.title}
                  description={f.description}
                  delay={(i % 3) * 0.1}
                />
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  )
}

type CasaGallerySliderProps = {
  images: string[]
  altFn: (i: number) => string
}

function CasaGallerySlider({ images, altFn }: CasaGallerySliderProps) {
  const { openByIndex } = useMediaGallery()
  return (
    <>
      <div className="hidden" aria-hidden="true">
        {images.map((src, i) => (
          <MediaGallery.Item key={src} src={src} alt={altFn(i)} />
        ))}
      </div>
      <ImageSlider
        images={images}
        alt={altFn}
        onImageClick={openByIndex}
      />
    </>
  )
}
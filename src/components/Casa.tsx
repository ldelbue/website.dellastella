import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import ImageSlider from '../shared/components/ImageSlider'
import SimpleCard from '../shared/components/SimpleCard'

/**
 * Immagini della casa. Sostituisci le URL con quelle vere quando disponibili.
 * L'ordine è quello del carosello.
 */
const CASA_IMAGES: string[] = [
  'https://picsum.photos/seed/dellastella-1/1600/1000',
  'https://picsum.photos/seed/dellastella-2/1600/1000',
  'https://picsum.photos/seed/dellastella-3/1600/1000',
  'https://picsum.photos/seed/dellastella-4/1600/1000',
  'https://picsum.photos/seed/dellastella-5/1600/1000',
]

type Feature = {
  title: string
  description: string
  icon: ReactNode
}

const iconStroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const CASA_FEATURES: Feature[] = [
  {
    title: 'Intera casa per te',
    description:
      'Nessuna condivisione: gli spazi sono solo per te e per chi viaggia con te.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <path d="M3 10.5L12 3l9 7.5V21H3z" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    ),
  },
  {
    title: '4 posti letto',
    description:
      'Perfetta per famiglie o piccoli gruppi di amici fino a quattro persone.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="10" r="2.4" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <path d="M14 20c.3-2 1.7-3.5 3.5-3.5S21 18 21 20" />
      </svg>
    ),
  },
  {
    title: 'Due camere separate',
    description:
      'Una matrimoniale e una con due letti singoli — spazi indipendenti per tutti.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <path d="M3 20V9h18v11" />
        <path d="M3 15h18" />
        <path d="M7 9V6h4v3" />
        <path d="M13 9V6h4v3" />
      </svg>
    ),
  },
  {
    title: 'Bagno privato',
    description:
      'Doccia calda in ogni stagione, biancheria fresca e prodotti di benvenuto.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
        <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
        <path d="M9 6h3" />
      </svg>
    ),
  },
  {
    title: 'Cucina attrezzata',
    description:
      'Pentole, stoviglie, elettrodomestici e macchina del caffè: tutto pronto all’uso.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <rect x="4" y="10" width="16" height="10" rx="1.5" />
        <path d="M8 14h.01M12 14h.01M16 14h.01" />
        <path d="M7 10V6a1 1 0 0 1 1-1h2" />
        <path d="M14 5h3a1 1 0 0 1 1 1v4" />
      </svg>
    ),
  },
  {
    title: 'Clima e riscaldamento',
    description:
      'Temperatura sempre nel giusto: aria fresca d’estate, calore avvolgente d’inverno.',
    icon: (
      <svg {...iconStroke} className="w-5 h-5">
        <path d="M12 3v18" />
        <path d="M6 8l6-3 6 3" />
        <path d="M6 16l6 3 6-3" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
]

export default function Casa() {
  return (
    <section
      id="casa"
      aria-label="La casa"
      className="relative bg-brand py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            La Casa
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
            Ogni angolo è pensato per{' '}
            <span className="text-accent">farti sentire a casa</span>.
          </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
            <ImageSlider
                images={CASA_IMAGES}
                alt={(i) => `Della Stella, foto ${i + 1}`}
            />
        </motion.div>


          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {CASA_FEATURES.map((f, i) => (
                <SimpleCard
                  key={f.title}
                  icon={f.icon}
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

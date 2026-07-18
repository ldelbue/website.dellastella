import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

type Place = {
  title: string
  subtitle: string
  image: string
}

/**
 * Le 4 mete del territorio. Sostituisci le URL con foto vere quando disponibili.
 */
const TERRITORIO_PLACES: Place[] = [
  {
    title: 'Cascate Capelli di Venere',
    subtitle: 'Un salto d’acqua tra le rocce del Cilento',
    image: 'https://picsum.photos/seed/cascate-capelli-di-venere/1200/1500',
  },
  {
    title: 'Parco Nazionale del Cilento',
    subtitle: 'Sentieri, boschi e antichi silenzi',
    image: 'https://picsum.photos/seed/parco-cilento/1200/1500',
  },
  {
    title: 'Golfo di Policastro',
    subtitle: 'Il mare a mezz’ora dalla casa',
    image: 'https://picsum.photos/seed/golfo-policastro/1200/1500',
  },
  {
    title: 'Certosa di Padula',
    subtitle: 'Un capolavoro barocco da attraversare',
    image: 'https://picsum.photos/seed/certosa-padula/1200/1500',
  },
]

export default function Territorio() {
  return (
    <section
      id="territorio"
      aria-label="Il territorio"
      className="relative bg-white w-full py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-brand-muted px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Il Territorio
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
            Un passo fuori dalla casa,{' '}
            <span className="text-accent">il Cilento tutto intorno</span>.
          </h2>
          <p className="mt-5 text-ink-soft text-base md:text-[17px] leading-relaxed max-w-xl">
            Boschi, cascate, mare e monasteri: le tappe che non puoi mancare,
            tutte raggiungibili in giornata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TERRITORIO_PLACES.map((place, i) => (
            <TerritorioCard key={place.title} {...place} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

type TerritorioCardProps = Place & { index: number }

function TerritorioCard({ title, subtitle, image, index }: TerritorioCardProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Colonna sinistra (index 0,2) entra prima, colonna destra (index 1,3) con un
  // leggero ritardo — così le card della stessa riga non appaiono simultanee.
  const stagger = index % 2 === 0 ? 0 : 0.06

  const opacity = useTransform(
    scrollYProgress,
    [0.1 + stagger, 0.3 + stagger, 0.7 - stagger, 0.9 - stagger],
    [0, 1, 1, 0],
  )
  const y = useTransform(
    scrollYProgress,
    [0.1 + stagger, 0.3 + stagger, 0.7 - stagger, 0.9 - stagger],
    [30, 0, 0, -30],
  )

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y }}
      className="group relative  overflow-hidden rounded-card aspect-[4/5] shadow-[0_28px_60px_rgba(22,36,42,0.18)]"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/40 to-transparent"
      />

      <div className="absolute  inset-x-0 bottom-0 p-6 md:p-8 text-white">
        <h3 className="font-heading text-2xl md:text-3xl leading-tight mb-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-md">
          {subtitle}
        </p>
      </div>
    </motion.article>
  )
}
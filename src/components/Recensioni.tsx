import { motion } from 'motion/react'
import { useT } from '../shared/i18n'

type Review = {
  stars: number
  text: string
  author: string
}

const REVIEWS: Review[] = [
  {
    stars: 5,
    text: "Appartamento accogliente e spazioso, situato in un borgo tranquillo, nella piazzetta della chiesa, con posteggio auto vicino. L'host gentile e disponibile ci ha accolto di persona. Abbiamo soggiornato bene e ci torneremmo volentieri.",
    author: 'Fabio Almasio',
  },
  {
    stars: 5,
    text: "Chiunque sia alla ricerca dell'Italia autentica, ami la pace e la tranquillità, apprezzi le escursioni nella natura incontaminata e la cordialità dei padroni di casa, troverà in Casa Vacanza della Stella il luogo ideale dove soggiornare. La casa vacanze si trova direttamente sul sentiero escursionistico del San Nilo e le splendide cascate dei Capelli di Venere sono facilmente raggiungibili a piedi (circa 20 minuti). Tutto è tenuto in modo impeccabile e pulito. Ci piacerebbe molto tornare!",
    author: 'Michael S.',
  },
  {
    stars: 5,
    text: 'Bellissima esperienza, camera che affaccia nella piazzetta super carina ed accogliente, un’esperienza molto bella e posto tranquillo e comodo anche per il parcheggio e per rilassarti seduto sulle panchine in piazzetta ascoltando il cinguettio delle rondini. Sicuramente ci tornerò, e per concludere complimenti ai padroni di casa, molto gentili e disponibili per qualsiasi cosa.',
    author: 'Regina Rivelli',
  },
]

export default function Recensioni() {
  const t = useT()

  return (
    <section
      id="recensioni"
      aria-label={t.recensioni.aria}
      className="relative bg-brand py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.recensioni.badge}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
              {t.recensioni.headingLead}{' '}
              <span className="text-accent">{t.recensioni.headingAccent}</span>.
            </h2>
          </motion.div>

          <motion.a
            href="https://www.google.com/maps/place/Della+Stella+Casa+Vacanza/@40.1478485,15.6232064,15z/data=!4m8!3m7!1s0x133ed3003d9b6613:0x863860605b6e6de9!8m2!3d40.1478485!4d15.6232064!9m1!1b1!16s%2Fg%2F11mktv_2w2?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="inline-flex items-center gap-2.5 self-start md:self-auto rounded-pill bg-white px-4 py-2 text-[13px] font-medium text-ink border border-hairline shadow-[0_6px_20px_rgba(22,36,42,0.06)] hover:shadow-[0_10px_28px_rgba(22,36,42,0.10)] transition-shadow"
          >
            <GoogleGIcon />
            <span>{t.recensioni.verifiedGoogle}</span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.author} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

type ReviewCardProps = { review: Review; index: number }

function ReviewCard({ review, index }: ReviewCardProps) {
  const t = useT()
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -3 }}
      className="relative flex flex-col rounded-card bg-white border border-hairline p-6 md:p-7 shadow-[0_8px_28px_rgba(22,36,42,0.05)]"
    >
      <div
        className="flex items-center gap-0.5 mb-5"
        aria-label={t.recensioni.starsAria(review.stars)}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < review.stars ? 'text-accent' : 'text-ink-soft/20'
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-ink text-[14.5px] md:text-[15px] leading-relaxed">
        <span
          aria-hidden="true"
          className="font-heading text-accent text-3xl leading-none mr-1 align-[-0.15em]"
        >
          “
        </span>
        {review.text}
      </blockquote>

      <footer className="mt-6 pt-5 border-t border-hairline">
        <p className="text-[13.5px] font-medium text-ink">{review.author}</p>
      </footer>
    </motion.article>
  )
}

function GoogleGIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}
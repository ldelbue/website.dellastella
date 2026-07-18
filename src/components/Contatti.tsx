import { motion } from 'motion/react'

const CTA_BG_IMAGE = 'https://picsum.photos/seed/capelli-di-venere/1800/1000'

const WHATSAPP_URL = 'https://wa.me/393715982508'
const EMAIL = 'info@dellastella.it'

type Distance = { name: string; time: string }

const DISTANCES: Distance[] = [
  { name: 'Cascate Capelli di Venere', time: '5 min' },
  { name: 'Sentieri & natura', time: '1 min' },
  { name: 'Mare (Sapri)', time: '25 min' },
  { name: 'Aeroporto di Napoli', time: '2 h' },
]

const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Della+Stella+Casa+Vacanza,+Casaletto+Spartano&hl=it&z=14&output=embed'

const MAP_LINK_URL =
  'https://www.google.com/maps/place/Della+Stella+Casa+Vacanza/@40.1478485,15.6232064,15z'

export default function Contatti() {
  return (
    <section
      id="contatti"
      aria-label="Contatti e come arrivare"
      className="relative bg-white py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10 flex flex-col gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-card overflow-hidden shadow-[0_30px_70px_rgba(22,36,42,0.22)]"
        >
          <img
            src={CTA_BG_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent"
          />

          <div className="relative flex flex-col items-center gap-4 text-center px-6 py-20 md:px-16 md:py-28">
            <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-white/80">
              Della Stella
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-white max-w-2xl">
              Pronti a partire?
            </h2>
            <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-md mb-4">
              Scrivici per disponibilità, tariffe e per costruire insieme il
              tuo soggiorno.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-pill bg-[#25d366] text-white font-semibold text-[15px] shadow-[0_10px_28px_rgba(37,211,102,0.35)] hover:brightness-95 hover:-translate-y-0.5 transition"
              >
                <WhatsAppIcon />
                Scrivici su WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-pill border border-white/50 text-white font-semibold text-[15px] backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition"
              >
                <EmailIcon />
                Invia una email
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Come arrivare
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] tracking-tight text-ink mb-8">
              Battaglia di{' '}
              <span className="text-accent">Casaletto Spartano</span>.
            </h2>

            <ul className="flex flex-col border-t border-hairline">
              {DISTANCES.map((d, i) => (
                <motion.li
                  key={d.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.06,
                  }}
                  className="flex items-center justify-between py-4 border-b border-hairline"
                >
                  <span className="flex items-center gap-3 text-ink">
                    <PinIcon />
                    <span className="text-[15px] md:text-[15.5px]">
                      {d.name}
                    </span>
                  </span>
                  <span className="text-[13px] md:text-[13.5px] font-semibold tabular-nums text-ink-soft">
                    {d.time}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apri Della Stella su Google Maps"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="group relative block rounded-card overflow-hidden h-[380px] md:h-[440px] shadow-[0_20px_50px_rgba(22,36,42,0.12)] border border-hairline"
          >
            <iframe
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Della Stella"
              className="w-full h-full border-0"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-transparent group-hover:bg-ink/10 transition-colors duration-300 pointer-events-none"
            />
            <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-pill bg-white/95 backdrop-blur px-3 py-1.5 text-[12px] font-semibold text-ink border border-hairline shadow-nav pointer-events-none">
              Apri su Google Maps
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M7 17L17 7M9 7h8v8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.75.46 3.47 1.32 4.98L2 22l5.19-1.36c1.46.79 3.11 1.21 4.85 1.21 5.5 0 9.97-4.47 9.97-9.97S17.54 2 12.04 2zm5.85 14.09c-.25.7-1.47 1.34-2.03 1.43-.53.07-1.19.11-1.93-.12-.44-.14-1.01-.32-1.74-.63-3.07-1.31-5.07-4.39-5.22-4.59-.15-.2-1.24-1.63-1.24-3.11 0-1.48.79-2.2 1.07-2.5.28-.3.6-.37.81-.37h.58c.19 0 .43-.07.68.51.25.6.85 2.08.92 2.23.07.15.12.32.02.53-.09.2-.14.33-.27.5-.14.17-.28.38-.4.51-.14.15-.29.31-.14.6.14.28.63 1.05 1.35 1.7.93.84 1.71 1.1 2 1.24.28.14.44.11.6-.07.16-.18.68-.8.87-1.08.18-.28.36-.24.6-.14.24.11 1.55.73 1.83.86.28.14.47.21.53.32.06.11.06.63-.19 1.34z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path
        d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
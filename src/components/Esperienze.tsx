import { motion } from 'motion/react'
import { useT } from '../shared/i18n'

export default function Esperienze() {
  const t = useT()

  return (
    <section
      id="esperienze"
      aria-label={t.esperienze.aria}
      className="relative bg-brand-muted py-24 md:py-32 overflow-hidden min-h-svh flex flex-col justify-center"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-[30%] w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-[-8%] w-[28rem] h-[28rem] rounded-full bg-accent-soft/10 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-350 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t.esperienze.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
            {t.esperienze.headingLead}{' '}
            <span className="text-accent">{t.esperienze.headingAccent}</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline">
          {t.esperienze.items.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className="group  flex items-center gap-5 md:gap-6 bg-brand-muted p-6 md:p-8 min-h-35 transition-colors duration-500 ease-out hover:bg-brand"
            >
              <span className="font-mono tabular-nums text-accent text-4xl md:text-5xl leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-xl md:text-2xl text-ink leading-tight tracking-tight">
                {label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

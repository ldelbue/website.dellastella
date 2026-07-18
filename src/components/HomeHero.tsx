import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useT } from '../shared/i18n'

type HomeHeroProps = {
  animateIn: boolean
}

export default function HomeHero({ animateIn }: HomeHeroProps) {
  const t = useT()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const contentY = useTransform(scrollYProgress, [0, 0.12], [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const reveal = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="top"
      aria-label={t.hero.aria}
      className="relative isolate overflow-hidden min-h-svh flex items-center justify-center bg-brand pt-28 md:pt-32 pb-16 md:pb-20 px-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(58,154,160,0.28),transparent_55%),radial-gradient(90%_60%_at_50%_110%,rgba(31,122,130,0.18),transparent_60%)]"
      />

      <svg
        aria-hidden="true"
        className="hidden md:block absolute top-24 left-[8%] w-6 text-accent/40 -z-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden md:block absolute bottom-28 right-[12%] w-4 text-accent-soft/50 -z-10"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
      </svg>

      <motion.div
        initial="hidden"
        animate={animateIn ? 'show' : 'hidden'}
        transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
        style={{ y: reduceMotion ? 0 : contentY, opacity: reduceMotion ? 1 : contentOpacity }}
        className="relative w-full max-w-3xl flex flex-col items-center text-center gap-7 md:gap-9"
      >
        <motion.span variants={reveal} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline">
          <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
          </svg>
          {t.hero.badge}
        </motion.span>

        <motion.div variants={reveal} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-5 md:gap-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-ink">
            {t.hero.headingLead}{' '}
            <span className="text-accent">{t.hero.headingAccent}</span>.
          </h1>
          <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
            {t.hero.description}
          </p>
        </motion.div>

        <motion.div variants={reveal} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13.5px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="flex text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
                </svg>
              ))}
            </span>
            <span className="font-semibold text-ink">5</span>
            <span>{t.hero.reviewsCount}</span>
          </span>
          <span className="hidden sm:inline text-hairline">•</span>
          <span>{t.hero.guestsUpTo}</span>
          <span className="hidden sm:inline text-hairline">•</span>
          <span>{t.hero.flexibleCheckIn}</span>
        </motion.div>

        <motion.div variants={reveal} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
          <a
            href="#disponibilita"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill bg-accent text-white font-semibold text-[15px] shadow-[0_12px_30px_rgba(31,122,130,.24)] hover:bg-accent-soft hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(31,122,130,.3)] active:scale-[.98] transition-all duration-300"
          >
            {t.hero.verifyAvailability}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#casa"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-pill bg-white/70 backdrop-blur text-ink font-semibold text-[15px] border border-hairline hover:bg-white hover:-translate-y-1 active:scale-[.98] transition-all duration-300"
          >
            {t.hero.discoverHouse}
          </a>
        </motion.div>

        <motion.ul variants={reveal} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[12.5px] text-ink-soft">
          {t.hero.features.map((f, i) => (
            <motion.li
              key={f}
              animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * .3, ease: 'easeInOut' }}
              className="rounded-pill bg-brand-muted/70 px-3 py-1 border border-hairline"
            >
              {f}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <a
        href="#battaglia"
        aria-label={t.hero.scrollDownAria}
        className="group absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-soft/80 hover:text-ink transition-colors"
      >
        <span className="text-[10.5px] tracking-[0.22em] uppercase font-medium">{t.hero.scroll}</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-ink-soft/40 pt-1.5">
          <span className="block h-2 w-0.75 rounded-full bg-ink-soft/70 animate-[scrollDot_1.6s_ease-in-out_infinite]" />
        </span>
      </a>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

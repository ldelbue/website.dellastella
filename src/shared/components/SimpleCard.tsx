import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type SimpleCardProps = {
  icon: ReactNode
  title: string
  description: string
  /** Ritardo (s) dell'entry animation. Utile per staggerare in una griglia. */
  delay?: number
  className?: string
}

export default function SimpleCard({
  icon,
  title,
  description,
  delay = 0,
  className = '',
}: SimpleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -8, scale: 1.015 }}
      whileTap={{ scale: .99 }}
      className={`group relative overflow-hidden rounded-card bg-white border border-hairline p-5 md:p-6 shadow-[0_8px_28px_rgba(22,36,42,0.05)] transition-shadow duration-500 hover:shadow-[0_24px_55px_rgba(22,36,42,0.12)] ${className}`}
    >
      <div aria-hidden="true" className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-accent/8 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out" />
      <div className="relative w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center mb-4 text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="font-heading text-lg md:text-xl text-ink mb-1.5 leading-snug">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-ink-soft leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

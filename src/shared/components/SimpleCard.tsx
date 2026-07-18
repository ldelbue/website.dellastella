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
      whileHover={{ y: -3 }}
      className={`rounded-card bg-white border border-hairline p-5 md:p-6 shadow-[0_8px_28px_rgba(22,36,42,0.05)] ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-brand-muted flex items-center justify-center mb-4 text-accent">
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
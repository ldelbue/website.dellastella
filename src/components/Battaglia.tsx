import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { battagliaVideoUrl } from '../shared/video'
import { useT } from '../shared/i18n'

const VIDEO_URL = battagliaVideoUrl()

/**
 * Video sizing knobs.
 * - Above VIDEO_MAX_WIDTH_PX viewport: video capped at MAX (extra space on the
 *   left stays bg-white, animation anchored bottom-right).
 * - Between MIN and MAX: video width follows the viewport 1:1.
 * - Below VIDEO_MIN_WIDTH_PX viewport: video stops shrinking; the overflow on
 *   the left is clipped by the section's overflow-hidden, so the animation on
 *   the bottom-right stays visible.
 */
const VIDEO_MAX_WIDTH_PX = 1800
const VIDEO_MIN_WIDTH_PX = 225

const range = (p: number, from: number, to: number) => {
  if (p <= from) return 0
  if (p >= to) return 1
  return (p - from) / (to - from)
}

const reveal = (p: number, from: number, to: number): CSSProperties => {
  const t = range(p, from, to)
  return {
    opacity: t,
    transform: `translateY(${(1 - t) * 28}px)`,
    willChange: 'opacity, transform',
  }
}

export default function Battaglia() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const scrollable = section.offsetHeight - window.innerHeight
        if (scrollable <= 0) return
        const p = Math.max(0, Math.min(1, -rect.top / scrollable))
        setProgress(p)
        const video = videoRef.current
        if (video) {
          const d = video.duration
          if (Number.isFinite(d) && d > 0) {
            try {
              video.currentTime = p * d
            } catch {
              /* transient seek noise */
            }
          }
        }
      })
    }

    const video = videoRef.current
    const onLoaded = () => {
      if (video) video.dataset.ready = 'true'
      update()
    }
    video?.addEventListener('loadeddata', onLoaded)
    if (video && video.readyState >= 2) onLoaded()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      cancelAnimationFrame(raf)
      video?.removeEventListener('loadeddata', onLoaded)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      id="battaglia"
      ref={sectionRef}
      aria-label={t.battaglia.aria}
      className="relative bg-white w-full isolate"
      style={{ height: '280vh' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 md:h-40 bg-linear-to-b from-brand to-white pointer-events-none z-20"
      />

      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute right-0 bottom-0 object-cover"
              style={{
                width: `clamp(${VIDEO_MIN_WIDTH_PX}px, 100vw, ${VIDEO_MAX_WIDTH_PX}px)`,
                height: 'calc(100% + 2px)',
                right: '-1px',
                bottom: '-1px',
                objectFit: 'cover',
                objectPosition: 'right bottom',
                backgroundColor: 'transparent',
                transform: 'translateZ(0)',
              }}
          />
        </div>

        <div
          aria-hidden="true"
          className="md:hidden absolute inset-0 bg-white/55 backdrop-blur-[2px] z-1 pointer-events-none"
        />

        <div className="relative z-10 h-full w-full mx-auto max-w-350 flex items-center">
          <div className="w-full max-w-xl px-6 md:pl-12 lg:pl-20">
            <span
              style={reveal(progress, 0.0, 0.08)}
              className="inline-flex self-start items-center gap-2 rounded-pill bg-white/80 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-4 md:mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.battaglia.badge}
            </span>

            <h2
              style={reveal(progress, 0.06, 0.2)}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight text-ink mb-4 md:mb-7"
            >
              {t.battaglia.headingLead}{' '}
              <span className="text-accent">{t.battaglia.headingAccent}</span>.
            </h2>

            <div className="flex flex-col gap-4 text-[15px] md:text-[17px] text-ink leading-relaxed">
              <p style={reveal(progress, 0.22, 0.4)}>{t.battaglia.p1}</p>
              <p style={reveal(progress, 0.42, 0.6)}>{t.battaglia.p2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
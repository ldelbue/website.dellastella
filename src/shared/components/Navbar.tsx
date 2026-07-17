import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export type NavPosition = 'left' | 'center' | 'right'

export type NavItemCtx = { atTop: boolean; inMobileMenu: boolean }

export type NavItem = {
  id: string
  label?: ReactNode
  href?: string
  onClick?: () => void
  position?: NavPosition
  className?: string
  render?: ReactNode | ((ctx: NavItemCtx) => ReactNode)
}

interface NavbarProps {
  items: NavItem[]
  brand?: ReactNode
  hideOnScrollDown?: boolean
  alwaysVisibleAtTop?: boolean
  topThreshold?: number
}

export default function Navbar({
  items,
  brand,
  hideOnScrollDown = false,
  alwaysVisibleAtTop = true,
  topThreshold = 40,
}: NavbarProps) {
  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setAtTop(y < topThreshold)

      if (hideOnScrollDown) {
        const scrollingDown = y > lastY.current
        const belowSafeZone = alwaysVisibleAtTop ? y > topThreshold : y > 40
        setHidden(scrollingDown && belowSafeZone)
      } else {
        setHidden(false)
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [hideOnScrollDown, alwaysVisibleAtTop, topThreshold])

  // Close mobile menu on resize to lg breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const left = items.filter((i) => (i.position ?? 'left') === 'left')
  const center = items.filter((i) => i.position === 'center')
  const right = items.filter((i) => i.position === 'right')

  const renderItem = (i: NavItem, inMobileMenu = false) => {
    if (i.render) {
      const content =
        typeof i.render === 'function'
          ? i.render({ atTop, inMobileMenu })
          : i.render
      if (content == null || content === false) return null
      return (
        <div key={i.id} className={inMobileMenu ? 'w-full' : 'flex items-center'}>
          {content}
        </div>
      )
    }
    return (
      <a
        key={i.id}
        href={i.href ?? '#'}
        onClick={(e) => {
          if (i.onClick) {
            e.preventDefault()
            i.onClick()
          }
          setMobileOpen(false)
        }}
        className={
          i.className ??
          (inMobileMenu
            ? 'block px-3.5 py-3 rounded-lg text-[15px] font-medium text-ink hover:bg-brand-muted transition-colors'
            : "relative text-[14.5px] font-medium text-ink/75 hover:text-ink py-1 whitespace-nowrap transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-0 after:bg-accent hover:after:w-full after:transition-all")
        }
      >
        {i.label}
      </a>
    )
  }

  return (
    <nav
      className={`fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-1.5rem)] lg:w-auto max-w-[calc(100vw-1.5rem)] flex items-center justify-between gap-3 md:gap-5 lg:gap-7 pl-3 pr-2 md:pl-5 md:pr-2.5 py-1.5 md:py-2 rounded-full bg-white text-ink border border-ink/8 shadow-[0_6px_24px_rgba(22,36,42,0.06)] transition-transform duration-300
        ${hidden ? '-translate-y-[calc(100%+28px)]' : 'translate-y-0'}`}
    >
      {brand && <div className="shrink-0 min-w-0 truncate">{brand}</div>}

      <div className="hidden lg:flex items-center gap-6 xl:gap-7">
        {[...left, ...center].map((i) => renderItem(i))}
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {right.map((i) => renderItem(i))}

        <button
          type="button"
          aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={mobileOpen}
          className="lg:hidden w-9 h-9 -mr-0.5 flex items-center justify-center rounded-full text-ink hover:bg-brand-muted transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="w-5 h-5"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (() => {
        const mainItems = [...left, ...center]
          .map((i) => renderItem(i, true))
          .filter(Boolean)
        const rightItems = right
          .map((i) => renderItem(i, true))
          .filter(Boolean)
        if (mainItems.length === 0 && rightItems.length === 0) return null
        return (
          <div className="lg:hidden absolute top-[calc(100%+10px)] left-0 right-0 flex flex-col gap-1 bg-white rounded-2xl p-2.5 shadow-[0_12px_32px_rgba(22,36,42,0.10)] border border-ink/8 text-ink">
            {mainItems}
            {rightItems.length > 0 && (
              <div className="mt-1 pt-2 border-t border-ink/8 flex flex-col gap-2 px-1">
                {rightItems}
              </div>
            )}
          </div>
        )
      })()}
    </nav>
  )
}
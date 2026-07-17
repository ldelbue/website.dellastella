import { useState } from 'react'
import Navbar from '../shared/components/Navbar'
import type { NavItem } from '../shared/components/Navbar'

type Lang = 'IT' | 'EN' | 'DE'
const LANGS: Lang[] = ['IT', 'EN', 'DE']

export default function Home() {
  const [lang, setLang] = useState<Lang>('IT')

  const brand = (
    <a
      href="#top"
      className="flex items-center gap-2 font-semibold whitespace-nowrap text-ink"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-accent shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l2.39 6.96L21.5 9.3l-5.6 4.3 2.05 7.1L12 16.9 6.05 20.7l2.05-7.1-5.6-4.3 7.11-.34L12 2z" />
      </svg>
      <span className="font-heading text-[19px] md:text-[24px] leading-none tracking-tight">
        Della Stella
      </span>
    </a>
  )

  const items: NavItem[] = [
    { id: 'casa',       label: 'La Casa',       href: '#casa',       position: 'center' },
    { id: 'territorio', label: 'Il Territorio', href: '#territorio', position: 'center' },
    { id: 'esperienze', label: 'Esperienze',    href: '#esperienze', position: 'center' },
    { id: 'galleria',   label: 'Galleria',      href: '#galleria',   position: 'center' },
    { id: 'contatti',   label: 'Contatti',      href: '#contatti',   position: 'center' },
    {
      id: 'lang',
      position: 'right',
      render: ({ inMobileMenu }) => (
        <div
          role="group"
          aria-label="Lingua"
          className={`${
            inMobileMenu
              ? 'flex w-full justify-center'
              : 'hidden min-[440px]:flex'
          } gap-0.5 rounded-full p-0.5 bg-brand-muted`}
        >
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`text-[12.5px] font-semibold tracking-wide px-3 py-1 rounded-full transition-colors ${
                lang === l
                  ? 'bg-white text-accent shadow-sm'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      ),
    },
    {
      id: 'disponibilita',
      position: 'right',
      render: ({ inMobileMenu }) => {
        if (inMobileMenu) {
          return (
            <a
              href="#disponibilita"
              className="block w-full text-center text-[15px] font-semibold px-4 py-2.5 rounded-full bg-accent text-white hover:bg-accent-soft transition-colors"
            >
              Disponibilità
            </a>
          )
        }
        return (
          <a
            href="#disponibilita"
            className="hidden min-[360px]:inline-flex text-[13px] md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent text-white hover:bg-accent-soft transition-colors whitespace-nowrap"
          >
            Disponibilità
          </a>
        )
      },
    },
  ]

  return (
    <>
      <Navbar
        items={items}
        brand={brand}
        hideOnScrollDown
        alwaysVisibleAtTop
      />
      <div className="flex items-center justify-center h-screen bg-brand px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-ink text-center">
          Della Stella!
        </h1>
      </div>
    </>
  )
}
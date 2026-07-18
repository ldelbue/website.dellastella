import Navbar from '../shared/components/Navbar'
import type { NavItem } from '../shared/components/Navbar'
import HomeHero from '../components/HomeHero'
import Battaglia from '../components/Battaglia'
import Casa from '../components/Casa'
import Territorio from '../components/Territorio'
import Esperienze from '../components/Esperienze'
import Galleria from '../components/Galleria'
import Recensioni from '../components/Recensioni'
import Contatti from '../components/Contatti'
import Footer from '../shared/components/Footer'
import { LangProvider, LANGS, useLang, useT } from '../shared/i18n'

export default function Home() {
  return (
    <LangProvider>
      <HomeInner />
    </LangProvider>
  )
}

function HomeInner() {
  const { lang, setLang } = useLang()
  const t = useT()

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
    { id: 'casa',       label: t.nav.casa,       href: '#casa',       position: 'center' },
    { id: 'territorio', label: t.nav.territorio, href: '#territorio', position: 'center' },
    { id: 'esperienze', label: t.nav.esperienze, href: '#esperienze', position: 'center' },
    { id: 'galleria',   label: t.nav.galleria,   href: '#galleria',   position: 'center' },
    { id: 'contatti',   label: t.nav.contatti,   href: '#contatti',   position: 'center' },
    {
      id: 'lang',
      position: 'right',
      render: ({ inMobileMenu }) => (
        <div
          role="group"
          aria-label={t.nav.lingua}
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
              {t.nav.disponibilita}
            </a>
          )
        }
        return (
          <a
            href="#disponibilita"
            className="hidden min-[360px]:inline-flex text-[13px] md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-accent text-white hover:bg-accent-soft transition-colors whitespace-nowrap"
          >
            {t.nav.disponibilita}
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
        openMenuLabel={t.nav.openMenu}
        closeMenuLabel={t.nav.closeMenu}
      />
      <HomeHero />
      <Battaglia />
      <Casa />
      <Territorio />
      <Esperienze />
      <Galleria />
      <Recensioni />
      <Contatti />
      <Footer />
    </>
  )
}
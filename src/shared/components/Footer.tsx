import { useT } from '../i18n'

const GOLD = '#E5C58A'

const WHATSAPP_URL = 'https://wa.me/393715982508'
const EMAIL = 'info@dellastella.it'
const ADDRESS = '84030 Battaglia, Casaletto Spartano (SA)'
const MAP_URL = 'https://maps.app.goo.gl/NZpqRdW4TzK11NXc8'
const INSTAGRAM_URL =
  'https://www.instagram.com/dellastella_casavacanza?igsh=MWZmeWQ4M2ltdDZrdw=='
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61587172526889'

export default function Footer() {
  const t = useT()

  return (
    <footer
      id="footer"
      className="relative bg-ink text-white/80 py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-350 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10 items-start">
          <div className="text-center md:text-left">
            <h4 className="font-heading text-3xl leading-tight text-white mb-3">
              Della Stella
            </h4>
            <h6 className="font-heading text-xl leading-tight text-white/85 mb-4">
              {t.footer.subtitle}
            </h6>
            <p className="text-sm font-light leading-relaxed text-white/60 max-w-xs mx-auto md:mx-0">
              {t.footer.description}
            </p>
          </div>

          <div className="text-center">
            <h5
              className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
              style={{ color: GOLD }}
            >
              {t.footer.contatti}
            </h5>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 transition-colors hover:text-[color:var(--gold)]"
                  style={{ ['--gold' as string]: GOLD }}
                >
                  <PinIcon color={GOLD} />
                  <span>{ADDRESS}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 transition-colors hover:text-[color:var(--gold)]"
                  style={{ ['--gold' as string]: GOLD }}
                >
                  <WhatsAppIcon color={GOLD} />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 transition-colors hover:text-[color:var(--gold)]"
                  style={{ ['--gold' as string]: GOLD }}
                >
                  <EmailIcon color={GOLD} />
                  <span>{EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h5
              className="text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
              style={{ color: GOLD }}
            >
              {t.footer.seguici}
            </h5>
            <div className="flex justify-center md:justify-end gap-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform duration-300 hover:scale-110 hover:text-[color:var(--gold)]"
                style={{ ['--gold' as string]: GOLD }}
              >
                <InstagramIcon />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-transform duration-300 hover:scale-110 hover:text-[color:var(--gold)]"
                style={{ ['--gold' as string]: GOLD }}
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light text-white/40 gap-2">
          <p>{t.footer.rights}</p>
          <p>
            {t.footer.designedBy}{' '}
            <a
              href="https://l.delbue.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              l.delbue
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function PinIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
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

function WhatsAppIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.5 0-9.97 4.47-9.97 9.97 0 1.75.46 3.47 1.32 4.98L2 22l5.19-1.36c1.46.79 3.11 1.21 4.85 1.21 5.5 0 9.97-4.47 9.97-9.97S17.54 2 12.04 2zm5.85 14.09c-.25.7-1.47 1.34-2.03 1.43-.53.07-1.19.11-1.93-.12-.44-.14-1.01-.32-1.74-.63-3.07-1.31-5.07-4.39-5.22-4.59-.15-.2-1.24-1.63-1.24-3.11 0-1.48.79-2.2 1.07-2.5.28-.3.6-.37.81-.37h.58c.19 0 .43-.07.68.51.25.6.85 2.08.92 2.23.07.15.12.32.02.53-.09.2-.14.33-.27.5-.14.17-.28.38-.4.51-.14.15-.29.31-.14.6.14.28.63 1.05 1.35 1.7.93.84 1.71 1.1 2 1.24.28.14.44.11.6-.07.16-.18.68-.8.87-1.08.18-.28.36-.24.6-.14.24.11 1.55.73 1.83.86.28.14.47.21.53.32.06.11.06.63-.19 1.34z" />
    </svg>
  )
}

function EmailIcon({ color }: { color: string }) {
  return (
    <svg
      className="w-4 h-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.2-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.7v3.2h2.6V22h3.2z" />
    </svg>
  )
}

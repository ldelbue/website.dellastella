import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import ImageSlider from '../shared/components/ImageSlider'
import SimpleCard from '../shared/components/SimpleCard'
import { useT } from '../shared/i18n'

const CASA_IMAGES: string[] = [
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnARPVsPxTVRYnZ1sV8NzynkneVfXJGYykxdPA3ovAOircjAAxzjLEpUedq4UNCkhjhfkm9Hv-Ujxt7E10oaeUIqyKeWCVJUDwjeDdMz1C4GW-a29H8HdnTQ-992lqP1zAIm3iw8WJuwlhA=s3072-v1',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmqqXEVdDRVfP_YR-hpVKZ2MRDNsE9t88Z1ExFxDJawZbrt9c5wpFJ1ggIzuXymQZxqzZd0N7z30UfZWzeBvSDV8hX4S_1_Pu_gD_F4ggb7Y3ePwhA4SX2y3Fxi5txDa0tj56TdJsQWwEk=s3072-v1',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlrG01DfTIOVO9nvjY_MwRDWSUorLHqa0phuqB2JhT0awm_Ln_r4hbqasXFzrA2oweKrpA1pyXtBYv-ft-zjSygGl6ZQmWRnTf3M8NMpQxOJgO2nM5C89PP6gVRCqT0ygC3f9s-m8m4F3I=s870-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlusvVQBrjeEsZ7enZuUvhKNSQYhUf_G86fcVbSDd0kQZ6k4ZF9o2DmZYEh-s9MokRcK6yp0WIxgkhMdRTYzwSojk-Qu7oeYMqCb-Rils8n1Qfyb9SBZCBDf4kB5J1gmNDn3od4BoFAHdMD=s1354-k-no',

  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlGvpd8i9kWmPbiVOjYsyXGW5z9VfqCG7r01fwuDKcxF6kM6L3h848EBkD0xC1aEXn3qMvxUFnr-IRV0Fj5k3oHtJnc-2PRIzpMpxQIk5YHD3Zpp_VgmkLL3Wvt0XlRH-NmvcaW52eDPDc=s676-k-no',


  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlvZonl6CoHtX8gRRfaCihSgIEfvrS2vNRPRwKXppVtLKRTlTZv68Wwu5-4YYccAZkgNxr1zfVDMvxV44KtVz9QnpozNSJfNc4vowD5jQQ9oDNFjGfuo76H8InqIq2b12Z1e_b3m8alGB2y=s812-k-no',
  'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlpvlwKHJUImOSNflpPFEhJsfs2YUTUH0U41hjsKaKr7ZrXzMNI9GmEtEOav-B9rqaW0oGNCp--r-KDBlz6e3vn7vLj3O1y_F9fJuKVlgUGmG61Mv9Uc2sy2koxPL8imvswazdU6TrcRzyb=s812-k-no',
'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkWOj0Sautd0bIG5aSeP0W13rToLEtQ4vwD2507HZfU3BTom6vU8INZBw6eGhDKQGnGrtQ14qIX90xYeBRdfnA8KlkqtBy1gejmo4YdINUdCiq-aEnDlGRi2b9UzPKQiQ085unGjMJdYLs=s812-k-no',

    'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWmbnqHeeqHn40cgEyCYCylSpwn9diRjNSnjb6n2HwHTBTE1rEiSWqqGySOT4m7njwSv3bE3GByiCJXVK3R4vcN94itVsbFFai79fLjZ5U1rUePw3DlmyRNVmnkeVPiryszfQRvOxHpYDblf=s1354-k-no',
    'https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkPqBt-IlbOo3MgSdzFSWmerzX0X56b5pCSHPayfMJZJ8epoYzb6XTN1rqqFB821WkgjEfXVpAOuVajBvhRluEOe0-rGDi8PUuqWBrAqjVxj5idmp8EkjbCfSeINCzjaZZqIz__VLpBbTwL=s1016-k-no'

]

const iconStroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

/**
 * Icone in ordine allineato a `t.casa.features` — titolo e descrizione arrivano
 * dai dizionari i18n.
 */
const FEATURE_ICONS: ReactNode[] = [
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M3 10.5L12 3l9 7.5V21H3z" />
    <path d="M9.5 21v-6h5v6" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <circle cx="9" cy="8" r="3" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
    <path d="M14 20c.3-2 1.7-3.5 3.5-3.5S21 18 21 20" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M3 20V9h18v11" />
    <path d="M3 15h18" />
    <path d="M7 9V6h4v3" />
    <path d="M13 9V6h4v3" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
    <path d="M6 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
    <path d="M9 6h3" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <rect x="4" y="10" width="16" height="10" rx="1.5" />
    <path d="M8 14h.01M12 14h.01M16 14h.01" />
    <path d="M7 10V6a1 1 0 0 1 1-1h2" />
    <path d="M14 5h3a1 1 0 0 1 1 1v4" />
  </svg>,
  <svg {...iconStroke} className="w-5 h-5">
    <path d="M12 3v18" />
    <path d="M6 8l6-3 6 3" />
    <path d="M6 16l6 3 6-3" />
    <path d="M3 12h18" />
  </svg>,
]

export default function Casa() {
  const t = useT()

  return (
    <section
      id="casa"
      aria-label={t.casa.aria}
      className="relative bg-brand py-20 md:py-28 min-h-svh flex flex-col justify-center"
    >
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-pill bg-white/70 backdrop-blur px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-ink-soft border border-hairline mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t.casa.badge}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-ink">
            {t.casa.headingLead}{' '}
            <span className="text-accent">{t.casa.headingAccent}</span>.
          </h2>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >
            <ImageSlider
                images={CASA_IMAGES}
                alt={(i) => t.casa.photoAlt(i)}
            />
        </motion.div>


          <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {t.casa.features.map((f, i) => (
                <SimpleCard
                  key={i}
                  icon={FEATURE_ICONS[i]}
                  title={f.title}
                  description={f.description}
                  delay={(i % 3) * 0.1}
                />
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  )
}
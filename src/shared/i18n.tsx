/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'IT' | 'EN' | 'DE'
export const LANGS: Lang[] = ['IT', 'EN', 'DE']

const STORAGE_KEY = 'dellastella:lang'
const HTML_LANG: Record<Lang, string> = { IT: 'it', EN: 'en', DE: 'de' }

type Feature = { title: string; description: string }
type Place = { title: string; subtitle: string }

export type Translations = {
  nav: {
    casa: string
    territorio: string
    esperienze: string
    galleria: string
    contatti: string
    disponibilita: string
    lingua: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    description: string
    reviewsCount: string
    guestsUpTo: string
    flexibleCheckIn: string
    verifyAvailability: string
    discoverHouse: string
    features: string[]
    scroll: string
    scrollDownAria: string
  }
  battaglia: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    p1: string
    p2: string
  }
  casa: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    photoAlt: (i: number) => string
    features: Feature[]
  }
  territorio: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    description: string
    places: Place[]
  }
  esperienze: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    items: string[]
  }
  galleria: {
    aria: string
    badge: string
    videoTag: string
    defaultAlt: string
  }
  recensioni: {
    aria: string
    badge: string
    headingLead: string
    headingAccent: string
    verifiedGoogle: string
    starsAria: (stars: number) => string
  }
  contatti: {
    aria: string
    ctaHeading: string
    ctaDescription: string
    whatsappCta: string
    emailCta: string
    howToBadge: string
    howToLead: string
    howToAccent: string
    distances: string[]
    openInMaps: string
    ariaOpenMaps: string
    mapTitle: string
  }
  footer: {
    subtitle: string
    description: string
    contatti: string
    seguici: string
    rights: string
    designedBy: string
  }
}

const it: Translations = {
  nav: {
    casa: 'La Casa',
    territorio: 'Il Territorio',
    esperienze: 'Esperienze',
    galleria: 'Galleria',
    contatti: 'Contatti',
    disponibilita: 'Disponibilità',
    lingua: 'Lingua',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
  },
  hero: {
    aria: 'Benvenuto',
    badge: "Casa Vacanza · Aperta tutto l'anno",
    headingLead: 'Benvenuto sotto la',
    headingAccent: 'nostra stella',
    description:
      'Della Stella è un rifugio di pietra e luce, pensato per chi cerca il silenzio dei campi, il profumo del pane appena sfornato e le sere passate a contare le costellazioni.',
    reviewsCount: '· 8 recensioni',
    guestsUpTo: 'Fino a 4 ospiti',
    flexibleCheckIn: 'Check-in flessibile',
    verifyAvailability: 'Verifica disponibilità',
    discoverHouse: 'Scopri la casa',
    features: ['Wi-Fi', 'Parcheggio ampio', 'Cucina attrezzata', 'Intera casa per te'],
    scroll: 'Scorri',
    scrollDownAria: 'Scorri verso il basso',
  },
  battaglia: {
    aria: 'Battaglia, frazione di Casaletto Spartano',
    badge: 'Il Luogo',
    headingLead: 'Battaglia,',
    headingAccent: 'nel cuore del Cilento',
    p1:
      'Benvenuti a Battaglia, frazione di Casaletto Spartano. Qui il silenzio è la musica principale e la vita scorre lenta, scandita dai rintocchi del campanile di Santa Maria della Stella.',
    p2:
      'Il tuo rifugio di autenticità nel cuore del Parco Nazionale del Cilento. Tra il fresco dei boschi e la bellezza delle Cascate Capelli di Venere, la nostra casa è il punto di partenza ideale per esplorare sentieri e vivere antiche tradizioni.',
  },
  casa: {
    aria: 'La casa',
    badge: 'La Casa',
    headingLead: 'Ogni angolo è pensato per',
    headingAccent: 'farti sentire a casa',
    photoAlt: (i) => `Della Stella, foto ${i + 1}`,
    features: [
      {
        title: 'Intera casa per te',
        description:
          'Nessuna condivisione: gli spazi sono solo per te e per chi viaggia con te.',
      },
      {
        title: '4 posti letto',
        description:
          'Perfetta per famiglie o piccoli gruppi di amici fino a quattro persone.',
      },
      {
        title: 'Due camere separate',
        description:
          'Una matrimoniale e una con due letti singoli — spazi indipendenti per tutti.',
      },
      {
        title: 'Bagno privato',
        description:
          'Doccia calda in ogni stagione, biancheria fresca e prodotti di benvenuto.',
      },
      {
        title: 'Cucina attrezzata',
        description:
          'Pentole, stoviglie, elettrodomestici e macchina del caffè: tutto pronto all’uso.',
      },
      {
        title: 'Clima e riscaldamento',
        description:
          'Temperatura sempre nel giusto: aria fresca d’estate, calore avvolgente d’inverno.',
      },
    ],
  },
  territorio: {
    aria: 'Il territorio',
    badge: 'Il Territorio',
    headingLead: 'Un passo fuori dalla casa,',
    headingAccent: 'il Cilento tutto intorno',
    description:
      'Boschi, cascate, mare e monasteri: le tappe che non puoi mancare, tutte raggiungibili in giornata.',
    places: [
      {
        title: 'Cascate Capelli di Venere',
        subtitle: 'Un salto d’acqua tra le rocce del Cilento',
      },
      {
        title: 'Parco Nazionale del Cilento',
        subtitle: 'Sentieri, boschi e antichi silenzi',
      },
      {
        title: 'Golfo di Policastro',
        subtitle: 'Il mare a mezz’ora dalla casa',
      },
      {
        title: 'Certosa di Padula',
        subtitle: 'Un capolavoro barocco da attraversare',
      },
    ],
  },
  esperienze: {
    aria: 'Esperienze',
    badge: 'Esperienze',
    headingLead: 'Cosa fare',
    headingAccent: 'intorno a Della Stella',
    items: [
      'Trekking alle cascate',
      'River trekking nel Bussento',
      'Borghi e mestieri antichi',
      'Cucina cilentana',
      'Mare e calette nascoste',
      'Cielo stellato e silenzio',
    ],
  },
  galleria: {
    aria: 'Galleria',
    badge: 'Galleria',
    videoTag: 'Video',
    defaultAlt: 'Della Stella',
  },
  recensioni: {
    aria: 'Recensioni degli ospiti',
    badge: 'Recensioni',
    headingLead: 'Le parole',
    headingAccent: 'degli ospiti',
    verifiedGoogle: 'Recensioni verificate su Google',
    starsAria: (n) => `${n} stelle su 5`,
  },
  contatti: {
    aria: 'Contatti e come arrivare',
    ctaHeading: 'Pronti a partire?',
    ctaDescription:
      'Scrivici per disponibilità, tariffe e per costruire insieme il tuo soggiorno.',
    whatsappCta: 'Scrivici su WhatsApp',
    emailCta: 'Invia una email',
    howToBadge: 'Come arrivare',
    howToLead: 'Battaglia di',
    howToAccent: 'Casaletto Spartano',
    distances: [
      'Cascate Capelli di Venere',
      'Sentieri & natura',
      'Mare (Sapri)',
      'Aeroporto di Napoli',
    ],
    openInMaps: 'Apri su Google Maps',
    ariaOpenMaps: 'Apri Della Stella su Google Maps',
    mapTitle: 'Mappa Della Stella',
  },
  footer: {
    subtitle: 'Casa Vacanza',
    description:
      'Un rifugio di pace nel cuore del Cilento. Dove il tempo rallenta e la natura respira.',
    contatti: 'Contatti',
    seguici: 'Seguici',
    rights: '© 2026 www.dellastella.it',
    designedBy: 'Designed by',
  },
}

const en: Translations = {
  nav: {
    casa: 'The House',
    territorio: 'The Area',
    esperienze: 'Experiences',
    galleria: 'Gallery',
    contatti: 'Contact',
    disponibilita: 'Availability',
    lingua: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    aria: 'Welcome',
    badge: 'Holiday Home · Open all year',
    headingLead: 'Welcome under',
    headingAccent: 'our star',
    description:
      'Della Stella is a refuge of stone and light, made for those who seek the silence of the fields, the scent of freshly baked bread, and evenings spent counting the constellations.',
    reviewsCount: '· 8 reviews',
    guestsUpTo: 'Up to 4 guests',
    flexibleCheckIn: 'Flexible check-in',
    verifyAvailability: 'Check availability',
    discoverHouse: 'Discover the house',
    features: ['Wi-Fi', 'Ample parking', 'Equipped kitchen', 'The whole house is yours'],
    scroll: 'Scroll',
    scrollDownAria: 'Scroll down',
  },
  battaglia: {
    aria: 'Battaglia, a hamlet of Casaletto Spartano',
    badge: 'The Place',
    headingLead: 'Battaglia,',
    headingAccent: 'in the heart of Cilento',
    p1:
      'Welcome to Battaglia, a hamlet of Casaletto Spartano. Here silence is the main music and life flows slowly, marked by the bells of Santa Maria della Stella.',
    p2:
      'Your authentic refuge in the heart of the Cilento National Park. Between the coolness of the woods and the beauty of the Capelli di Venere waterfalls, our home is the ideal starting point to explore trails and live ancient traditions.',
  },
  casa: {
    aria: 'The house',
    badge: 'The House',
    headingLead: 'Every corner is designed to',
    headingAccent: 'make you feel at home',
    photoAlt: (i) => `Della Stella, photo ${i + 1}`,
    features: [
      {
        title: 'The whole house is yours',
        description:
          'No sharing: the spaces are only for you and your travel companions.',
      },
      {
        title: '4 beds',
        description:
          'Perfect for families or small groups of friends up to four people.',
      },
      {
        title: 'Two separate bedrooms',
        description:
          'One double and one with two single beds — independent spaces for everyone.',
      },
      {
        title: 'Private bathroom',
        description:
          'A warm shower in every season, fresh linens and welcome amenities.',
      },
      {
        title: 'Equipped kitchen',
        description:
          'Pots, dishes, appliances and coffee maker: everything ready to use.',
      },
      {
        title: 'AC and heating',
        description:
          'Always the right temperature: fresh air in summer, wrapping warmth in winter.',
      },
    ],
  },
  territorio: {
    aria: 'The area',
    badge: 'The Area',
    headingLead: 'One step outside,',
    headingAccent: 'Cilento all around',
    description:
      'Woods, waterfalls, sea and monasteries: the stops you cannot miss, all reachable in a day.',
    places: [
      {
        title: 'Capelli di Venere Waterfalls',
        subtitle: 'A leap of water among Cilento’s rocks',
      },
      {
        title: 'Cilento National Park',
        subtitle: 'Trails, woods and ancient silences',
      },
      {
        title: 'Gulf of Policastro',
        subtitle: 'The sea half an hour from the house',
      },
      {
        title: 'Padula Charterhouse',
        subtitle: 'A baroque masterpiece to walk through',
      },
    ],
  },
  esperienze: {
    aria: 'Experiences',
    badge: 'Experiences',
    headingLead: 'What to do',
    headingAccent: 'around Della Stella',
    items: [
      'Hikes to the waterfalls',
      'River trekking on the Bussento',
      'Villages and ancient crafts',
      'Cilento cuisine',
      'Sea and hidden coves',
      'Starry skies and silence',
    ],
  },
  galleria: {
    aria: 'Gallery',
    badge: 'Gallery',
    videoTag: 'Video',
    defaultAlt: 'Della Stella',
  },
  recensioni: {
    aria: 'Guest reviews',
    badge: 'Reviews',
    headingLead: 'In our',
    headingAccent: 'guests’ words',
    verifiedGoogle: 'Verified reviews on Google',
    starsAria: (n) => `${n} stars out of 5`,
  },
  contatti: {
    aria: 'Contact and how to get here',
    ctaHeading: 'Ready to go?',
    ctaDescription:
      'Write us for availability, rates, and to plan your stay together.',
    whatsappCta: 'Message us on WhatsApp',
    emailCta: 'Send an email',
    howToBadge: 'How to get here',
    howToLead: 'Battaglia,',
    howToAccent: 'Casaletto Spartano',
    distances: [
      'Capelli di Venere Waterfalls',
      'Trails & nature',
      'Sea (Sapri)',
      'Naples Airport',
    ],
    openInMaps: 'Open on Google Maps',
    ariaOpenMaps: 'Open Della Stella on Google Maps',
    mapTitle: 'Della Stella map',
  },
  footer: {
    subtitle: 'Holiday Home',
    description:
      'A peaceful refuge in the heart of Cilento. Where time slows down and nature breathes.',
    contatti: 'Contact',
    seguici: 'Follow us',
    rights: '© 2026 www.dellastella.it',
    designedBy: 'Designed by',
  },
}

const de: Translations = {
  nav: {
    casa: 'Das Haus',
    territorio: 'Die Region',
    esperienze: 'Erlebnisse',
    galleria: 'Galerie',
    contatti: 'Kontakt',
    disponibilita: 'Verfügbarkeit',
    lingua: 'Sprache',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
  },
  hero: {
    aria: 'Willkommen',
    badge: 'Ferienhaus · Ganzjährig geöffnet',
    headingLead: 'Willkommen unter',
    headingAccent: 'unserem Stern',
    description:
      'Della Stella ist ein Refugium aus Stein und Licht — für alle, die die Stille der Felder suchen, den Duft frisch gebackenen Brotes und Abende, an denen man die Sternbilder zählt.',
    reviewsCount: '· 8 Bewertungen',
    guestsUpTo: 'Bis zu 4 Gäste',
    flexibleCheckIn: 'Flexibler Check-in',
    verifyAvailability: 'Verfügbarkeit prüfen',
    discoverHouse: 'Das Haus entdecken',
    features: ['WLAN', 'Großer Parkplatz', 'Ausgestattete Küche', 'Ganzes Haus für dich'],
    scroll: 'Scrollen',
    scrollDownAria: 'Nach unten scrollen',
  },
  battaglia: {
    aria: 'Battaglia, Ortsteil von Casaletto Spartano',
    badge: 'Der Ort',
    headingLead: 'Battaglia,',
    headingAccent: 'im Herzen des Cilento',
    p1:
      'Willkommen in Battaglia, einem Ortsteil von Casaletto Spartano. Hier ist die Stille die Hauptmusik, und das Leben fließt langsam, im Takt der Glocken von Santa Maria della Stella.',
    p2:
      'Dein authentisches Refugium im Herzen des Nationalparks Cilento. Zwischen der Kühle der Wälder und der Schönheit der Wasserfälle Capelli di Venere ist unser Haus der ideale Ausgangspunkt, um Wanderwege zu erkunden und alte Traditionen zu erleben.',
  },
  casa: {
    aria: 'Das Haus',
    badge: 'Das Haus',
    headingLead: 'Jede Ecke ist so gestaltet,',
    headingAccent: 'dass du dich zuhause fühlst',
    photoAlt: (i) => `Della Stella, Foto ${i + 1}`,
    features: [
      {
        title: 'Ganzes Haus für dich',
        description:
          'Kein Teilen: Die Räume gehören nur dir und deinen Reisebegleitern.',
      },
      {
        title: '4 Schlafplätze',
        description:
          'Perfekt für Familien oder kleine Freundesgruppen bis zu vier Personen.',
      },
      {
        title: 'Zwei getrennte Schlafzimmer',
        description:
          'Ein Doppelbett und ein Zimmer mit zwei Einzelbetten — eigene Räume für alle.',
      },
      {
        title: 'Privates Bad',
        description:
          'Warme Dusche in jeder Jahreszeit, frische Wäsche und Willkommensprodukte.',
      },
      {
        title: 'Ausgestattete Küche',
        description:
          'Töpfe, Geschirr, Geräte und Kaffeemaschine: alles sofort einsatzbereit.',
      },
      {
        title: 'Klima und Heizung',
        description:
          'Immer die passende Temperatur: kühle Luft im Sommer, wohlige Wärme im Winter.',
      },
    ],
  },
  territorio: {
    aria: 'Die Region',
    badge: 'Die Region',
    headingLead: 'Einen Schritt vor die Tür,',
    headingAccent: 'ringsum das Cilento',
    description:
      'Wälder, Wasserfälle, Meer und Klöster: die Etappen, die du nicht verpassen darfst — alle an einem Tag erreichbar.',
    places: [
      {
        title: 'Wasserfälle Capelli di Venere',
        subtitle: 'Ein Wassersprung zwischen den Felsen des Cilento',
      },
      {
        title: 'Nationalpark Cilento',
        subtitle: 'Wege, Wälder und alte Stille',
      },
      {
        title: 'Golf von Policastro',
        subtitle: 'Das Meer eine halbe Stunde vom Haus entfernt',
      },
      {
        title: 'Kartause von Padula',
        subtitle: 'Ein barockes Meisterwerk zum Durchschreiten',
      },
    ],
  },
  esperienze: {
    aria: 'Erlebnisse',
    badge: 'Erlebnisse',
    headingLead: 'Was du',
    headingAccent: 'rund um Della Stella erleben kannst',
    items: [
      'Wanderungen zu den Wasserfällen',
      'River-Trekking im Bussento',
      'Dörfer und alte Handwerke',
      'Cilento-Küche',
      'Meer und versteckte Buchten',
      'Sternenhimmel und Stille',
    ],
  },
  galleria: {
    aria: 'Galerie',
    badge: 'Galerie',
    videoTag: 'Video',
    defaultAlt: 'Della Stella',
  },
  recensioni: {
    aria: 'Gästebewertungen',
    badge: 'Bewertungen',
    headingLead: 'Die Worte',
    headingAccent: 'unserer Gäste',
    verifiedGoogle: 'Verifizierte Bewertungen auf Google',
    starsAria: (n) => `${n} von 5 Sternen`,
  },
  contatti: {
    aria: 'Kontakt und Anfahrt',
    ctaHeading: 'Bereit zur Abreise?',
    ctaDescription:
      'Schreib uns für Verfügbarkeit, Preise und um gemeinsam deinen Aufenthalt zu planen.',
    whatsappCta: 'Schreib uns auf WhatsApp',
    emailCta: 'E-Mail senden',
    howToBadge: 'Anfahrt',
    howToLead: 'Battaglia in',
    howToAccent: 'Casaletto Spartano',
    distances: [
      'Wasserfälle Capelli di Venere',
      'Wege & Natur',
      'Meer (Sapri)',
      'Flughafen Neapel',
    ],
    openInMaps: 'In Google Maps öffnen',
    ariaOpenMaps: 'Della Stella in Google Maps öffnen',
    mapTitle: 'Karte Della Stella',
  },
  footer: {
    subtitle: 'Ferienhaus',
    description:
      'Ein friedliches Refugium im Herzen des Cilento. Wo die Zeit langsamer wird und die Natur atmet.',
    contatti: 'Kontakt',
    seguici: 'Folge uns',
    rights: '© 2026 www.dellastella.it',
    designedBy: 'Design von',
  },
}

const translations: Record<Lang, Translations> = { IT: it, EN: en, DE: de }

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void }

const LangContext = createContext<LangContextValue | null>(null)

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'IT'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'IT' || stored === 'EN' || stored === 'DE') return stored
  return 'IT'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang: setLangState }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within <LangProvider>')
  return ctx
}

export function useT(): Translations {
  const { lang } = useLang()
  return translations[lang]
}
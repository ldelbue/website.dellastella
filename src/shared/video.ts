export type VideoQuality = 'high' | 'medium' | 'low'

export const BATTAGLIA_VIDEO_URLS: Record<VideoQuality, string> = {
  high: 'https://cdn.dellastella.it/assets/battaglia-animeted-high.mp4',
  medium: 'https://cdn.dellastella.it/assets/battaglia-animeted-medium.mp4',
  low: 'https://cdn.dellastella.it/assets/battaglia-animeted-low.mp4',
}

type NetworkInfo = {
  effectiveType?: string
  downlink?: number
  saveData?: boolean
}

function getConnection(): NetworkInfo | null {
  if (typeof navigator === 'undefined') return null
  const n = navigator as Navigator & {
    connection?: NetworkInfo
    mozConnection?: NetworkInfo
    webkitConnection?: NetworkInfo
  }
  return n.connection ?? n.mozConnection ?? n.webkitConnection ?? null
}

export function detectVideoQuality(): VideoQuality {
  const conn = getConnection()
  if (!conn) return 'high'
  if (conn.saveData) return 'low'
  const eff = conn.effectiveType
  const down = typeof conn.downlink === 'number' ? conn.downlink : Infinity
  if (eff === 'slow-2g' || eff === '2g' || down < 1) return 'low'
  if (eff === '3g' || down < 4) return 'medium'
  return 'high'
}

let cachedQuality: VideoQuality | null = null
export function battagliaVideoQuality(): VideoQuality {
  cachedQuality ??= detectVideoQuality()
  return cachedQuality
}

export function battagliaVideoUrl(): string {
  return BATTAGLIA_VIDEO_URLS[battagliaVideoQuality()]
}

let preloadStarted = false
let hiddenVideo: HTMLVideoElement | null = null

export function preloadBattagliaVideo(): void {
  if (preloadStarted) return
  if (typeof document === 'undefined') return
  preloadStarted = true

  const url = battagliaVideoUrl()

  if (hiddenVideo) return
  const video = document.createElement('video')
  video.src = url
  video.preload = 'auto'
  video.muted = true
  video.setAttribute('playsinline', '')
  video.setAttribute('aria-hidden', 'true')
  video.tabIndex = -1
  video.style.cssText =
    'position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none'
  document.body.appendChild(video)
  hiddenVideo = video
}
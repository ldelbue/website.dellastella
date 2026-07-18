let registered = false

export function registerServiceWorker(): void {
  if (registered) return
  if (typeof navigator === 'undefined') return
  if (!('serviceWorker' in navigator)) return
  registered = true
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
    /* SW registration failure is non-fatal — assets just aren't offline-cached */
  })
}
const CACHE_NAME = 'della-stella-assets-v1'

const ASSET_EXTENSIONS =
  /\.(mp4|webm|mov|m4v|ogg|jpg|jpeg|png|webp|avif|gif|svg|ico|woff2?|ttf|otf)(\?.*)?$/i

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
      )
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)

  // Never touch same-origin — lets Vite HMR and app JS/CSS/HTML flow normally.
  if (url.origin === self.location.origin) return

  if (!ASSET_EXTENSIONS.test(url.pathname)) return

  event.respondWith(handleAsset(req))
})

async function handleAsset(req) {
  const url = new URL(req.url)
  const cacheKey = url.origin + url.pathname
  const cache = await caches.open(CACHE_NAME)

  let cached = await cache.match(cacheKey)

  if (!cached) {
    const fullReq = new Request(cacheKey, {
      method: 'GET',
      mode: 'no-cors',
      credentials: 'omit',
    })
    try {
      const res = await fetch(fullReq)
      if (res && (res.type === 'opaque' || res.ok)) {
        try {
          await cache.put(cacheKey, res.clone())
        } catch {
          /* Safari sometimes rejects opaque put — non-fatal */
        }
        cached = res
      } else {
        return fetch(req)
      }
    } catch {
      return fetch(req)
    }
  }

  const rangeHeader = req.headers.get('Range')
  if (!rangeHeader) return cached.clone()

  // Opaque responses have null body → cannot slice.
  // Modern browsers accept a full 200 for a video Range request.
  if (cached.type === 'opaque') return cached.clone()

  const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader)
  if (!match) return cached.clone()

  try {
    const buffer = await cached.clone().arrayBuffer()
    const total = buffer.byteLength
    const start = parseInt(match[1], 10)
    const end = match[2]
      ? Math.min(parseInt(match[2], 10), total - 1)
      : total - 1
    if (start >= total || end < start) {
      return new Response(null, {
        status: 416,
        statusText: 'Range Not Satisfiable',
      })
    }
    const chunk = buffer.slice(start, end + 1)
    return new Response(chunk, {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': String(chunk.byteLength),
        'Accept-Ranges': 'bytes',
      },
    })
  } catch {
    return cached.clone()
  }
}
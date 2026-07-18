import { useEffect, useState } from 'react'
import IntroSplash from '../shared/components/IntroSplash.tsx'
import Home from '../pages/Home.tsx'
import { preloadBattagliaVideo } from '../shared/video.ts'
import { registerServiceWorker } from '../shared/serviceWorker.ts'

function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    registerServiceWorker()
    preloadBattagliaVideo()
  }, [])

  return (
    <>
      <Home />
      {!introDone && <IntroSplash onFinish={() => setIntroDone(true)} />}
    </>
  )
}

export default App
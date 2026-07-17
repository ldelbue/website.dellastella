import { useState } from 'react'
import IntroSplash from '../shared/components/IntroSplash.tsx'
import Home from '../pages/Home.tsx'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <Home />
      {!introDone && <IntroSplash onFinish={() => setIntroDone(true)} />}
    </>
  )
}

export default App
import { useState } from 'react'
import logoAnimation from '../assets/logo-animation.mp4'

interface Props {
  onFinish: () => void
}

export default function IntroSplash({ onFinish }: Props) {
  const [fadingOut, setFadingOut] = useState(false)

  const handleEnded = () => {
    setFadingOut(true)
    setTimeout(onFinish, 800)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <video
        src={logoAnimation}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={(e) => e.currentTarget.setAttribute('data-ready', 'true')}
        onEnded={handleEnded}
        className="w-64 md:w-80 max-w-[40vw] h-auto"
      />
    </div>
  )
}
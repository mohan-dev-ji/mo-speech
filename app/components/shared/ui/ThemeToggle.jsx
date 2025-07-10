'use client'

import { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import toggleAnimation from './ToggleButton.json'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const animationRef = useRef()
  const [isAnimating, setIsAnimating] = useState(false)

  // Set initial frame based on theme when component mounts
  useEffect(() => {
    if (mounted && animationRef.current) {
      const frame = theme === 'dark' ? 0 : 17
      animationRef.current.goToAndStop(frame, true)
    }
  }, [mounted, theme])

  const handleToggle = () => {
    if (isAnimating || !animationRef.current) return

    setIsAnimating(true)
    
    if (theme === 'dark') {
      // Dark → Light: play from frame 0 to 17
      animationRef.current.playSegments([0, 17], true)
    } else {
      // Light → Dark: play from frame 17 to 0
      animationRef.current.playSegments([17, 0], true)
    }
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    toggleTheme() // Update the actual theme
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="w-12 h-12 rounded-lg" />
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className="flex items-center justify-center w-12 h-12 rounded-lg"
      aria-label="Toggle dark mode"
    >
      <Lottie
        lottieRef={animationRef}
        animationData={toggleAnimation}
        loop={false}
        autoplay={false}
        style={{ width: 32, height: 32 }}
        onComplete={handleAnimationComplete}
      />
    </button>
  )
} 
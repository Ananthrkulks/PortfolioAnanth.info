"use client"

import { useRef, useEffect, useState } from "react"

interface MobileVideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export function MobileVideoPlayer({ src, poster, className }: MobileVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const video = videoRef.current
    if (video) {
      // Set all possible mobile-specific attributes
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('x5-playsinline', '')
      video.setAttribute('x5-video-player-type', 'h5')
      video.setAttribute('x5-video-player-fullscreen', 'true')
      video.setAttribute('x5-video-orientation', 'portraint')
      video.setAttribute('x-webkit-airplay', 'allow')
      video.setAttribute('x5-video-player', 'h5')
      // Force video to be muted for autoplay
      video.muted = true
      // Multiple attempts to play the video
      const attemptPlay = async () => {
        try {
          setIsLoading(true)
          // Ensure the video source is properly encoded
          const encodedSrc = encodeURI(src)
          if (video.src !== encodedSrc) {
            video.src = encodedSrc
          }
          await video.play()
          setIsLoading(false)
        } catch (error) {
          console.error('First play attempt failed:', error)
          // Second attempt after a short delay
          setTimeout(async () => {
            try {
              await video.play()
              setIsLoading(false)
            } catch (error) {
              console.error('Second play attempt failed:', error)
              setHasError(true)
              setIsLoading(false)
            }
          }, 1000)
        }
      }
      // Start playing when video is loaded
      if (video.readyState >= 2) {
        attemptPlay()
      } else {
        video.addEventListener('loadeddata', attemptPlay)
        video.addEventListener('error', (e) => {
          console.error('Video loading error:', e)
          setHasError(true)
          setIsLoading(false)
        })
        return () => {
          video.removeEventListener('loadeddata', attemptPlay)
          video.removeEventListener('error', handleError)
        }
      }
    }
  }, [src, isMounted])

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (!isMounted) {
    return (
      <div className="relative w-full aspect-video bg-black/90">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black/90">
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-contain ${className}`}
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onError={handleError}
        style={{ objectFit: 'contain' }}
      />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded z-10">
          Loading video...
        </div>
      )}
      {hasError && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded z-10">
          Video failed to load. Please try again.
        </div>
      )}
    </div>
  )
} 
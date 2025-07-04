"use client"

import { useRef, useEffect, useState } from "react"

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

export function VideoPlayer({ 
  src, 
  poster, 
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Set video attributes for better mobile compatibility
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('x5-playsinline', '')
      video.setAttribute('x5-video-player-type', 'h5')
      video.setAttribute('x5-video-player-fullscreen', 'true')

      // Force autoplay if specified
      if (autoPlay) {
        video.muted = true // Must be muted for autoplay to work
        video.play().catch(error => {
          console.error('Error autoplaying video:', error)
        })
      }

      // Add error handling
      video.onerror = (e) => {
        console.error('Video error:', e)
        setError(true)
      }
    }
  }, [autoPlay])

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Error loading video:", e)
    setError(true)
    if (videoRef.current) {
      videoRef.current.style.display = "none"
    }
  }

  if (error) {
    return (
      <div className="relative w-full aspect-video bg-black/90 flex items-center justify-center">
        <p className="text-white/80">Failed to load video</p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video bg-black/90">
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-contain ${className}`}
        controls={!autoPlay}
        preload="auto"
        playsInline={playsInline}
        autoPlay={autoPlay}
        muted={muted || autoPlay}
        loop={loop}
        poster={poster}
        onError={handleError}
        onPlay={(e) => {
          const videos = document.querySelectorAll('video');
          videos.forEach((v) => {
            if (v !== e.currentTarget) {
              v.pause();
              v.currentTime = 0;
            }
          });
        }}
        onPause={(e) => {
          if (!autoPlay) {
            e.currentTarget.currentTime = 0;
          }
        }}
      />
    </div>
  )
} 
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import VideoPlayer from "@/components/VideoPlayer"
import Image from "next/image"
import { useState, useRef } from "react"

interface VideoCardProps {
  title: string
  description: string
  videoSrc: string
  posterSrc: string
}

export default function VideoCard({ title, description, videoSrc, posterSrc }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <div className="bg-card rounded-lg overflow-hidden shadow-lg h-full transform transition-transform duration-300 hover:scale-105 cursor-pointer relative">
          <div className="aspect-video relative min-h-[180px]">
            <Image
              src={posterSrc}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-16 h-16 text-white/80 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="black" fillOpacity="0.4" />
                <path d="M10 8l6 4-6 4V8z" fill="white" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <VideoPlayer 
            ref={videoRef}
            src={videoSrc} 
            className="w-full h-full"
            poster={posterSrc}
            onPlay={handlePlay}
            onPause={handlePause}
            controls={true}
            playsInline
          />
        </div>
      </DialogContent>
    </Dialog>
  )
} 
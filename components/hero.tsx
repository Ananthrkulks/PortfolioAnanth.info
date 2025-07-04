"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      setIsAtBottom(scrollPosition >= documentHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const portfolioWorks = [
    {
      title: "3D Generalist",
      type: "image",
      src: "/images/hero-images/0.png",
    },
    {
      title: "3D Generalist",
      type: "image",
      src: "/images/hero-images/1.png",
    },
    {
      title: "Product Design",
      type: "image",
      src: "/images/hero-images/2.png",
    },
    {
      title: "Motion Graphics",
      type: "image",
      src: "/images/hero-images/3.png",
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/hero-images/4.png",
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/hero-images/5.png",
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/hero-images/6.jpg",
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/hero-images/7.png",
    },
    {
      title: "Visual Effects",
      type: "image",
      src: "/images/hero-images/8.png",
    },
    {
      title: "3D Animation",
      type: "video",
      src: "/videos/hero-videos/hero-tele.mp4",
      index: 0,
    },
  ]

  // Handle rotation of background media
  useEffect(() => {
    if (!isMounted) return

    const interval = setInterval(() => {
      setCurrentWorkIndex((prev) => (prev + 1) % portfolioWorks.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isMounted, portfolioWorks.length])

  // Preload all videos when component mounts
  useEffect(() => {
    if (!isMounted) return

    const videoItems = portfolioWorks.filter((item) => item.type === "video")
    videoItems.forEach((item, i) => {
      if (videoRefs.current[i]) {
        videoRefs.current[i]!.src = item.src
        videoRefs.current[i]!.load()
      }
    })
  }, [isMounted])

  // Handle video playback when current work changes
  useEffect(() => {
    if (!isMounted) return

    const currentWork = portfolioWorks[currentWorkIndex]

    videoRefs.current.forEach((ref) => {
      if (ref) {
        ref.pause()
      }
    })

    if (currentWork.type === "video" && typeof currentWork.index === "number") {
      const videoRef = videoRefs.current[currentWork.index]
      if (videoRef) {
        videoRef.currentTime = 0
        const playPromise = videoRef.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Video play error:", error)
          })
        }
      }
    }
  }, [currentWorkIndex, isMounted])

  const currentWork = portfolioWorks[currentWorkIndex]

  if (!isMounted) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm mix-blend-multiply z-1" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
              Ananth R Kulkarni
            </span>
          </h1>
          <div className="text-4xl font-light mb-6 text-gray-300">3D Generalist</div>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Transforming Ideas into Stunning 3D Reality | Specializing in Character Design, Environment Art, and Visual
            Effects
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0">
        {/* Images */}
        {portfolioWorks.map(
          (work, index) =>
            work.type === "image" && (
              <div
                key={`image-${index}`}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  opacity: currentWorkIndex === index ? 1 : 0,
                }}
              >
                <img
                  src={work.src}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: "blur(1.5px) brightness(0.55) contrast(1.1)",
                  }}
                />
              </div>
            ),
        )}

        {/* Videos */}
        {portfolioWorks
          .filter((work) => work.type === "video")
          .map((work, i) => (
            <div
              key={`video-${i}`}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentWorkIndex === portfolioWorks.findIndex((w) => w.src === work.src) ? 1 : 0,
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                className="w-full h-full object-cover"
                style={{
                  filter: "blur(1.5px) brightness(0.55) contrast(1.1)",
                }}
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm mix-blend-multiply z-1" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-7xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
            Ananth R Kulkarni
          </span>
        </h1>
        <div className="text-4xl font-light mb-6 text-gray-300">3D Generalist</div>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Transforming Ideas into Stunning 3D Reality | Specializing in Character Design, Environment Art, and Visual
          Effects
        </p>
        <div className="flex gap-6 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20 text-lg font-medium"
            onClick={() => {
              const portfolioSection = document.getElementById("portfolio")
              if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-full transition-all duration-300 hover:scale-105 text-lg font-medium backdrop-blur-sm"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
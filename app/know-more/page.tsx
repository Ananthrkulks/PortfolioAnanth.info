"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { ThemeProvider } from "next-themes"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import '@splidejs/react-splide/css';

// Dynamically import client-side components
const Splide = dynamic(() => import('@splidejs/react-splide').then(mod => mod.Splide), { ssr: false })
const SplideSlide = dynamic(() => import('@splidejs/react-splide').then(mod => mod.SplideSlide), { ssr: false })
const VideoCard = dynamic(() => import('@/components/VideoCard').then(mod => mod.default), { ssr: false })

export default function KnowMore() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBackToHome = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    router.push('/')
  }

  if (!isClient) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="container mx-auto px-6 py-20">
            <div className="flex items-center justify-center h-[50vh]">
              <div className="text-xl text-white/80">Loading...</div>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-6 py-20">
          <Button
            variant="outline" 
            className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            onClick={handleBackToHome}
          >
            <div className="flex items-center gap-2 px-6 py-3">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </div>
          </Button>

          {/* About Me Blog Section */}
          <section className="max-w-3xl mx-auto mb-20">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                More About Me
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                I've worked on a few client projects, which I've featured in my main portfolio. Alongside that, I also showcase some unfinished and personal projects that I use to experiment, learn, and improve my skills. Over time, I've become proficient in a range of creative software and am now looking for the right platform to fully utilize and grow these skills.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                Currently, I'm pursuing my engineering degree from VTU, where I've developed a solid foundation in coding—particularly in C—and have also explored areas of AI, including deep learning. With the future so deeply connected to generative AI and emerging tech, I believe this blend of art and tech gives me a strong edge.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                In my free time, I enjoy playing basketball—it's my core sport and a big part of who I am. It helps me stay focused and energized. One quality I truly value in myself is my determination. I always find a way to complete whatever I set my mind to, and I constantly push myself to learn and grow.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                Right now, I'm deepening my skills in character animation using Maya, as part of my diploma course from AAFT.
                </p>
              </div>
            </div>
          </section>

          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            My Creative Journey
          </h1>
          
          {/* Featured Projects Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* watch */}
              <article className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <VideoCard 
                    title="Fast Track Ad"
                    description="A detailed exploration of watch design and animation..."
                    videoSrc="/videos/know-more-videos/watch1.mp4"
                    posterSrc="/images/know-more-images/watch2v.png"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-4">
                    <img src="/images/know-more-images/watch1v.png" alt="Watch Ad" className="w-24 h-24 object-cover rounded-lg" />
                    <img src="/images/know-more-images/watch2v.png" alt="Watch Ad" className="w-24 h-24 object-cover rounded-lg" />
                  </div>
                </div>
              </article>

              {/* Helicopter Project */}
              <article className="bg-card rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <VideoCard 
                    title="CGI Helicopter Animation"
                    description="Showcasing my CGI banner animation for Fuget Pizza..."
                    videoSrc="/videos/helicopter/vheli0.mp4"
                    posterSrc="/images/helicopter-images/iheli1.png"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-4">
                    <img src="/images/helicopter-images/iheli0.png" alt="Helicopter view 1" className="w-24 h-24 object-cover rounded-lg" />
                    <img src="/images/helicopter-images/iheli1.png" alt="Helicopter view 2" className="w-24 h-24 object-cover rounded-lg" />
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Personal Work Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6">Personal Work</h2>
            <div className="w-full">
              <Splide
                options={{
                  type: 'slide',
                  perPage: 2,
                  perMove: 1,
                  gap: '2rem',
                  pagination: true,
                  arrows: true,
                  autoplay: false,
                  speed: 800,
                  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  drag: true,
                  snap: true,
                  breakpoints: {
                    1024: {
                      perPage: 2,
                    },
                    768: {
                      perPage: 1,
                    },
                  },
                }}
                className="w-full"
              >
                {/* Bottle Animation */}
                <SplideSlide>
                  <div className="h-full">
                    <VideoCard
                      title="Bottle Animation"
                      description="A stylized bottle design with dynamic animation..."
                      videoSrc="/videos/know-more-videos/bottle1.mp4"
                      posterSrc="/images/know-more-images/bottle1v.png"
                    />
                  </div>
                </SplideSlide>

                {/* Pud Realistic Texturing */}
                <SplideSlide>
                  <div className="h-full">
                    <VideoCard
                      title="Pud Realistic Texturing"
                      description="Built in Blender with hyper-realistic textures and lifelike water materials."
                      videoSrc="/videos/know-more-videos/pud.mp4"
                      posterSrc="/images/know-more-images/pud.png"
                    />
                  </div>
                </SplideSlide>

                {/* Chocolate Spiral */}
                <SplideSlide>
                  <div className="h-full">
                    <VideoCard
                      title="Chocolate Spiral"
                      description="Just to play with the fluid simulation of blender , I was trying..."
                        videoSrc="/videos/know-more-videos/chocolate-spiral.mp4"
                        posterSrc="/images/know-more-images/choco.png"
                      />
                    </div>
                  </SplideSlide>

                  {/* Keyboard Rigging */}
                <SplideSlide>
                  <div className="h-full">
                    <VideoCard
                      title="Keyboard Rigging"
                      description="A stylized keyboard with smooth animations and unique Rigging Refered from movie Soul."
                      videoSrc="/videos/know-more-videos/keyboard.mp4"
                      posterSrc="/images/know-more-images/keyboard-rig.png"
                    />
                  </div>
                </SplideSlide>
              </Splide>
            </div>
          </section>

          {/* Gallery Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  image: "/images/know-more-images/perfume.png",
                  title: "Perfume Bottle",
                  description: "A detailed 3D model of a high-end perfume bottle, showcasing advanced modeling techniques and material work."
                },
                {
                  image: "/images/know-more-images/bottle1v.png",
                  title: "Bottle Ad Project",
                  description: "A complex bottle model with detailed materials and realistic lighting, created for a product project."
                },
                {
                  image: "/images/know-more-images/keyboard-rig.png",
                  title: "Keyboard Design",
                  description: "An immersive keyboard design featuring detailed mechanics and atmospheric lighting."
                },
                {
                  image: "/images/know-more-images/icecream1.png",
                  title: "Chocolate Animation",
                  description: "High-end chocolate animation showcasing advanced material work and lighting techniques."
                },
                {
                  image: "/images/know-more-images/shoekm.png",
                  title: "Shoe Design",
                  description: "A detailed shoe model with intricate details and accessories, created for a product project."
                },
                {
                  image: "/images/know-more-images/gpu1v.png",
                  title: "GPU Viewport View",
                  description: "Viewport view of a GPU."
                },
                {
                  image: "/images/know-more-images/gpu2v.png",
                  title: "GPU Rendered View",
                  description: "A rendered view of a GPU."
                },
                {
                  image: "/images/know-more-images/enviroment2.png",
                  title: "Environment Design",
                  description: "A futuristic environment design showcasing advanced modeling and material techniques."
                }
              ].map((item, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
} 
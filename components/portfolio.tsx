"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Tag, Maximize2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';

// Update custom arrow styles
const splideStyles = `
  .splide__pagination {
    display: none !important;
  }
  .splide__track {
    padding: 0 !important;
  }
  .splide__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: pointer;
    opacity: 0.8;
  }
  .splide__arrow:hover {
    background: rgba(255, 255, 255, 0.3);
    opacity: 1;
  }
  .splide__arrow--prev {
    left: 0.25rem;
  }
  .splide__arrow--next {
    right: 0.25rem;
  }
  .splide__arrow svg {
    width: 1rem;
    height: 1rem;
    fill: white;
  }
  .splide__arrow svg path {
    fill: white;
  }

  /* PDF Viewer Styles */
  .pdf-viewer {
    width: 100%;
    height: 100%;
    min-height: 300px;
    background: #f5f5f5;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .pdf-viewer iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 768px) {
    .pdf-viewer {
      min-height: 400px;
    }
  }
`;

interface Project {
  id: number
  title: string
  category: string
  description: string
  tags: string[]
  images?: string[]
  videos?: string[]
  secondImages?: string[]
  thirdImages?: string[]
  fourthImages?: string[]
  secondVideos?: string[]
  pdfs?: string[]
  link?: string
}

// Raw projects with duplicates
const rawProjects: Project[] = [
  {
    id: 1,
    title: "Fingerprint Scanner",
    category: "Product Viz",
    description: "A detailed 3D model of a fingerprint scanner with realistic materials and lighting.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/fingerprint-images/imetrix1.png", "/images/fingerprint-images/imetrix2.png", "/images/fingerprint-images/imetrix3.png", "/images/fingerprint-images/imetrix4.png"],
    secondImages: ["/images/fingerprint-images/imetrix1v.png", "/images/fingerprint-images/imetrix2v.png"],
    videos: ["/videos/fingerprint-videos/vmetrix1.mp4"],
  },
  {
    id: 2,
    title: "Telephone Design",
    category: "Product Viz",
    description: "A vintage telephone design with detailed modeling and material work.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/telephone1-images/itele1.png", "/images/telephone1-images/itele2.png", "/images/telephone1-images/itele3.png", "/images/telephone1-images/itele4.png", "/images/telephone1-images/itele5.png"],
    secondImages: ["/images/telephone1-images/itele1v.png", "/images/telephone1-images/itele2v.png", "/images/telephone1-images/itele3v.png", "/images/telephone1-images/itele4v.png"],
    videos: ["/videos/telephone1-videos/vtele1.mp4"],
    secondVideos: ["/videos/telephone1-videos/vtele2.mp4"],
  },
  {
    id: 3,
    title: "Character Design",
    category: "Character",
    description: "A stylized character design with detailed modeling and rigging.",
    tags: ["Character Design", "Blender Modeling", "Rigging", "Animation", "Texturing"],
    images: ["/images/character1-images/ichar1.png", "/images/character1-images/ichar2.png", "/images/character1-images/ichar3.png", "/images/character1-images/ichar4.png"],
    secondImages: ["/images/character1-images/ichar1v.png", "/images/character1-images/ichar2v.png"],
    videos: ["/videos/character1-videos/vchar1.mp4"],
  },
  {
    id: 4,
    title: "Speaker Design",
    category: "Product Viz",
    description: "A modern speaker design with detailed modeling and realistic materials.",
    tags: ["Product Design", "Blender Modeling", "Texturing", "Lighting", "Realistic Rendering"],
    images: ["/images/speaker-images/ispeaker1.png", "/images/speaker-images/ispeaker2.png", "/images/speaker-images/ispeaker3.png"],
    secondImages: ["/images/speaker-images/ispeaker1v.png", "/images/speaker-images/ispeaker2v.png"],
    videos: ["/videos/speaker-videos/vspeaker1.mp4"],
  },
  {
    id: 7,
    title: "Fantasy Game World",
    category: "Environment",
    description: "A vibrant fantasy game environment with stylized architecture and magical elements.",
    tags: ["Environment Design", "Game Art", "Stylized Modeling", "Texturing", "Lighting"],
    images: ["/images/environment1-images/ienv1.png", "/images/environment1-images/ienv2.png", "/images/environment1-images/ienv3.png", "/images/environment1-images/ienv4.png"],
    secondImages: ["/images/environment1-images/ienv1v.png", "/images/environment1-images/ienv2v.png"],
    videos: ["/videos/environment1-videos/venv1.mp4"],
    pdfs: [],
  }
]

// Get unique categories and sort them
const categories = ["All", "Character", "Product Viz", "Environment"]

// Remove duplicates by ID and sort by ID
const projects: Project[] = Array.from(new Map(rawProjects.map((proj) => [proj.id, proj])).values())
  .sort((a, b) => a.id - b.id)

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [fullscreenImages, setFullscreenImages] = useState<string[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselKey, setCarouselKey] = useState(0)
  const [openVideoDialog, setOpenVideoDialog] = useState(false)
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string | null>(null)

  // Function to handle image loading
  const handleImageLoad = (projectId: string) => {
    setIsLoading(prev => ({ ...prev, [projectId]: false }))
  }

  // Function to handle image error
  const handleImageError = (projectId: string) => {
    setIsLoading(prev => ({ ...prev, [projectId]: false }))
  }

  // Helper function to get project images with fallback
  const getProjectImages = (project: Project) => {
    const images = project.images || []
    return images.map((src, index) => ({
      src,
      alt: `${project.title} - Image ${index + 1}`,
      projectId: project.id.toString()
    }))
  }

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Calculate initial display count (2 rows * 3 columns = 6 items)
  const initialDisplayCount = 6
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialDisplayCount)

  return (
    <section className="py-20" id="portfolio">
      <style>{splideStyles}</style>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Portfolio</h2>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category)
                setShowAll(false)
              }}
              className="px-6 py-2 rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => {
            const projectImages = getProjectImages(project)
            const mainImage = projectImages[0]?.src
            
            return (
              <Card
                key={project.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer border-0 p-0 h-[300px]"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-0 h-full">
                  <div className="relative h-full">
                    {isLoading[project.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={mainImage}
                      alt={project.title}
                      className={`w-full h-full object-cover object-[center_40%] transition duration-300 group-hover:scale-110 ${isLoading[project.id] ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => handleImageLoad(project.id.toString())}
                      onError={(e) => {
                        console.error(`Failed to load image: ${mainImage} for project ${project.title}`);
                        handleImageError(project.id.toString());
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <p className="text-white/80">{project.category}</p>
                      <div className="flex gap-2 mt-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > initialDisplayCount && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-2 rounded-full"
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl bg-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{selectedProject?.title}</DialogTitle>
              <DialogClose className="absolute right-4 top-4" />
            </DialogHeader>

            {selectedProject && (
              <div className="p-0 space-y-6">
                {/* Media Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* First Image Carousel */}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-1-${carouselKey}`}
                        options={{
                          type: selectedProject.images.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.images.length > 1,
                          autoplay: selectedProject.images.length > 1,
                          interval: 4000,
                          pauseOnHover: true,
                          pauseOnFocus: true,
                          rewind: true,
                          waitForTransition: true,
                          speed: 400,
                          classes: {
                            arrows: 'splide__arrows',
                            arrow: 'splide__arrow',
                            prev: 'splide__arrow--prev',
                            next: 'splide__arrow--next',
                          },
                          start: 0,
                        }}
                      >
                        {selectedProject.images.map((src, i) => (
                          <SplideSlide key={`${selectedProject.id}-1-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={src}
                                alt={`${selectedProject.title} - Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/placeholder.svg'
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setFullscreenImage(src)
                                  setFullscreenImages(selectedProject.images || [])
                                  setCurrentImageIndex(i)
                                }}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

                  {/* Second Image Carousel */}
                  {selectedProject.secondImages && selectedProject.secondImages.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`carousel-2-${carouselKey}`}
                        options={{
                          type: selectedProject.secondImages.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.secondImages.length > 1,
                          autoplay: selectedProject.secondImages.length > 1,
                          interval: 4000,
                          pauseOnHover: true,
                          pauseOnFocus: true,
                          rewind: true,
                          waitForTransition: true,
                          speed: 400,
                          classes: {
                            arrows: 'splide__arrows',
                            arrow: 'splide__arrow',
                            prev: 'splide__arrow--prev',
                            next: 'splide__arrow--next',
                          },
                          start: 0,
                        }}
                      >
                        {selectedProject.secondImages.map((src, i) => (
                          <SplideSlide key={`${selectedProject.id}-2-${i}`}>
                            <div className="relative group aspect-[3/2]">
                              <img
                                src={src}
                                alt={`${selectedProject.title} - Second Image ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = '/placeholder.svg'
                                }}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setFullscreenImage(src)
                                  setFullscreenImages(selectedProject.secondImages || [])
                                  setCurrentImageIndex(i)
                                }}
                              >
                                <Maximize2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                    </div>
                  )}

                  {/* Video Display */}
                  {selectedProject.videos && selectedProject.videos.length > 0 && (
                    <div className="w-full relative">
                      <Splide
                        key={`video-carousel-${carouselKey}`}
                        options={{
                          type: selectedProject.videos.length > 1 ? 'loop' : 'slide',
                          perPage: 1,
                          perMove: 1,
                          gap: '0.5rem',
                          pagination: false,
                          arrows: selectedProject.videos.length > 1,
                          autoplay: selectedProject.videos.length > 1,
                          interval: 8000,
                          pauseOnHover: true,
                          pauseOnFocus: true,
                          rewind: true,
                          waitForTransition: true,
                          speed: 400,
                          classes: {
                            arrows: 'splide__arrows',
                            arrow: 'splide__arrow',
                            prev: 'splide__arrow--prev',
                            next: 'splide__arrow--next',
                          },
                          start: 0,
                        }}
                      >
                        {selectedProject.videos.map((src, i) => (
                          <SplideSlide key={`${selectedProject.id}-video-${i}`}>
                            <div className="relative group aspect-[3/2] bg-black cursor-pointer" onClick={() => { setCurrentVideoSrc(src); setOpenVideoDialog(true); }}>
                              <Image
                                src={selectedProject.images && selectedProject.images[i] ? selectedProject.images[i] : '/placeholder.svg'}
                                alt={`${selectedProject.title} - Video Poster ${i + 1}`}
                                fill
                                className="object-contain rounded-lg"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button variant="ghost" size="icon" className="bg-black/50 hover:bg-black/70 text-white">
                                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </Button>
                              </div>
                            </div>
                          </SplideSlide>
                        ))}
                      </Splide>
                      <Dialog open={openVideoDialog} onOpenChange={setOpenVideoDialog}>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{selectedProject.title} Video</DialogTitle>
                          </DialogHeader>
                          <div className="aspect-video">
                            {currentVideoSrc && (
                              <video
                                src={currentVideoSrc}
                                controls
                                autoPlay
                                className="w-full h-full object-contain rounded-lg"
                                poster={selectedProject.images && selectedProject.images[0]}
                              >
                                <source src={currentVideoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  {/* Second Video Display */}
                  {selectedProject.secondVideos && selectedProject.secondVideos.length > 0 && (
                    <div className="w-full relative">
                      <div className="relative group aspect-[3/2] bg-black">
                        <video 
                          controls 
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-contain rounded-lg"
                          preload="auto"
                          onLoadedData={(e) => {
                            const video = e.currentTarget;
                            // Add mobile-specific attributes
                            video.setAttribute('playsinline', '');
                            video.setAttribute('webkit-playsinline', '');
                            video.setAttribute('x5-playsinline', '');
                            video.setAttribute('x5-video-player-type', 'h5');
                            video.setAttribute('x5-video-player-fullscreen', 'true');
                            
                            video.play().catch(() => {
                              // Handle autoplay failure
                              console.log('Autoplay failed, waiting for user interaction');
                            });
                          }}
                          onPlay={(e) => {
                            const videos = document.querySelectorAll('video');
                            videos.forEach((v) => {
                              if (v !== e.currentTarget) {
                                v.pause();
                                v.currentTime = 0;
                              }
                            });
                          }}
                        >
                          <source src={selectedProject.secondVideos[0]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">About the Project</h4>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="text-xl font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Fullscreen Image Modal */}
        <Dialog open={!!fullscreenImage} onOpenChange={(open) => !open && setFullscreenImage(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-black/90">
            <DialogHeader className="sr-only">
              <DialogTitle>Fullscreen Image View</DialogTitle>
            </DialogHeader>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={fullscreenImage || ""}
                alt="Fullscreen view"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <DialogClose className="absolute right-4 top-4 text-white hover:text-gray-300" />

              {/* Navigation Arrows */}
              {fullscreenImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => {
                      const newIndex = (currentImageIndex - 1 + fullscreenImages.length) % fullscreenImages.length
                      setCurrentImageIndex(newIndex)
                      setFullscreenImage(fullscreenImages[newIndex])
                    }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => {
                      const newIndex = (currentImageIndex + 1) % fullscreenImages.length
                      setCurrentImageIndex(newIndex)
                      setFullscreenImage(fullscreenImages[newIndex])
                    }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Optional: Add external link button */}
              {fullscreenImage && (
                <a
                  href={fullscreenImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ExternalLink className="h-5 w-5 text-white" />
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

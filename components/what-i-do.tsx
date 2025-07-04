"use client"

import { useState, useEffect } from "react"
import { CuboidIcon as Cube, Camera, Layers, Monitor, Wand2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Cube,
    title: "3D Modeling",
    description: "Creating detailed and precise 3D models for various applications, from characters to environments",
    details: ["Character Modeling", "Hard Surface Modeling", "Organic Modeling", "Prop Design"],
  },
  {
    icon: Camera,
    title: "Animation",
    description: "Bringing characters and objects to life with fluid motion and compelling storytelling",
    details: ["Character Animation", "Motion Graphics", "Visual Effects", "Rigging"],
  },
  {
    icon: Layers,
    title: "Texturing",
    description: "Creating realistic materials and surface details that bring authenticity to 3D assets",
    details: ["PBR Materials", "Hand Painted Textures", "UV Mapping", "Substance Design"],
  },
  {
    icon: Monitor,
    title: "Rendering",
    description: "Producing stunning visual outputs with advanced lighting and composition",
    details: ["Product Visualization", "Architectural Renders", "Character Renders", "Scene Composition"],
  },
]

export function WhatIDo() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-muted" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What I Do</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Services List */}
          <div className="space-y-6">
            {services.map((service, index) => {
              const Icon = service.icon
              const isActive = activeIndex === index

              return (
                <Card
                  key={service.title}
                  className={`transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon className={`w-8 h-8 ${isActive ? "text-primary-foreground" : "text-foreground"}`} />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className={isActive ? "text-primary-foreground/80" : "text-muted-foreground"}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Active Service Details */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6">{services[activeIndex].title} Expertise</h3>
              <div className="grid grid-cols-2 gap-4">
                {services[activeIndex].details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4" />
                    <span className="text-muted-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

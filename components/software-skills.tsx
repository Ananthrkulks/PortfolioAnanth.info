"use client"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Software {
  name: string
  logo: string
  proficiency: number
  category: string
  description: string
}

const software: Software[] = [
  {
    name: "Blender",
    logo: "/placeholder.svg?height=50&width=50&text=Blender",
    proficiency: 95,
    category: "3D Modeling, Product Animation",
    description: "Organic modeling and sculpting",
  },
  {
    name: "Maya",
    logo: "/placeholder.svg?height=50&width=50&text=Maya",
    proficiency: 25,
    category: "3D Character Modeling, Character Animation",
    description: "Advanced character rigging and animation",
  },
  {
    name: "Substance Painter",
    logo: "/placeholder.svg?height=50&width=50&text=Substance",
    proficiency: 50,
    category: "Texturing",
    description: "PBR texturing and materials",
  },
  {
    name: "After Effects",
    logo: "/placeholder.svg?height=50&width=50&text=AE",
    proficiency: 50,
    category: "Video Editing, Compositing",
    description: "Compositing and visual effects",
  },
  {
    name: "AccuRig",
    logo: "/placeholder.svg?height=50&width=50&text=AccuRig",
    proficiency: 70, // Assuming a default value since none was specified
    category: "Rigging",
    description: "Automated character rigging",
  },
  {
    name: "Gaea",
    logo: "/placeholder.svg?height=50&width=50&text=Gaea",
    proficiency: 75,
    category: "Large Environment",
    description: "Terrain generation and landscape design",
  },
  {
    name: "Adobe Illustrator",
    logo: "/placeholder.svg?height=50&width=50&text=AI",
    proficiency: 80,
    category: "Design, Vector Graphics",
    description: "Vector graphics and design",
  },
  {
    name: "ZBrush",
    logo: "/placeholder.svg?height=50&width=50&text=ZBrush",
    proficiency: 20,
    category: "Sculpting, 3D Modeling",
    description: "Digital sculpting and painting",
  },
  {
    name: "Marmoset Toolbag",
    logo: "/placeholder.svg?height=50&width=50&text=Marmoset",
    proficiency: 20,
    category: "Rendering, Baking",
    description: "Real-time rendering and texture baking",
  },
]

export function SoftwareSkills() {
  const [hoveredSoftware, setHoveredSoftware] = useState<string | null>(null)

  return (
    <section className="py-20 bg-muted" id="skills">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Software Skills</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {software.map((item) => {
            const isHovered = hoveredSoftware === item.name

            return (
              <Card
                key={item.name}
                className={`relative transition-all duration-300 ${isHovered ? "scale-105 shadow-lg" : ""}`}
                onMouseEnter={() => setHoveredSoftware(item.name)}
                onMouseLeave={() => setHoveredSoftware(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={item.logo || "/placeholder.svg"} alt={item.name} className="w-8 h-8 object-contain" />
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                    </div>
                    <span className="text-sm font-medium">{item.proficiency}%</span>
                  </div>

                  {/* Progress Bar */}
                  <Progress
                    value={isHovered ? item.proficiency : 0}
                    className="h-2 transition-all duration-500"
                    style={{ transitionDelay: "150ms" }}
                  />

                  {/* Category Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.category.split(", ").map((cat, index) => (
                      <Badge key={index} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Gamepad, Building2, Clapperboard, ShoppingBag, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExpertiseField {
  title: string
  icon: React.ElementType
  description: string
  skills: string[]
}

const expertiseFields: ExpertiseField[] = [
  {
    title: "Game Assets",
    icon: Gamepad,
    description: "Creating high-quality assets for AAA and indie game projects",
    skills: ["Character Models", "Props", "Environments", "Real-time Optimization"],
  },
  {
    title: "Architectural Visualization",
    icon: Building2,
    description: "Photorealistic architectural visualization and walkthroughs",
    skills: ["Interior Design", "Exterior Renders", "Virtual Tours"],
  },
  {
    title: "Film & Animation",
    icon: Clapperboard,
    description: "Visual effects and animation for film and television",
    skills: ["Character Animation", "VFX Integration", "Scene Assembly"],
  },
  {
    title: "Product Visualization",
    icon: ShoppingBag,
    description: "Compelling product presentations for marketing",
    skills: ["Product Renders", "Packaging Design", "Marketing Assets"],
  },
  {
    title: "Ads Creation",
    icon: Video,
    description: "Engaging advertisements and promotional content",
    skills: ["Commercial Animations", "Social Media Content", "Brand Visualization"],
  },
]

export function Expertise() {
  const [selectedField, setSelectedField] = useState<ExpertiseField | null>(null)

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Fields of Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseFields.map((field) => {
            const Icon = field.icon
            const isSelected = selectedField?.title === field.title

            return (
              <div
                key={field.title}
                className={`transition-all duration-300 ${
                  isSelected ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Card
                  className={`group cursor-pointer h-full ${
                    isSelected ? "shadow-lg" : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedField(isSelected ? null : field)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-3 rounded-lg ${
                          isSelected ? "bg-primary" : "bg-secondary group-hover:bg-primary/20"
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? "text-primary-foreground" : "text-foreground"}`} />
                      </div>
                      <h3 className="text-xl font-semibold">{field.title}</h3>
                    </div>

                    <p
                      className={`text-muted-foreground mb-4 ${
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {field.description}
                    </p>

                    {isSelected && (
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        {field.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="justify-center">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

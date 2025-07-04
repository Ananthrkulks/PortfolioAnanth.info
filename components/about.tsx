'use client'

import { Github, Linkedin, FileText, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ResumeContent } from "./resume-content"
import { DownloadButton } from "./download-button"
import Link from "next/link"
import { useState } from "react"

export function About() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const handleResumeClick = () => {
    const link = document.createElement('a')
    link.href = '/Ananth_R_Kulkarni.pdf'
    link.download = 'Ananth_R_Kulkarni.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <section className="py-20" id="about">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img src="/images/ananth.jpg" alt="Ananth R Kulkarni" className="rounded-lg w-full" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-muted-foreground mb-6">
                I am a passionate 3D generalist. I have freelancing experience over 1 year handling startups to design and
                visualize their product and their marketing and working and personal projects and video games. My passion
                lies in creating compelling visuals and experiences that push the boundaries of digital artistry.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold mb-2">1+</div>
                    <div className="text-sm text-muted-foreground">Years of Experience</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Clients</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold mb-2">Freelancer</div>
                    <div className="text-sm text-muted-foreground">on Upwork</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground">
                    Student in Asian Academy of Films and Television (enrolled for diploma course)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground">Computer Science and Design Engineer in VTU</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-muted-foreground">Freelancer specializing in 3D visualization and animation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                  <a href="https://github.com/Ananthrkulks" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9" asChild>
                  <a href="https://www.linkedin.com/in/ananthrkulkarni/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button 
                  className="relative group bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                  onClick={handleResumeClick}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                <Button 
                  className="relative group bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                  asChild
                >
                  <Link href="/know-more">
                    <FileText className="w-4 h-4 mr-2" />
                    Know More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhatIDo } from "@/components/what-i-do"
import { Portfolio } from "@/components/portfolio"
import { SoftwareSkills } from "@/components/software-skills"
import { Expertise } from "@/components/expertise"
import { TestimonialTabs } from "@/components/testimonial-tabs"
import { FaqSection } from "@/components/faq-section"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    // Restore scroll position if coming back from Know More page
    const scrollPosition = sessionStorage.getItem('scrollPosition')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <WhatIDo />
        <Portfolio />
        <SoftwareSkills />
        <Expertise />
        <TestimonialTabs />
        <FaqSection />
        <About />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

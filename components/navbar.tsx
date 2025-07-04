"use client"

import { useState, useEffect } from "react"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CommandMenu } from "@/components/command-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHomePage = pathname === "/"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="group relative px-2 py-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isHomePage ? (
              <>
                {["Work", "Skills", "About"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group relative px-2 py-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </>
            ) : (
              <>
                <Link
                  href="/#work"
                  className="group relative px-2 py-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">Work</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/#skills"
                  className="group relative px-2 py-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">Skills</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  href="/#about"
                  className="group relative px-2 py-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
            <Button asChild variant="outline" className="border-foreground/20 hover:border-foreground/50">
              <Link href="/#contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="group relative block py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">Home</span>
                </Link>
                {isHomePage ? (
                  <>
                    {["Work", "Skills", "About"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="group relative block py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        <span className="relative z-10">{item}</span>
                        <span className="absolute bottom-2 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-24"></span>
                      </a>
                    ))}
                  </>
                ) : (
                  <>
                    <Link
                      href="/#work"
                      className="group relative block py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <span className="relative z-10">Work</span>
                    </Link>
                    <Link
                      href="/#skills"
                      className="group relative block py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <span className="relative z-10">Skills</span>
                    </Link>
                    <Link
                      href="/#about"
                      className="group relative block py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      <span className="relative z-10">About</span>
                    </Link>
                  </>
                )}
                <Button asChild className="mt-2">
                  <Link href="/#contact">Contact</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CommandMenu open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </nav>
  )
}

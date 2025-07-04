"use client"

import * as React from "react"
import {
  User,
  Palette,
  CuboidIcon as Cube,
  Camera,
  Layers,
  Monitor,
  Gamepad,
  Building2,
  Clapperboard,
  Mail,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const navigateTo = (sectionId: string) => {
    onOpenChange(false)
    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => navigateTo("home")}>
            <User className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("services")}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Services</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("portfolio")}>
            <Cube className="mr-2 h-4 w-4" />
            <span>Portfolio</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("skills")}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Skills</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("contact")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Services">
          <CommandItem onSelect={() => navigateTo("services")}>
            <Cube className="mr-2 h-4 w-4" />
            <span>3D Modeling</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("services")}>
            <Camera className="mr-2 h-4 w-4" />
            <span>Animation</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("services")}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Texturing</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("services")}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Rendering</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Expertise">
          <CommandItem onSelect={() => navigateTo("expertise")}>
            <Gamepad className="mr-2 h-4 w-4" />
            <span>Game Assets</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("expertise")}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>Architectural Visualization</span>
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("expertise")}>
            <Clapperboard className="mr-2 h-4 w-4" />
            <span>Film & Animation</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

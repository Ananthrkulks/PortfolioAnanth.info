/**
 * Media Manager
 *
 * This file provides utilities for managing media files in your portfolio.
 *
 * How to use:
 * 1. Place your media files in the appropriate folders:
 *    - Images: /public/images/portfolio/
 *    - Videos: /public/videos/
 *
 * 2. Update the portfolioWorks array in components/hero.tsx to reference your files
 *
 * 3. For other sections, update the image paths directly in the component files
 */

export interface MediaItem {
  id: string
  title: string
  type: "image" | "video"
  path: string
  description?: string
  tags?: string[]
}

/**
 * Example of how to organize your media files
 */
export const mediaStructure = {
  images: {
    portfolio: "/images/portfolio/", // For hero and portfolio sections
    about: "/images/about/", // For about section
    clients: "/images/clients/", // For client logos
    projects: "/images/projects/", // For detailed project images
  },
  videos: {
    portfolio: "/videos/", // For hero and portfolio videos
  },
  documents: {
    resume: "/resume.pdf", // For resume
  },
}

/**
 * Helper function to get the correct path for a media item
 */
export function getMediaPath(type: "image" | "video", filename: string): string {
  if (type === "image") {
    return `/images/portfolio/${filename}`
  } else {
    return `/videos/${filename}`
  }
}

/**
 * Example of how to add a new media item to your portfolio
 */
export function addMediaItem(item: MediaItem): MediaItem[] {
  // This is just an example - in a real application, you would
  // save this to a database or update a configuration file
  const existingItems: MediaItem[] = []
  return [...existingItems, item]
}

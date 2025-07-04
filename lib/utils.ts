import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a folder structure for media files
 */
export function createMediaFolders() {
  // This is a client-side utility function
  // In a real application, this would be a server-side function
  // that creates the necessary folders if they don't exist

  const folders = [
    "/public/images/portfolio",
    "/public/images/about",
    "/public/images/clients",
    "/public/videos",
    "/public/documents",
  ]

  console.log("Media folders structure:", folders)
  return folders
}

/**
 * Formats a file size in bytes to a human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

/**
 * Validates a file type
 */
export function isValidFileType(file: File, type: "image" | "video" | "document"): boolean {
  const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"]
  const videoTypes = ["video/mp4", "video/quicktime", "video/webm"]
  const documentTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]

  switch (type) {
    case "image":
      return imageTypes.includes(file.type)
    case "video":
      return videoTypes.includes(file.type)
    case "document":
      return documentTypes.includes(file.type)
    default:
      return false
  }
}

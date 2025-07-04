import { Github, Linkedin, Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className={className}
      fill="currentColor"
    >
      <path d="M 25.66 73.377 H 0 V 16.622 h 27.443 c 6.987 0.114 12.024 2.213 14.987 6.24 c 1.792 2.49 2.698 5.5 2.698 8.954 c 0 3.567 -0.929 6.494 -2.761 8.7 c -0.689 0.836 -1.601 1.625 -2.724 2.355 c 2.098 1.083 3.754 2.563 4.939 4.418 c 1.521 2.357 2.292 5.237 2.292 8.561 c 0 3.442 -0.871 6.562 -2.587 9.272 c -1.098 1.803 -2.487 3.344 -4.119 4.566 c -1.85 1.42 -4.065 2.407 -6.576 2.928 C 31.149 73.121 28.48 73.377 25.66 73.377 z M 2 71.377 h 23.66 c 2.685 0 5.218 -0.242 7.529 -0.719 c 2.212 -0.458 4.155 -1.32 5.772 -2.563 c 1.437 -1.076 2.654 -2.429 3.628 -4.028 c 1.52 -2.4 2.286 -5.16 2.286 -8.217 c 0 -2.934 -0.664 -5.45 -1.974 -7.478 l -0.003 -0.004 c -1.277 -1.999 -3.233 -3.492 -5.813 -4.437 l -2.154 -0.789 l 2.044 -1.042 c 1.709 -0.871 3.005 -1.833 3.852 -2.861 c 1.55 -1.866 2.302 -4.293 2.302 -7.425 c 0 -3.026 -0.779 -5.643 -2.315 -7.777 c -2.603 -3.538 -6.984 -5.313 -13.386 -5.417 H 2 V 71.377 z M 69.899 73.021 c -5.422 0 -10.281 -1.698 -14.443 -5.047 c -4.217 -3.416 -6.354 -8.964 -6.354 -16.491 c 0 -7.045 1.913 -12.544 5.688 -16.342 c 3.788 -3.806 8.747 -5.735 14.741 -5.735 c 3.537 0 6.777 0.646 9.631 1.921 c 2.903 1.303 5.323 3.376 7.191 6.164 c 1.673 2.426 2.78 5.294 3.286 8.515 l 0.001 0.008 c 0.28 1.886 0.398 4.561 0.35 7.949 l -0.015 0.985 h -28.47 c 0.316 3.054 1.482 5.16 3.548 6.422 c 1.39 0.883 3.111 1.326 5.132 1.326 c 2.124 0 3.777 -0.514 5.053 -1.57 c 0.689 -0.556 1.313 -1.356 1.861 -2.39 l 0.282 -0.53 h 12.192 l -0.132 1.117 c -0.3 2.54 -1.667 5.116 -4.064 7.658 C 81.692 70.985 76.481 73.021 69.899 73.021 z M 69.531 31.406 c -5.52 0 -9.877 1.683 -13.323 5.145 c -3.388 3.409 -5.105 8.433 -5.105 14.932 c 0 6.895 1.888 11.919 5.61 14.935 c 3.795 3.054 8.232 4.604 13.187 4.604 c 6 0 10.716 -1.817 14.016 -5.402 c 1.734 -1.84 2.847 -3.653 3.323 -5.412 h -8.671 c -0.608 1.024 -1.301 1.854 -2.063 2.469 c -1.616 1.339 -3.745 2.021 -6.318 2.021 c -2.406 0 -4.489 -0.548 -6.189 -1.629 c -2.852 -1.742 -4.391 -4.8 -4.562 -9.079 l -0.042 -1.04 H 88 c 0.014 -2.81 -0.1 -5.038 -0.337 -6.635 c -0.458 -2.921 -1.455 -5.511 -2.963 -7.698 c -1.664 -2.481 -3.801 -4.316 -6.355 -5.462 C 75.75 31.994 72.786 31.406 69.531 31.406 z M 25.199 63.867 H 12.628 V 47.275 h 12.753 c 2.536 0.024 4.461 0.357 5.896 1.021 c 2.656 1.208 4.063 3.55 4.063 6.773 c 0 3.759 -1.396 6.36 -4.149 7.732 C 29.721 63.52 27.764 63.867 25.199 63.867 z M 14.628 61.867 h 10.571 c 2.222 0 3.94 -0.289 5.105 -0.859 c 2.04 -1.017 3.035 -2.96 3.035 -5.939 c 0 -2.448 -0.947 -4.068 -2.896 -4.955 c -1.161 -0.536 -2.865 -0.817 -5.071 -0.839 H 14.628 V 61.867 z M 79.422 48.183 H 59.523 l 0.166 -1.144 c 0.4 -2.768 1.413 -4.999 3.008 -6.628 c 1.642 -1.691 3.941 -2.55 6.834 -2.55 c 2.661 0 4.927 0.797 6.733 2.369 c 1.833 1.577 2.871 3.894 3.082 6.883 L 79.422 48.183 z M 61.881 46.183 h 15.35 c -0.305 -1.931 -1.054 -3.39 -2.275 -4.441 c -1.437 -1.249 -3.26 -1.881 -5.425 -1.881 c -2.364 0 -4.131 0.637 -5.401 1.946 C 63.052 42.907 62.299 44.375 61.881 46.183 z M 25.214 40.21 H 12.628 V 26.131 h 11.191 c 2.702 0 4.983 0.306 6.781 0.908 c 1.688 0.697 3.623 2.28 3.623 6 c 0 2.668 -0.908 4.576 -2.7 5.668 C 29.888 39.704 27.766 40.21 25.214 40.21 z M 14.628 38.21 h 10.586 c 2.178 0 3.951 -0.407 5.268 -1.211 c 1.172 -0.714 1.741 -2.01 1.741 -3.96 c 0 -2.159 -0.738 -3.47 -2.324 -4.127 c -1.527 -0.51 -3.595 -0.78 -6.081 -0.78 h -9.191 V 38.21 z M 81.472 26.371 H 57.42 v -7.477 h 24.052 V 26.371 z M 59.42 24.371 h 20.05 l 0.002 -3.477 H 59.42 V 24.371 z" />
    </svg>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ananth R Kulkarni</h3>
            <p className="text-muted-foreground">
              Creating stunning 3D experiences and pushing the boundaries of digital artistry.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
                Portfolio
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
                Services
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Ananthrkulks" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/ananthrkulkarni/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.behance.net/" target="_blank" rel="noopener noreferrer" aria-label="Behance">
                  <BehanceIcon className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">© {currentYear} Ananth R Kulkarni. All rights reserved.</p>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary" />
            <span>by Ananth R Kulkarni</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

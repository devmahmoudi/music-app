import { Music, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-semibold">Music App</span>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            All rights reserved.
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>© {currentYear}</span>
            <span>Made with</span>
            <Heart className="h-3 w-3 text-red-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
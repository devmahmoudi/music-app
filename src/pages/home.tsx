import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="h-4 w-4" />
          Welcome to your new journey
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-top-6 duration-700">
          Where <span className="text-primary">elegance</span> meets
          <span className="block mt-2">simplicity</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-top-8 duration-900">
          A thoughtfully crafted application built with React, Vite, and Shadcn UI. 
          Experience the beauty of clean design and intuitive navigation.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95"
          >
            Discover More
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View Shadcn Docs
          </a>
        </div>
      </div>
    </div>
  )
}
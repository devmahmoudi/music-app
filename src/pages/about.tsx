import { Link } from "react-router-dom"
import { ArrowLeft, Code, Palette, Zap } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Navigation */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About This Project</h1>
          <p className="text-xl text-muted-foreground">
            A modern web application built with attention to detail and user experience.
          </p>
        </div>
        
        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Philosophy</h2>
              <p className="text-muted-foreground">
                We believe in creating interfaces that are both beautiful and functional. 
                Every component is designed with accessibility and performance in mind, 
                ensuring a seamless experience for all users.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-primary mt-0.5" />
                  <span>React with TypeScript for robust type safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-0.5" />
                  <span>Vite for instant server start and fast refresh</span>
                </li>
                <li className="flex items-start gap-3">
                  <Palette className="h-5 w-5 text-primary mt-0.5" />
                  <span>Shadcn UI components for consistent design</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="space-y-3">
                {[
                  "Responsive design that works on all devices",
                  "Dark mode with smooth transitions",
                  "Client-side routing with React Router",
                  "Clean, minimalistic interface",
                  "Optimized for performance",
                  "Easy to customize and extend"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t">
              <p className="text-muted-foreground mb-4">
                This project serves as a foundation for building modern web applications. 
                Feel free to explore, modify, and build upon it.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
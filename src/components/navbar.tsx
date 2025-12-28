import { Link, useLocation } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="font-semibold text-lg tracking-tight">
            <Link to="/">Music App</Link>
          </div>
          
          {/* Navigation Items - Centered */}
          <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
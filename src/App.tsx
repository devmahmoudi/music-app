import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./providers/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
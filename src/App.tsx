import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "./providers/theme-provider"
import Footer from "./components/footer"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer/>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
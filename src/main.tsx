import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { SupabaseProvider } from "./providers/supabase-provider"
import { ThemeProvider } from "./providers/theme-provider"
import router from "./router"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SupabaseProvider>
      <ThemeProvider defaultTheme="light" storageKey="app-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </SupabaseProvider>
  </React.StrictMode>
)
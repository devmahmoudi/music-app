import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./pages/home"
import About from "./pages/about"
import NotFound from "./pages/not-found"
import Artists from "./pages/artists"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
      index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "artists",
        element: <Artists />,
      },
      // TODO: Implement these pages later
      // {
      //   path: "music",
      //   element: <Music />,
      // },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
])

export default router
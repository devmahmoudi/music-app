import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App"
import Home from "./pages/home"
import About from "./pages/about"
import NotFound from "./pages/not-found"

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
      // TODO: Implement these pages later
      // {
      //   path: "artists",
      //   element: <Artists />,
      // },
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
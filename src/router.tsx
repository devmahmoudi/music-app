import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import About from "./pages/about";
import NotFound from "./pages/not-found";
import Artists from "./pages/artist/artists";
import Artist from "./pages/artist/artist";

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
      {
        path: "artists/:slug",
        element: <Artist />,
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
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import About from "./pages/about";
import NotFound from "./pages/not-found";
import Artists from "./pages/artist/artists";
import Artist from "./pages/artist/artist";
import MusicDetailPage from "./pages/music/music";
import MusicsPage from "./pages/music/musics";

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
      {
        path: "music",
        element: <MusicsPage />,
      },
      {
        path: "music/:slug", 
        element: <MusicDetailPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

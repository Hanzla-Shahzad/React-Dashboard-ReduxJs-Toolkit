import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Main from "./components/main";
import PostsData from "./components/postData";
import CommentsUi from "./components/commentsData";
import AlbumUi from "./components/albumData";
import AlbumPhotos from "./components/albumPhotos";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Main />
        </>
      ),
    },
    {
      path: "/posts/:id",
      element: (
        <>
          <Header />
          <PostsData />
        </>
      ),
    },
    {
      path: "/comments/:id",
      element: (
        <>
          <Header />
          <CommentsUi />
        </>
      ),
    },
    {
      path: "/albums/:id",
      element: (
        <>
          <Header />
          <AlbumUi />
        </>
      ),
    },
    {
      path: "/albums/photos/:id",
      element: (
        <>
          <Header />
          <AlbumPhotos />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

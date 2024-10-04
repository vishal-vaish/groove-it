import {createBrowserRouter, Navigate} from "react-router-dom";
import RootLayout from "../pages/_layout/RootLayout.jsx";
import Error from "../pages/_root/Error.jsx";
import Discover from "../pages/_root/Discover.jsx";
import Search from "../pages/_root/Search.jsx";
import Browse from "../pages/_root/Browse.jsx";
import AuthLayout from "../pages/_layout/AuthLayout.jsx";
import Login from "../pages/_auth/Login.jsx";
import Register from "../pages/_auth/Register.jsx";
import ForgetPassword from "../pages/_auth/ForgetPassword.jsx";
import VerifyForgetPass from "../pages/_auth/VerifyForgetPass.jsx";
import Profile from "../pages/_root/Profile.jsx";
import Notifications from "../pages/_root/Notifications.jsx";
import FavouritePlaylists from "../pages/_root/FavouritePlaylists.jsx";
import MyPlaylists from "../pages/_root/MyPlaylists.jsx";
import MyPlaylist from "../pages/_root/MyPlaylist.jsx";
import Artist from "../pages/_root/Artist.jsx";
import Genre from "../pages/_root/Genre.jsx";
import Playlist from "../pages/_root/Playlist.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        element: <RootLayout/>,
        errorElement: <Error/>,
        children: [
          {index: true, element: <Navigate to="/discover" replace/>},
          {
            path: "/discover",
            element: <Discover/>,
          },
          {
            path: "/browse",
            element: <Browse/>,
          },
          {
            path: "/search",
            element: <Search/>,
          },
          {
            path: "/profile",
            element: <Profile/>,
          }, {
            path: "/Notifications",
            element: <Notifications/>,
          },
          {
            path: "/favourite-playlists",
            element: <FavouritePlaylists/>,
          },
          {
            path: "/my-playlist",
            element: <MyPlaylists/>,
          },
          {
            path: "/my-playlist/:id",
            element: <MyPlaylist/>,
          },
          {
            path: "/genre/:id",
            element: <Genre/>,
          },
          {
            path: "/artist/:id",
            element: <Artist/>,
          },
          {
            path: "/:section/:id",
            element: <Playlist/>,
          },
        ],
      },
      {
        element: <AuthLayout/>,
        errorElement: <Error/>,
        children: [
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/register",
            element: <Register/>
          },
          {
            path: "/reset-password",
            element: <ForgetPassword/>
          },
          {
            path: "/verify-reset-password",
            element: <VerifyForgetPass/>,
          },
        ]
      },
      {
        path: "*",
        element: <Error/>,
      },
    ],
  },
]);
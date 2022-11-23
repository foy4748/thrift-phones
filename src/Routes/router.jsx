import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Shared/MainLayout";

import Home from "../components/Home/Home";

// Route handlers
import ErrorPage from "../components/Shared/ErrorPage";
//import PrivateRoute from "./PrivateRoute";

// Auth Pages
import Login from "../components/AuthPages/Login";
import Register from "../components/AuthPages/Register";

// Testing Purpose
//import Test from "../components/Shared/Test";

// Blog Page
import Blogs from "../components/Blogs/Blogs";

// Private Routes ------

const routerObj = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default router;

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Shared/MainLayout";

import Home from "../components/Home/Home";

// Route handlers
import ErrorPage from "../components/Shared/ErrorPage";
//import PrivateRoute from "./PrivateRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// Auth Pages
import Login from "../components/AuthPages/Login";
import Register from "../components/AuthPages/Register";

// Testing Purpose
//import Test from "../components/Shared/Test";

// Buyer Pages
import CategoryProducts from "../components/BuyerPages/CategoryProducts";

// Seller Pages
import AddAProduct from "../components/SellerPages/AddAProduct";
import MyProducts from "../components/SellerPages/MyProducts";

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
        path: "/category/:categoryId",
        element: <CategoryProducts />,
      },
      {
        path: "/add-product",
        element: (
          <RoleProtectedRoute role="seller">
            <AddAProduct />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <RoleProtectedRoute role="seller">
            <MyProducts />
          </RoleProtectedRoute>
        ),
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

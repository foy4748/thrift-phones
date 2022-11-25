import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Shared/MainLayout";

import Home from "../components/Home/Home";

// Route handlers
import ErrorPage from "../components/Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

// Auth Pages
import Login from "../components/AuthPages/Login";
import Register from "../components/AuthPages/Register";

// Testing Purpose
//import Test from "../components/Shared/Test";

// Buyer Pages
import CategoryProducts from "../components/BuyerPages/CategoryProducts";
import MyOrders from "../components/BuyerPages/MyOrders";

// Seller Pages
import AddAProduct from "../components/SellerPages/AddAProduct";
import MyProducts from "../components/SellerPages/MyProducts";

// Admin Pages
import AllBuyers from "../components/AdminPages/AllBuyers";
import AllSellers from "../components/AdminPages/AllSellers";

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
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/add-product",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="seller">
              <AddAProduct />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="seller">
              <MyProducts />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-buyers",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="admin">
              <AllBuyers />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-sellers",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="admin">
              <AllSellers />
            </RoleProtectedRoute>
          </PrivateRoute>
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

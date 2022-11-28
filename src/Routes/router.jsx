import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Shared/MainLayout";

import Home from "../components/Home/Home";
import AuthContext from "../Contexts/AuthContext";

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
import MyWishList from "../components/BuyerPages/MyWishList";
import PaymentPage from "../components/BuyerPages/PaymentPage";

// Seller Pages
import AddAProduct from "../components/SellerPages/AddAProduct";
import MyProducts from "../components/SellerPages/MyProducts";

// Admin Pages
import AllBuyers from "../components/AdminPages/AllBuyers";
import AllSellers from "../components/AdminPages/AllSellers";

// Blog Page
import Blogs from "../components/Blogs/Blogs";

// Dashboard Page
import DashboardLayout from "../components/Shared/DashboardLayout";
import DashboardNavLinks from "../components/DashboardPages/DashboardNavLinks";

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
        element: (
          <PrivateRoute>
            <CategoryProducts />
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
  {
    path: "/dashboard",
    element: (
      <AuthContext>
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      </AuthContext>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <div>
            <h1>Select a Route ⬆</h1>
          </div>
        ),
      },

      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="buyer">
              <MyOrders />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-wishlist",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="buyer">
              <MyWishList />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:product_id",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="buyer">
              <PaymentPage />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="seller">
              <AddAProduct />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="seller">
              <MyProducts />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="admin">
              <AllBuyers />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <PrivateRoute>
            <RoleProtectedRoute role="admin">
              <AllSellers />
            </RoleProtectedRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routerObj);

export default router;

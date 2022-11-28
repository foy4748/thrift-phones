import { NavLink } from "react-router-dom";
import useCheckRole from "../../Hooks/useCheckRole";
import Loader from "../Shared/Loader";

import { userContext } from "../../Contexts/AuthContext";
import { useContext, useEffect } from "react";

export default function DashboardNavNavLinks() {
  const { activeUser, authLoading } = useContext(userContext);
  const [buyerRole, buyerRoleLoading] = useCheckRole(activeUser?.uid, "buyer");
  const [sellerRole, sellerRoleLoading] = useCheckRole(
    activeUser?.uid,
    "seller"
  );
  const [adminRole, adminRoleLoading] = useCheckRole(activeUser?.uid, "admin");
  const privateNavItems = () => {
    const activeStyle = {
      color: "white",
      backgroundColor: "var(--primary-color)",
      padding: "0 0.5rem",
      borderRadius: "3rem",
    };
    if (buyerRole && !buyerRoleLoading) {
      return (
        <>
          <li className="m-0 p-2">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard/my-orders"
            >
              My Orders
            </NavLink>
          </li>
          <li className="m-0 p-2">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard/my-wishlist"
            >
              My Wish List
            </NavLink>
          </li>
        </>
      );
    }

    if (adminRole && !adminRoleLoading) {
      return (
        <>
          <li className="m-0 p-2">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard/all-buyers"
            >
              All Buyers
            </NavLink>
          </li>
          <li className="m-0 p-2">
            <NavLink to="/dashboard/all-sellers">All Sellers</NavLink>
          </li>
        </>
      );
    }

    if (sellerRole && !sellerRoleLoading) {
      return (
        <>
          <li className="m-0 p-2">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard/add-product"
            >
              Add a product
            </NavLink>
          </li>
          <li className="m-0 p-2">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard/my-products"
            >
              My Products
            </NavLink>
          </li>
        </>
      );
    }
  };
  if (
    adminRoleLoading ||
    sellerRoleLoading ||
    buyerRoleLoading ||
    authLoading
  ) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <section>
      <div className="d-lg-flex align-items-center">
        <h1 className="h4 m-0 p-0">Dashboard</h1>
        <ul className="d-flex my-3 p-2">{privateNavItems()}</ul>
      </div>
    </section>
  );
}

///////////
// Role Based Routes

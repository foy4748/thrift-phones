import Loader from "../components/Shared/Loader";

import { useLocation, Navigate } from "react-router-dom";

import { userContext, auth } from "../Contexts/AuthContext";
import { useContext } from "react";

import useCheckRole from "../Hooks/useCheckRole";

export default function RoleProtectedRoute({ children, role }) {
  const { authLoading, activeUser } = useContext(userContext);
  const location = useLocation();
  const [userRole, userRoleLoading] = useCheckRole(activeUser?.uid, role);

  if (authLoading || userRoleLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (activeUser && userRole) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

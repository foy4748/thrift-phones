import Loader from "../components/Shared/Loader";

import { useLocation, Navigate } from "react-router-dom";

import { userContext, auth } from "../Contexts/AuthContext";
import { useContext } from "react";

import useCheckRole from "../Hooks/useCheckRole";
import toast from "react-hot-toast";

export default function RoleProtectedRoute({ children, role }) {
  const { authLoading, activeUser, logOutHandler } = useContext(userContext);
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

  logOutHandler()
    .then(() => {
      toast.error(`Please, Login using ${role.toUpperCase()} account`);
    })
    .catch((error) => console.error(error));

  return <Navigate to="/login" state={{ from: location }} replace />;
}

import Loader from "../components/Shared/Loader";

import { useLocation, Navigate } from "react-router-dom";

import { userContext, auth } from "../Contexts/AuthContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const activeUser = auth.currentUser;
  const location = useLocation();
  const { authLoading: Loading } = useContext(userContext);

  if (Loading) {
    return (
      <div>
        <Loader />{" "}
      </div>
    );
  }
  if (activeUser) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}

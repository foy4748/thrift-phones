import { useState, useEffect } from "react";
import axiosClient from "../axios";

export default function useCheckRole(uid, role) {
  const [userRoleLoading, setUserRoleLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (uid) {
      axiosClient(`/users/${uid}`)
        .then(({ data }) => {
          if (data?.role?.includes(role)) {
            setUserRole(true);
            setUserRoleLoading(false);
          } else {
            setUserRole(false);
            setUserRoleLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setUserRoleLoading(false);
        });
    }
  }, [uid, role]);

  return [userRole, userRoleLoading];
}

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState, useEffect } from "react";

export default function useCheckRole(uid, role) {
  const [userRoleLoading, setUserRoleLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (uid) {
      fetch(`${SERVER}/users/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.role.includes(role)) {
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
  }, []);

  return [userRole, userRoleLoading];
}

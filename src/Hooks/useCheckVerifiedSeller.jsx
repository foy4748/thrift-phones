const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState, useEffect } from "react";

export default function useCheckVerifiedSeller(seller_uid) {
  const [isVefifiedSeller, setIsVerifiedSeller] = useState(false);
  useEffect(() => {
    const authtoken = window.localStorage.getItem("authtoken");
    const url = `${SERVER}/users/${seller_uid}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(({ verified }) => setIsVerifiedSeller(verified ? verified : false))
      .catch((error) => {
        console.error(error);
      });
  }, [seller_uid]);

  return [isVefifiedSeller];
}

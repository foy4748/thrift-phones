import { useState, useEffect } from "react";
import axiosClient from "../axios";

export default function useCheckVerifiedSeller(seller_uid) {
  const [isVefifiedSeller, setIsVerifiedSeller] = useState(false);
  useEffect(() => {
    const url = `/users/${seller_uid}`;

    axiosClient
      .get(url)
      .then(({ data }) => setIsVerifiedSeller(data?.verified || false))
      .catch((error) => {
        console.error(error);
      });
  }, [seller_uid]);

  return [isVefifiedSeller];
}

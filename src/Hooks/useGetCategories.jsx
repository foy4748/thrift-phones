const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useEffect, useState } from "react";
export default function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    fetch(`${SERVER}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch((error) => console.error(error));
  });

  return [categories, categoriesLoading];
}

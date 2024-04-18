import { useEffect, useState } from "react";
import axiosClient from "../axios";
export default function useGetCategories() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  useEffect(() => {
    axiosClient
      .get(`/categories`)
      .then(({ data }) => {
        setCategories(data);
        setCategoriesLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return [categories, categoriesLoading];
}

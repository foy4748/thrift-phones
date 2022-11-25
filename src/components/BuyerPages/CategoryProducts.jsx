const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../../Contexts/AuthContext";
import { useContext } from "react";

import { Row, Container } from "react-bootstrap";
import Loader from "../Shared/Loader";

import ProductCard from "../Shared/ProductCard";
import BookingModal from "./BookingModal";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [activeProduct, setActiveProduct] = useState(null);
  const { activeUser } = useContext(userContext);

  const { data: categoryProducts, status } = useQuery({
    queryKey: [categoryId],
    queryFn: async () => {
      const url = `${SERVER}/products?categoryId=${categoryId}`;
      const categoryName = await fetch(
        `${SERVER}/categories?categoryId=${categoryId}`
      );
      const res = await fetch(url);

      const category = await categoryName.json();
      const products = await res.json();
      const data = { category: category[0], products };
      return data;
    },
  });

  // Modal States
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleClose = () => setIsOpenBookingModal(false);
  const handleOpen = (product_id) => {
    const activeProduct = categoryProducts.products.find(
      (itm) => itm._id === product_id
    );
    setActiveProduct(activeProduct);
    setIsOpenBookingModal(true);
  };

  if (status === "loading") {
    return <Loader />;
  }

  const payload = {
    isOpenBookingModal,
    handleClose,
    activeProduct,
    activeUser,
  };
  return (
    <div>
      <BookingModal payload={payload} />
      <h1>{categoryProducts.category.category_name}</h1>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {categoryProducts.products.length &&
            categoryProducts.products.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleOpen={handleOpen}
                />
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

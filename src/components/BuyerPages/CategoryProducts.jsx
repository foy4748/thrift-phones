const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Row, Container, Modal, Button } from "react-bootstrap";
import Loader from "../Shared/Loader";
import ProductCard from "../Shared/ProductCard";

export default function CategoryProducts() {
  const { categoryId } = useParams();

  // Modal States
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleClose = () => setIsOpenBookingModal(false);
  const handleOpen = () => setIsOpenBookingModal(true);

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
  if (status === "loading") {
    return <Loader />;
  }

  const BookingModal = () => {
    return (
      <>
        <Modal show={isOpenBookingModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <div>
      <BookingModal />
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

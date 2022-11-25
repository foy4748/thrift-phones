const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userContext } from "../../Contexts/AuthContext";
import { useContext } from "react";

import { Row, Container, Modal, Button, Form } from "react-bootstrap";
import Loader from "../Shared/Loader";
import ProductCard from "../Shared/ProductCard";

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
    console.log(activeProduct);
    setActiveProduct(activeProduct);
    setIsOpenBookingModal(true);
  };

  const handleSubmit = () => console.log(activeUser, activeProduct);

  if (status === "loading") {
    return <Loader />;
  }

  const BookingModal = () => {
    return (
      <>
        <Modal show={isOpenBookingModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book: {activeProduct?.productName}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="your-name">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Your Name"
                  value={activeUser?.displayName}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="your-email">
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  disabled
                  type="email"
                  placeholder="Your Email"
                  value={activeUser?.email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="booking-product">
                <Form.Label>Booking Product</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Booking Product"
                  value={activeProduct?.productName}
                />
              </Form.Group>
              <div className="d-flex">
                <Form.Group className="mb-3" controlId="original-price">
                  <Form.Label>Original Price</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    placeholder="Original Price"
                    value={activeProduct?.originalPrice}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="resale-price">
                  <Form.Label>
                    <strong> Resale Price</strong>
                  </Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    placeholder="Resale Price"
                    value={activeProduct?.resalePrice}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="contact-phone">
                <Form.Label>
                  <strong> Contact Phone no.</strong>
                </Form.Label>
                <Form.Control type="tel" placeholder="Contact Phone no." />
              </Form.Group>
              <Form.Group className="mb-3" controlId="meeting-location">
                <Form.Label>
                  <strong>Meeting Location</strong>
                </Form.Label>
                <Form.Control type="text" placeholder="Meeting Location" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <input type="submit" value="Submit" />
            </Modal.Footer>
          </Form>
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

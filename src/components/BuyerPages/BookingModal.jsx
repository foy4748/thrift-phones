import { Modal, Button, Form } from "react-bootstrap";
import Loader from "../Shared/Loader";
import { useState } from "react";
import axiosClient from "../../axios";

import toast from "react-hot-toast";

export default function BookingModal({ payload }) {
  const [isPosting, setIsPosting] = useState(false);
  const {
    isOpenBookingModal,
    handleClose,
    activeProduct,
    activeUser,
    refetch,
  } = payload;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    const form = e.target;

    // FAILED to use React-Form-Hook for some issues

    // Preparing data for booking
    const { displayName, email, uid: buyer_uid } = activeUser;
    const {
      _id: product_id,
      productName,
      photoURL,
      originalPrice,
      resalePrice,
      seller_uid,
    } = activeProduct;
    const meetingLocation = form.meetingLocation.value;
    const contactPhoneNo = form.contactPhoneNo.value;

    const payload = {
      product_id,
      buyer_uid,
      photoURL,
      seller_uid,
      displayName,
      email,
      productName,
      originalPrice,
      resalePrice,
      meetingLocation,
      contactPhoneNo,
    };

    try {
      const { data: result } = await axiosClient.post(`/bookings`, payload);
      if (result.acknowledged) {
        toast.success(`Successfully Booked ${productName}`);
        setIsPosting(false);
        handleClose();
        refetch();
      } else {
        toast.error("FAILED to book product");
        setIsPosting(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      setIsPosting(false);
      toast.error("FAILED to book product");
      refetch();
    }
  };

  if (!activeUser || !activeProduct || isPosting) {
    return (
      <Modal show={isOpenBookingModal} onHide={handleClose}>
        <Loader />
      </Modal>
    );
  }
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
              <Form.Control
                type="tel"
                placeholder="Contact Phone no."
                name="contactPhoneNo"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="meeting-location">
              <Form.Label>
                <strong>Meeting Location</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Meeting Location"
                name="meetingLocation"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

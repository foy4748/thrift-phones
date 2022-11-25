import { Modal, Button, Form } from "react-bootstrap";
export default function BookingModal({ payload }) {
  const {
    isOpenBookingModal,
    handleClose,
    handleSubmit,
    activeProduct,
    activeUser,
  } = payload;
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
            <input type="submit" className="btn btn-primary" value="Submit" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

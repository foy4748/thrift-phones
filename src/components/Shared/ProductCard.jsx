import { Card, Col, Button } from "react-bootstrap";
import moment from "moment";

export default function ProductCard({ product, handleOpen }) {
  const { _id, photoURL, productName, description, postedTime, booked } =
    product;

  return (
    <Col key={_id}>
      {" "}
      <Card>
        <Card.Img
          variant="top"
          src={photoURL}
          className="img img-fluid cardImg"
        />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button
            variant="primary"
            disabled={booked}
            onClick={() => handleOpen(_id)}
          >
            Book Now
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Posted: {moment(postedTime).format("DD MMM, YYYY")}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
}

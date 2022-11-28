import { Card, Col } from "react-bootstrap";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faLocationDot,
  faSackDollar,
  faUser,
  faClock,
  faHeart,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({
  product,
  handleOpen,
  handleAddtoWishList,
}) {
  const {
    _id,
    purchaseYear,
    photoURL,
    productName,
    description,
    postedTime,
    condition,
    location,
    sellerName,
    originalPrice,
    resalePrice,
    verified,
    seller_uid,
  } = product;

  return (
    <Col key={_id}>
      {" "}
      <Card className="m-1">
        <Card.Img
          variant="top"
          src={photoURL}
          className="img img-fluid cardImg"
        />
        <Card.Body>
          <Card.Title>{productName}</Card.Title>
          <Card.Text>
            {" "}
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "salmon" }} />
            {"  "}Location: {location}
          </Card.Text>

          <Card.Text>Condition: {condition.toUpperCase()}</Card.Text>

          <div className="d-flex flex-wrap justify-content-between mb-2">
            <Card.Text>
              <strong>
                <FontAwesomeIcon
                  icon={faSackDollar}
                  style={{ color: "#85bb65" }}
                />{" "}
                Original Price: $ {originalPrice}
              </strong>
            </Card.Text>
            <Card.Text>
              <strong>
                <FontAwesomeIcon
                  style={{ color: "#85bb65" }}
                  icon={faMoneyBillWave}
                />{" "}
                Resale Price: $ {resalePrice}
              </strong>
            </Card.Text>
          </div>
          <Card.Text>
            <FontAwesomeIcon icon={faUser} style={{ color: "gray" }} /> Sold by:{" "}
            {sellerName}
          </Card.Text>
          {verified && (
            <Card.Text>
              Verfied Seller{" "}
              <FontAwesomeIcon
                style={{ color: "#00b8cb" }}
                icon={faCircleCheck}
              />
            </Card.Text>
          )}
          <Card.Text>
            <FontAwesomeIcon icon={faClock} style={{ color: "lightblue" }} />
            {"  "}Used for{"  "}
            {new Date().getFullYear() - purchaseYear < 1
              ? "less than a year"
              : `${new Date().getFullYear() - purchaseYear} years`}
          </Card.Text>

          <Card.Text>
            <strong>Description</strong>
          </Card.Text>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex flex-wrap justify-content-between">
            <button
              className="mt-1 btnPrimary"
              onClick={() => handleAddtoWishList(_id, seller_uid)}
            >
              {" "}
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "crimson" }}
              />{" "}
              Add to wish list
            </button>
            <button className="mt-1 btnPrimary" onClick={() => handleOpen(_id)}>
              Book Now
            </button>
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Posted on: {moment(postedTime).format("DD MMM, YYYY")}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
}

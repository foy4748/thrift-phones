const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Card, Row, Col, Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

// Auth Related
import { userContext } from "../../Contexts/AuthContext";
import { useContext } from "react";

import useCheckRole from "../../Hooks/useCheckRole";

import Loader from "../Shared/Loader";

export default function MyProducts() {
  const { activeUser } = useContext(userContext);
  const [userRole, userRoleLoading] = useCheckRole(activeUser?.uid, "seller");
  console.log(userRole);
  // Loading Data
  const seller_uid = activeUser?.uid;
  const { data: myproducts, status } = useQuery({
    queryKey: [seller_uid],
    queryFn: async () => {
      const url = `${SERVER}/products?seller_uid=${seller_uid}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  if (status === "loading") {
    return <Loader />;
  }
  if (myproducts.length === 0) {
    return <h1>No Products online</h1>;
  }
  return (
    <div>
      <h1>My Products</h1>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {myproducts.length &&
            myproducts.map(
              ({ _id, photoURL, productName, description, postedTime }) => {
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
            )}
        </Row>
      </Container>
    </div>
  );
}

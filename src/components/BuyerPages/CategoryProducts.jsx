const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Card, Row, Col, Container } from "react-bootstrap";
import Loader from "../Shared/Loader";
import moment from "moment";

export default function CategoryProducts() {
  const { categoryId } = useParams();

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
  return (
    <div>
      <h1>{categoryProducts.category.category_name}</h1>
      <Container>
        <Row xs={1} md={2} lg={3}>
          {categoryProducts.products.length &&
            categoryProducts.products.map(
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

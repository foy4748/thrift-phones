import { useQuery } from "@tanstack/react-query";

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

// Auth Related
import { userContext } from "../../Contexts/AuthContext";
import { useContext } from "react";

import Loader from "../Shared/Loader";

import { Link } from "react-router-dom";
import { Table, Container, Button } from "react-bootstrap";

export default function MyOrders() {
  const { activeUser, authLoading } = useContext(userContext);

  const { data: myOrders, status } = useQuery({
    queryKey: [activeUser?.uid],
    queryFn: async () => {
      const url = `${SERVER}/bookings?uid=${activeUser?.uid}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  if (authLoading || status === "loading") {
    return <Loader />;
  }
  if (!myOrders?.length) {
    return (
      <div key={"randomKeyss"}>
        <h1>No orders yet</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>My Orders</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Resale Price</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.length !== 0 &&
              myOrders.map(
                (
                  { product_id, photoURL, productName, resalePrice, paid },
                  idx
                ) => {
                  return (
                    <tr key={product_id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <picture>
                          <img
                            src={photoURL}
                            alt={productName}
                            className="tableImgIcon"
                          />
                        </picture>
                      </td>
                      <td>{productName}</td>
                      <td>{resalePrice}</td>
                      <td>
                        {!paid ? (
                          <Link to={`/payment/${product_id}`}>
                            <Button size="sm">Pay</Button>
                          </Link>
                        ) : (
                          <Button disabled size="sm">
                            Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

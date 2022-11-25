const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Table, Container, Button } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";

// Auth Related
import { userContext } from "../../Contexts/AuthContext";
import { useContext, useState } from "react";

import BookingModal from "./BookingModal";

export default function MyWishList() {
  const { activeUser, authLoading } = useContext(userContext);
  const [activeProduct, setActiveProduct] = useState(null);
  const buyer_uid = activeUser?.uid;
  const {
    data: myWishListProducts,
    status,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [buyer_uid],
    queryFn: async () => {
      const url = `${SERVER}/wishlist?buyer_uid=${buyer_uid}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  // Modal States
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const handleClose = () => setIsOpenBookingModal(false);
  const handleOpen = (product_id) => {
    const activeProduct = myWishListProducts.find(
      (itm) => itm._id === product_id
    );
    setActiveProduct(activeProduct);
    setIsOpenBookingModal(true);
  };

  // Remove Wish Listed Items
  const handleRemoveWishList = (id) => console.log(id);

  if (authLoading || isFetching || status === "loading") {
    return <Loader />;
  }

  const payload = {
    isOpenBookingModal,
    handleClose,
    activeProduct,
    activeUser,
    refetch,
  };

  return (
    <div>
      <BookingModal payload={payload} />
      <h1>My Wish List</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Resale Price</th>
              <th>Remove</th>
              <th>Book</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {myWishListProducts?.length &&
              myWishListProducts.map(
                (
                  { _id, photoURL, productName, resalePrice, booked, paid },
                  idx
                ) => {
                  return (
                    <tr key={_id}>
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
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleRemoveWishList(_id)}
                        >
                          Remove
                        </Button>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          disabled={booked}
                          onClick={() => handleOpen(_id)}
                        >
                          Book
                        </Button>
                      </td>
                      <td>
                        <Button size="sm" disabled={paid}>
                          {paid ? "Paid" : "Pay"}
                        </Button>
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

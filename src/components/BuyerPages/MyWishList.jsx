const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Table, Container, Button } from "react-bootstrap";

import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
      const authtoken = window.localStorage.getItem("authtoken");
      const options = {
        headers: {
          "Content-Type": "application/json",
          authtoken,
        },
      };
      const url = `${SERVER}/wishlist`;
      const res = await fetch(url, options);
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
  const handleRemoveWishList = async (id) => {
    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        product_id: id,
        authtoken,
      },
    };
    try {
      const res = await fetch(`${SERVER}/wishlist`, options);
      const result = await res.json();
      if (result.acknowledged) {
        toast.success("Succesfully Removed from Wish List");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("FAILED to removed");
    }
  };

  if (authLoading || isFetching || status === "loading") {
    return <Loader />;
  }

  if (myWishListProducts?.length === 0) {
    return (
      <div>
        <h1>No products in wish list yet</h1>
      </div>
    );
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
                ({ _id, photoURL, productName, resalePrice, paid }, idx) => {
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
                        <Button size="sm" onClick={() => handleOpen(_id)}>
                          Book
                        </Button>
                      </td>
                      <td>
                        {!paid ? (
                          <Link to={`/payment/${_id}`}>
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

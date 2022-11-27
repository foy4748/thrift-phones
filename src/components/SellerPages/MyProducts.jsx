const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import { Table, Container, Button } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

// Auth Related
import { userContext } from "../../Contexts/AuthContext";
import { useContext, useState } from "react";

import toast from "react-hot-toast";
import Loader from "../Shared/Loader";

export default function MyProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const { activeUser } = useContext(userContext);
  // Loading Data
  const seller_uid = activeUser?.uid;
  const {
    data: myProducts,
    status,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [seller_uid],
    queryFn: async () => {
      const authtoken = window.localStorage.getItem("authtoken");
      const options = {
        headers: {
          "Content-Type": "application/json",
          authtoken,
        },
      };
      const url = `${SERVER}/my-products`;
      const res = await fetch(url, options);
      const data = await res.json();
      return data;
    },
  });

  // Handle Deletion
  const handleDeletion = async (product_id) => {
    setIsLoading(true);
    try {
      const authtoken = window.localStorage.getItem("authtoken");
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          product_id,
          authtoken,
        },
      };
      const res = await fetch(`${SERVER}/delete-products`, options);
      const result = await res.json();
      if (result.acknowledged) {
        toast.success("Successfully deleted");
        setIsLoading(false);
        refetch();
      } else {
        setIsLoading(false);
        toast.error("FAILED to delete product");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle Advertise
  const handleAdvertise = async (product_id, advertised) => {
    setIsLoading(true);
    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        product_id,
        authtoken,
      },
      body: JSON.stringify({ advertised: !advertised }),
    };
    try {
      const res = await fetch(`${SERVER}/products`, options);
      const result = await res.json();
      if (result.acknowledged) {
        toast.success("Successfully changed advertised state");
        setIsLoading(false);
        refetch();
      } else {
        toast.error("FAILED to advertise product");
        setIsLoading(false);
        refetch();
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("FAILED to advertise product");
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <Loader />;
  }

  if (myProducts.length === 0) {
    return <h1>No Products online</h1>;
  }

  return (
    <div>
      <h1>My Products</h1>
      <Container className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Product Name</th>
              <th>Resale Price</th>
              <th>Delete</th>
              <th>Booked</th>
              <th>Sold</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {myProducts?.length &&
              myProducts.map(
                (
                  {
                    _id,
                    photoURL,
                    productName,
                    resalePrice,
                    advertised,
                    booked,
                    paid,
                  },
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
                          disabled={isLoading}
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletion(_id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>{booked ? "Yes" : "No"}</td>
                      <td>{paid ? "Yes" : "No"}</td>
                      <td>
                        {!advertised ? (
                          <Button
                            size="sm"
                            disabled={isLoading}
                            onClick={() => handleAdvertise(_id, advertised)}
                          >
                            Boost
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            disabled={isLoading || paid}
                            onClick={() => handleAdvertise(_id, advertised)}
                          >
                            Advertised
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

const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Table, Container, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function AllSellers() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  let role = "seller";
  const {
    data: allSellers,
    status,
    refetch,
  } = useQuery({
    queryKey: [role],
    queryFn: async () => {
      const url = `${SERVER}/users?role=${role}`;
      const { data } = await axios.get(url);
      return data;
    },
  });

  useEffect(() => {
    window.document.title = "Admin | All Sellers";
  }, []);

  // Make Verified Seller
  const makeVerified = async (id, uid, verified, displayName) => {
    setIsVerifying(true);
    const url = `${SERVER}/users`;
    try {
      const authtoken = window.localStorage.getItem("authtoken");
      const options = {
        headers: {
          "Content-Type": "application/json",
          authtoken,
          user_id: id,
          user_uid: uid,
        },
      };
      const patch = { verified: !verified };
      const { data } = await axios.patch(url, patch, options);
      if (data.acknowledged) {
        toast.success(
          `${displayName} is now ${
            !verified ? "verified seller!!" : "ordinary seller."
          }`
        );
        setIsVerifying(false);
      } else {
        toast.error("Something went wrong");
        setIsVerifying(false);
      }
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setIsVerifying(false);
    }
  };

  // Delete a Seller
  const handleDeleteSeller = async (seller_uid) => {
    toast.success("DELETING a BUYER...");
    setIsDeleting(true);
    const url = `${SERVER}/delete-seller`;
    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
        seller_uid,
      },
    };
    try {
      const { data } = await axios.delete(url, options);

      if (data.acknowledged) {
        toast.success("SUCCESFULLY DELETED A SELLER");
        setIsDeleting(false);
        refetch();
      } else {
        toast.error("FAILED to delete a seller");
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error("FAILED to delete a seller");
      console.error(error);
      setIsDeleting(false);
    }
  };

  if (status === "loading" || isDeleting || isVerifying) {
    return <Loader />;
  }
  if (!allSellers?.length) {
    return (
      <div>
        <h1>No Sellers online</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>All Sellers</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Verify</th>
            </tr>
          </thead>
          <tbody>
            {allSellers?.length &&
              allSellers.map(
                ({ _id, uid, displayName, email, verified }, idx) => {
                  return (
                    <tr key={_id}>
                      <td>{idx + 1}</td>
                      <td>{displayName}</td>
                      <td>{email}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="m-0"
                          onClick={() => handleDeleteSeller(uid)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td className="d-flex justify-content-center">
                        <Button
                          className="m-0"
                          variant={verified ? "warning" : "primary"}
                          size="sm"
                          onClick={() =>
                            makeVerified(_id, uid, verified, displayName)
                          }
                        >
                          {verified ? "Undo" : "Verify"}
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

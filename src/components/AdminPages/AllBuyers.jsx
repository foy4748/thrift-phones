const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Button, Table, Container } from "react-bootstrap";

import axios from "axios";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function AllBuyers() {
  let role = "buyer";
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    window.document.title = "Admin | All Buyers";
  }, []);

  const {
    data: allBuyers,
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
  if (status === "loading" || isDeleting) {
    return <Loader />;
  }

  const handleDeleteBuyer = async (buyer_uid) => {
    toast.success("DELETING a BUYER...");
    setIsDeleting(true);
    const url = `${SERVER}/delete-buyer`;
    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
        buyer_uid,
      },
    };
    try {
      const { data } = await axios.delete(url, options);

      if (data.acknowledged) {
        toast.success("SUCCESFULLY DELETED A BUYER");
        setIsDeleting(false);
        refetch();
      } else {
        toast.error("FAILED to delete a buyer");
        setIsDeleting(false);
      }
    } catch (error) {
      toast.error("FAILED to delete a buyer");
      console.error(error);
      setIsDeleting(false);
    }
  };
  if (!allBuyers?.length) {
    return (
      <div>
        <h1>No Buyers online</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>All Buyers</h1>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allBuyers?.length &&
              allBuyers.map(({ _id, displayName, uid, email }, idx) => {
                return (
                  <tr key={_id}>
                    <td>{idx + 1}</td>
                    <td>{displayName}</td>
                    <td>{email}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteBuyer(uid)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

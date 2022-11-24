const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Table, Container, Button } from "react-bootstrap";
import toast from "react-hot-toast";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function AllSellers() {
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

  // Make Verified Seller
  const makeVerified = async (id, verified, displayName) => {
    const url = `${SERVER}/users`;
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          user_id: id,
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
      } else {
        toast.error("Something went wrong");
      }
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (status === "loading") {
    return <Loader />;
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
              allSellers.map(({ _id, displayName, email, verified }, idx) => {
                return (
                  <tr key={_id}>
                    <td>{idx + 1}</td>
                    <td>{displayName}</td>
                    <td>{email}</td>
                    <td>
                      <Button variant="danger" size="sm" className="m-0">
                        Delete
                      </Button>
                    </td>
                    <td className="d-flex justify-content-center">
                      <Button
                        className="m-0"
                        variant={verified ? "warning" : "primary"}
                        size="sm"
                        onClick={() => makeVerified(_id, verified, displayName)}
                      >
                        {verified ? "Undo" : "Verify"}
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

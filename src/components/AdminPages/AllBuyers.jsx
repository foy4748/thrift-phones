const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Button, Table, Container } from "react-bootstrap";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";
export default function AllBuyers() {
  let role = "buyer";

  const { data: allBuyers, status } = useQuery({
    queryKey: [role],
    queryFn: async () => {
      const url = `${SERVER}/users?role=${role}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
  if (status === "loading") {
    return <Loader />;
  }

  const handleDeleteBuyer = async (buyer_uid) => {
    const url = `${SERVER}/delete-buyer`;
    const authtoken = window.localStorage.getItem("authtoken");
    const options = {
      headers: {
        "Content-Type": "application/json",
        authtoken,
        buyer_uid,
      },
    };
    const { data } = await axios.delete(url, options);
    console.log(data);
  };
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

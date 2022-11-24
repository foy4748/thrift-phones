const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Table, Container } from "react-bootstrap";

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
  const makeVerified = async (id, verified) => {
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
      console.log(data);
      refetch();
    } catch (error) {
      console.error(error);
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
                      <button className="btn btn-danger">Delete</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => makeVerified(_id, verified)}
                      >
                        {verified ? "Undo" : "Make Verified"}
                      </button>
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

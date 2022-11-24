const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";
import { Table, Container } from "react-bootstrap";

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
              allBuyers.map(({ _id, displayName, email }, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{displayName}</td>
                    <td>{email}</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
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

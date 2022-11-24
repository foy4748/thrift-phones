const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Loader from "../Shared/Loader";

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
      <p>{JSON.stringify(allBuyers)}</p>
    </div>
  );
}

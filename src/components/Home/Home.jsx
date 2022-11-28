const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Advertise from "./Advertise";
import Slider from "./Slider";
import InfoCards from "./InfoCards";
import Brands from "./Brands";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.document.title = "THRIFT PHONES | HOME";
  }, []);
  return (
    <div>
      <Slider />
      <Advertise />
      <InfoCards />
      <Brands />
    </div>
  );
}

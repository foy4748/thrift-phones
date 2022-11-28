const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Advertise from "./Advertise";
import Slider from "./Slider";
import InfoCards from "./InfoCards";
import Brands from "./Brands";

export default function Home() {
  return (
    <div>
      <Slider />
      <Advertise />
      <InfoCards />
      <Brands />
    </div>
  );
}

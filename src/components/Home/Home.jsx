const SERVER =
  import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER;

import Advertise from "./Advertise";
import Banner from "./Banner";
import styles from "./BannerLayout.module.css";
import {
  faAndroid,
  faApple,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div>
      <section className={styles.bannerLayout}>
        <Banner />
        <div>
          <h1 className="text-center m-0">Categories</h1>
          <div className={styles.sideBar}>
            <div className="w-100">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon
                  icon={faAndroid}
                  style={{ color: "#5de554db" }}
                />
              </p>
              <p className="p-0 m-0 text-center fw-bold">Android</p>
            </div>
            <div className="w-100">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon icon={faApple} style={{ color: "gray" }} />
              </p>
              <p className="p-0 m-0 text-center fw-bold">iOS</p>
            </div>
            <div className="w-100">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon
                  icon={faWindows}
                  style={{ color: "#6ad3f3" }}
                />
              </p>
              <p className="p-0 m-0 text-center fw-bold">Windows Phone</p>
            </div>
          </div>
        </div>
      </section>
      <Advertise />
    </div>
  );
}

import Banner from "./Banner";
import styles from "./BannerLayout.module.css";
import {
  faAndroid,
  faApple,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Slider() {
  return (
    <section className={styles.bannerLayout}>
      <Banner />
      <div className={styles.bannerSide}>
        <h1 className="h2 text-center m-0">Categories</h1>
        <div className={styles.sideBar}>
          <div className="w-100">
            <Link to="/category/637e7c78e4a3ee128ee5f90f">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon
                  icon={faAndroid}
                  style={{ color: "#5de554db" }}
                />
              </p>
              <p className="p-0 m-0 text-center fw-bold">Android</p>
            </Link>
          </div>
          <div className="w-100">
            <Link to="/category/637e7c97e4a3ee128ee5f911">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon icon={faApple} style={{ color: "gray" }} />
              </p>
              <p className="p-0 m-0 text-center fw-bold">iOS</p>
            </Link>
          </div>
          <div className="w-100">
            <Link to="/category/637e7caae4a3ee128ee5f913">
              <p className={styles.categoryIcon}>
                <FontAwesomeIcon
                  icon={faWindows}
                  style={{ color: "#6ad3f3" }}
                />
              </p>
              <p className="p-0 m-0 text-center fw-bold">Windows Phone</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

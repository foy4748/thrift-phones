import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";
export default function ErrorPage() {
  return (
    <>
      <div className={styles.errorPageContainer}>
        <h1>404 Page Not found</h1>
        <p>
          <Link to="/" className={styles.backButton}>
            Go back home
          </Link>
        </p>
        <div className="d-flex justify-content-center">
          <img
            className="img img-fluid w-50"
            src="/errorPageImg.jpg"
            alt="404 Error Page Cover Image"
          />
        </div>
      </div>
    </>
  );
}

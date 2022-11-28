import styles from "./Brands.module.css";
export default function Brands() {
  return (
    <section className="my-5">
      <h1>Available Brands</h1>
      <div className="d-md-flex justify-content-around">
        <picture className="d-flex justify-content-center">
          {" "}
          <img
            src="/Walton.jpg"
            className={styles.mobileBrandLogo}
            alt="Walton"
          />
        </picture>
        <picture className="d-flex justify-content-center">
          {" "}
          <img
            src="/Apple.jpg"
            className={styles.mobileBrandLogo}
            alt="Apple"
          />
        </picture>
        <picture className="d-flex justify-content-center">
          {" "}
          <img
            src="/Nokia.png"
            className={styles.mobileBrandLogo}
            alt="Nokia"
          />
        </picture>
      </div>
    </section>
  );
}

import styles from "./InfoCards.module.css";
export default function InfoCards() {
  return (
    <section className="d-md-flex justify-content-between my-5">
      <div className="border rounded w-100 p-5 m-1">
        <h2 className="text-center">Refer a Friend</h2>
        <picture className="d-flex justify-content-center align-items-center">
          <img
            className={styles.infoCardImg}
            src="/ReferAFriend.png"
            alt="Invite Friends And Partners Svg Png Icon Free Download - Transparent Background"
          />
        </picture>
      </div>
      <div className="border rounded w-100 p-5 m-1">
        <h2 className="text-center">Quality Products</h2>
        <picture className="d-flex justify-content-center align-items-center">
          <img
            className={styles.infoCardImg}
            src="QualityProduct.jpg"
            alt="Invite Friends And Partners Svg Png Icon Free Download - Transparent Background"
          />
        </picture>
      </div>
      <div className="border rounded w-100 p-5 m-1">
        <h2 className="text-center">Verified Sellers</h2>
        <picture className="d-flex justify-content-center align-items-center">
          <img
            className={styles.infoCardImg}
            src="/TickCircle.png"
            alt="Invite Friends And Partners Svg Png Icon Free Download - Transparent Background"
          />
        </picture>
      </div>
    </section>
  );
}

import Prices from "./Prices";
import styles from "./pricesall.module.css";

export default function PricesAll({ pricesData, onOrderClick }) {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Buy now!</h2>
        <p className={styles.description}>Prices of your applications</p>
        <p className={styles.text}>
          Here's a list of our standard services. Our consultants can help you
          find the right one for you. Don't hesitate to contact us. We'll
          customize your order just for you! If in doubt, please contact us
          using the form below!
        </p>
      </div>

      <div className={styles.building}>
        {pricesData.map((item) => (
          <Prices key={item.id} {...item} onOrderClick={onOrderClick} />
        ))}
      </div>
    </div>
  );
}

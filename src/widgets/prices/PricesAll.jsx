import Prices from "./Prices";
import styles from "./pricesall.module.css";

export default function PricesAll({ pricesData, onOrderClick }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Web_Development</h2>

      <div className={styles.building}>
        {pricesData.map((item) => (
          <Prices key={item.id} {...item} onOrderClick={onOrderClick} />
        ))}
      </div>
    </div>
  );
}

import Prices from "./Prices";
import styles from "./pricesall.module.css";

export default function PricesAll({ pricesData, onOrderClick }) {
  return (
    <div className={styles.section}>
      <div className={styles.building}>
        {pricesData.map((item) => (
          <Prices key={item.id} {...item} onOrderClick={onOrderClick} />
        ))}
      </div>
    </div>
  );
}

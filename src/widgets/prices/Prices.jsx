import styles from "./prices.module.css";

export default function Prices({
  id,
  title,
  text,
  information,
  price,
  featured,
  onOrderClick,
}) {
  return (
    <div
      id={id}
      className={`${styles.field} ${featured ? styles.featured : ""}`}
      onClick={() => onOrderClick({ id, title, text, information, price })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <img
            className={styles.image}
            src="/eos-icons_admin-outlined.svg"
            alt="admin-icon"
          />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>

          <ul className={styles.list}>
            {information.map((item) => (
              <li className={styles.row} key={item}>
                <p className={styles.textrow}>{item}</p>{" "}
                <img className={styles.vector} src="Vector.png" alt="arrow" />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.price}>
          <p>From {price} €</p>
        </div>
      </div>
      <button type="button" className={styles.button}>
        order_now
      </button>
    </div>
  );
}

import styles from "./hero.module.css";
export default function Hero() {
  return (
    <div className={styles.field}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Wev_Developing</h1>
          <p>Move your business into web univerce</p>
          <p>
            Development of web-services, portals, e-shops, commercial platforms
            and much more!
          </p>
        </div>
        <a href="#prices_1">
          <button className={styles.button} typeof="button">
            Web_sites
          </button>
        </a>
      </div>
      <img className={styles.image} src="/about-us_bg.gif" alt="universe" />
    </div>
  );
}

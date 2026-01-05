import styles from "./service.module.css";

export default function Service({ id, title, text, link, onClick }) {
  return (
    <div id={id}>
      <div className={styles.container}>
        <a href={link} onClick={onClick}>
          <div className={styles.content}>
            <img
              className={styles.image}
              src="/eos-icons_admin-outlined.svg"
              alt="admin-icon"
            />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>

            <img
              className={styles.icon}
              src="/corner_plus.png"
              alt="plus-icon"
            />
          </div>
        </a>
      </div>
    </div>
  );
}

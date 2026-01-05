import { Link } from "react-router-dom";
import styles from "./about.module.css";

export default function About() {
  return (
    <div className={styles.field}>
      <div className={styles.container}>
        <h1>About Us</h1>

        <p>
          We are a full-cycle digital agency specializing in web development,
          automation, and branding solutions. With a focus on delivering
          high-quality, tailored projects, we help businesses of all sizes —
          from startups to established manufacturing companies — build a strong
          online presence, streamline operations, and drive growth through
          modern technology.
        </p>

        <p>
          Our core expertise lies in creating custom websites, scalable
          e-commerce platforms, high-conversion landing pages, and specialized
          web applications, including production tracking systems and
          manufacturing dashboards. We also develop intelligent AI-powered bots,
          comprehensive brand identities, and professional social media setups
          to ensure your brand stands out across all digital channels.
        </p>

        <p>
          What sets us apart is our client-centered approach: we take time to
          understand your business goals, industry specifics, and unique
          challenges. Every project is built from scratch or carefully
          customized using the latest technologies, with an emphasis on
          performance, security, scalability, and user experience.
        </p>

        <Link to="/#prices_1">
          <button className={styles.button} type="button">
            Go_to_prices!
          </button>
        </Link>
      </div>
    </div>
  );
}

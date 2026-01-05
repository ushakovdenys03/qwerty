import Service from "./Service";
import styles from "./services.module.css";
export default function Services({ onSelectService }) {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Services</h2>
      <div className={styles.building}>
        <Service
          id="service_1"
          title="Web Development"
          text="Custom websites, e-commerce stores, landing pages, and web portals built with modern technologies for seamless user experience and high performance."
          link="#prices_1"
        />

        <Service
          id="service_2"
          title="AI-Powered Bots"
          text="Smart automated bots for customer service, marketing, and internal processes across popular platforms"
          link="#form"
          onClick={() => onSelectService("AI-Powered Bots")}
        />

        <Service
          id="service_3"
          title="Brand Identity & Guidelines"
          text="Comprehensive brand books including logo, color palette, typography, and usage rules to ensure consistent and professional branding"
          link="#form"
          onClick={() => onSelectService("Brand Identity & Guidelines")}
        />

        <Service
          id="service_4"
          title="Social Media Setup & Branding"
          text="Full creation and optimization of social media profiles across platforms, including content strategy, visuals, and initial setup"
          link="#form"
          onClick={() => onSelectService("Social Media Setup & Branding")}
        />
      </div>
    </div>
  );
}

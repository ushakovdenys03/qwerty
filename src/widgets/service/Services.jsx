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
          image="/service-bgc.jpg"
        />

        <Service
          id="service_2"
          title="AI-Powered Bots"
          text="Smart automated bots for customer service, marketing, and internal processes across popular platforms"
          link="#form"
          onClick={() => onSelectService("AI-Powered Bots")}
          image="/ai-service.png"
        />

        <Service
          id="service_3"
          title="Mobile Development"
          text="Mobile apps for you and your clients. Developed for iOS and Android. Your company on your phone!"
          link="#form"
          onClick={() => onSelectService("Mobile Development")}
          image="/mobile-service.png"
        />

        <Service
          id="service_4"
          title="Brand Identity & Guidelines"
          text=" Comprehensive brand books including logo, color palette, typography, and usage rules to ensure consistent and professional branding"
          link="#form"
          onClick={() => onSelectService("Brand Identity & Guidelines")}
          image="/service-bgc.jpg"
        />
      </div>
    </div>
  );
}

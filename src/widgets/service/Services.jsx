import Service from "./Service";
import styles from "./services.module.css";
export default function Services({ onSelectService }) {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.maintitle}>Services</h2>
        <p className={styles.description}>Find a service for you!</p>
        <p className={styles.text}>
          We provide a wide range of services for the comfort of our clients.
          It's important to us that you find a comfortable experience on our
          website. Mobile apps, web services, and websites are available for
          you, your employees, and your clients.
        </p>
      </div>
      <div className={styles.building}>
        <Service
          id="service_1"
          icon="/panels-top-left.svg"
          title="Web Development"
          text="Custom websites, e-commerce stores, landing pages, and web portals built with modern technologies for seamless user experience and high performance."
          link="#prices_1"
          image="/web-service.png"
        />

        <Service
          id="service_2"
          icon="/brain.svg"
          title="AI-Powered Integrations"
          text="Smart automated bots for customer service, marketing, and internal processes across popular platforms"
          link="#form"
          onClick={() => onSelectService("AI-Powered Integrations")}
          image="/ai-service.png"
        />

        <Service
          id="service_3"
          icon="/tablet-smartphone.svg"
          title="Mobile Development"
          text="Mobile apps for you and your clients. Developed for iOS and Android. Your company on your phone!"
          link="#form"
          onClick={() => onSelectService("Mobile Development")}
          image="/mobile-service.png"
        />

        <Service
          id="service_4"
          icon="/brush.svg"
          title="Brand Identity & Guidelines"
          text=" Comprehensive brand books including logo, color palette, typography, and usage rules to ensure consistent and professional branding"
          link="#form"
          onClick={() => onSelectService("Brand Identity & Guidelines")}
          image="/brand-service.jpg"
        />
      </div>
    </div>
  );
}

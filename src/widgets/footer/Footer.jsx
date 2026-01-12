import styles from "./footer.module.css";
import InstagramIcon from "/ri_instagram-fill.svg";
import FacebookIcon from "/ic_baseline-facebook.svg";
import TikTokIcon from "/tiktok-brands-solid-full.svg";
import WhatsappIcon from "/basil_whatsapp-solid.svg";
import EmailIcon from "/ic_baseline-email.svg";
export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.section}>
        <div className={styles.logo}>
          <a href="#">
            <img src="/Logo.png" alt="logo" />
          </a>
          <p className={styles.text_logo}>
            Full-cycle digital agency specializing in web development,
            automation, and branding solutions.
          </p>

          <a
            className={styles.links_logo}
            href="mailto:vladislav4web@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            vladislav4web@gmail.com
          </a>
          <a
            className={styles.links_logo}
            href="mailto:ushakovdenys03@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ushakovdenys03@gmail.com
          </a>
        </div>

        <div className={styles.information_field}>
          <div className={styles.information_container}>
            <h2 className={styles.title}>Servises</h2>
            <div className={styles.information_content}>
              <a className={styles.list} href="#service_1">
                Web Development
              </a>
              <a className={styles.list} href="#service_2">
                AI-Powered Bots
              </a>
              <a className={styles.list} href="#service_3">
                Brand Identity & Guidelines
              </a>
              <a className={styles.list} href="#service_4">
                Social Media Setup & Branding
              </a>
            </div>
          </div>

          <div className={styles.information_container}>
            <h2 className={styles.title}>Web_sites</h2>
            <div className={styles.information_content}>
              <a className={styles.list} href="#prices_1">
                Online Stores & E-Commerce
              </a>
              <a className={styles.list} href="#prices_2">
                Business & Corporate Sites
              </a>
              <a className={styles.list} href="#prices_3">
                Marketing Landing Pages
              </a>
              <a className={styles.list} href="#prices_4">
                Custom Web Applications
              </a>
            </div>
          </div>
          <div className={styles.information_container}>
            <h2 className={styles.title}>
              <a
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.title_about}
              >
                About_us
              </a>
            </h2>
          </div>
        </div>

        <div className={styles.socials_container}>
          <h2 className={styles.title}>Social_Media</h2>

          <div className={styles.socials_content}>
            <a
              className={styles.links}
              href="https://t.me/Kavunchick1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.social_icon}
                src={TikTokIcon}
                width={30}
                height={30}
                alt="TikTokIcon"
              />{" "}
              <p className={styles.text}>tiktok</p>
            </a>
            <a
              className={styles.links}
              href="https://www.instagram.com/_knitel.di_?igsh=MTE4bzlnOHo0M2h6eg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.social_icon}
                src={InstagramIcon}
                width={30}
                height={30}
                alt="InstagramIcon"
              />{" "}
              <p className={styles.text}>Instagram</p>
            </a>
            <a
              className={styles.links}
              href="https://wa.me/+380996504738"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.social_icon}
                src={WhatsappIcon}
                width={30}
                height={30}
                alt="WhatsappIcon"
              />{" "}
              <p className={styles.text}>Whatsapp</p>
            </a>
            <a
              className={styles.links}
              href="https://www.facebook.com/Edvprint_Main"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={styles.social_icon}
                src={FacebookIcon}
                width={30}
                height={30}
                alt="FacebookIcon"
              />{" "}
              <p className={styles.text}>Facebook</p>
            </a>

            <div className={styles.posts}>
              <a
                className={styles.links_logo}
                href="mailto:vladislav4web@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                vladislav4web@gmail.com
              </a>
              <a
                className={styles.links_logo}
                href="mailto:ushakovdenys03@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ushakovdenys03@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <div className={styles.divider} />
        <p className={styles.text}>Copyright &copy; ApexSoft 2026</p>
      </div>
    </div>
  );
}

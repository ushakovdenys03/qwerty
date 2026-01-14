import { useState, useRef, useEffect } from "react";
import styles from "./navbar.module.css";

export default function Navbar({ onOrderClick }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const navRef = useRef(null);
  const mobileRef = useRef(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const scrollToSection = (e, id) => {
    // Останавливаем стандартное поведение, чтобы убрать мобильную задержку
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Сразу закрываем меню
    setBurgerOpen(false);
    setOpenIndex(null);

    // Запускаем скролл
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
      if (
        burgerOpen &&
        mobileRef.current &&
        !mobileRef.current.contains(event.target)
      ) {
        setBurgerOpen(false);
      }
    };

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOpenIndex(null);
        setBurgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, {
      passive: true,
    });
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [burgerOpen]);

  return (
    <>
      {/* Затемнение фона при открытом меню */}
      {burgerOpen && (
        <div className={styles.overlay} onClick={() => setBurgerOpen(false)} />
      )}

      <div className={styles.container}>
        {/* Кнопка бургера */}
        <button className={styles.burger} onClick={() => setBurgerOpen(true)}>
          <span />
          <span />
          <span />
        </button>

        <a href="/">
          <img className={styles.logo} src="/Logo.png" alt="logo" />
        </a>

        <div className={styles.content}>
          <div className={styles.navigation} ref={navRef}>
            {/* Desktop: Services с выпадающим списком */}
            <div className={styles.elementWrapper}>
              <button
                className={styles.element}
                type="button"
                onClick={() => toggle(1)}
              >
                <p className={styles.elementText}>Services</p>
                <svg
                  className={`${styles.arrow} ${
                    openIndex === 1 ? styles.open : ""
                  }`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                </svg>
              </button>
              {openIndex === 1 && (
                <ul className={styles.dropdown}>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "service_1")}
                  >
                    Web Development
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "service_2")}
                  >
                    AI-Powered Bots
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "service_3")}
                  >
                    Brand Identity & Guidelines
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "service_4")}
                  >
                    Social Media Setup & Branding
                  </li>
                </ul>
              )}
            </div>

            {/* Desktop: Orders с выпадающим списком */}
            <div className={styles.elementWrapper}>
              <button
                className={styles.element}
                type="button"
                onClick={() => toggle(2)}
              >
                <p className={styles.elementText}>Orders</p>
                <svg
                  className={`${styles.arrow} ${
                    openIndex === 2 ? styles.open : ""
                  }`}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                </svg>
              </button>
              {openIndex === 2 && (
                <ul className={styles.dropdown}>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "prices_1")}
                  >
                    Online Stores & E-Commerce
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "prices_2")}
                  >
                    Business & Corporate Sites
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "prices_3")}
                  >
                    Marketing Landing Pages
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSection(e, "prices_4")}
                  >
                    Custom Web Applications
                  </li>
                </ul>
              )}
            </div>

            <a
              className={styles.navItem}
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={styles.elementText}>About_us</p>
            </a>
          </div>

          <div className={styles.buttons}>
            <button className={styles.button} onClick={onOrderClick}>
              become_partner
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={mobileRef}
        className={`${styles.burgerMenu} ${
          burgerOpen ? styles.burgerOpen : ""
        }`}
      >
        <button className={styles.close} onClick={() => setBurgerOpen(false)}>
          ✕
        </button>
        <img src="/Logo.png" alt="logo" />

        <div className={styles.mobileLinks}>
          {/* В мобилке просто ссылки, которые закрывают меню и скроллят */}
          <div
            className={styles.navItem}
            onClick={(e) => scrollToSection(e, "service_1")}
          >
            <p className={styles.elementText}>Services</p>
          </div>

          <div
            className={styles.navItem}
            onClick={(e) => scrollToSection(e, "prices_1")}
          >
            <p className={styles.elementText}>Orders</p>
          </div>

          <a
            className={styles.navItem}
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={styles.elementText}>About_us</p>
          </a>
        </div>
      </div>
    </>
  );
}

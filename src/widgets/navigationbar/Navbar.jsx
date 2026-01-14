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

  // Единая функция для закрытия меню
  const handleMenuClose = () => {
    setBurgerOpen(false);
    setOpenIndex(null);
  };

  // Улучшенная версия с надёжным закрытием + скроллом
  const scrollToSectionAndClose = (e, id) => {
    e.preventDefault();
    handleMenuClose();

    // Даём небольшую задержку, чтобы анимация закрытия меню успела начаться
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
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
        handleMenuClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [burgerOpen]);

  return (
    <>
      {/* Затемнение фона */}
      {burgerOpen && (
        <div className={styles.overlay} onClick={handleMenuClose} />
      )}

      <div className={styles.container}>
        <button className={styles.burger} onClick={() => setBurgerOpen(true)}>
          <span />
          <span />
          <span />
        </button>

        <a href="/" onClick={handleMenuClose}>
          <img className={styles.logo} src="/Logo.png" alt="logo" />
        </a>

        <div className={styles.content}>
          <div className={styles.navigation} ref={navRef}>
            {/* Desktop Services */}
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
                    onClick={(e) => scrollToSectionAndClose(e, "service_1")}
                  >
                    Web Development
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "service_2")}
                  >
                    AI-Powered Bots
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "service_3")}
                  >
                    Mobile Development
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "service_4")}
                  >
                    Brand Identity & Guidelines
                  </li>
                </ul>
              )}
            </div>

            {/* Desktop Orders */}
            <div className={styles.elementWrapper}>
              <button
                className={styles.element}
                type="button"
                onClick={() => toggle(2)}
              >
                <p className={styles.elementText}>Web Development</p>
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
                    onClick={(e) => scrollToSectionAndClose(e, "prices_1")}
                  >
                    Online Stores & E-Commerce
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "prices_2")}
                  >
                    Business & Corporate Sites
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "prices_3")}
                  >
                    Mobile Development
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={(e) => scrollToSectionAndClose(e, "prices_4")}
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
              onClick={handleMenuClose}
            >
              <p className={styles.elementText}>About_us</p>
            </a>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={() => {
                onOrderClick();
                handleMenuClose();
              }}
            >
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
        <button className={styles.close} onClick={handleMenuClose}>
          ✕
        </button>

        <img src="/Logo.png" alt="logo" onClick={handleMenuClose} />

        <div className={styles.mobileLinks}>
          <div
            className={styles.navItem}
            onClick={(e) => scrollToSectionAndClose(e, "service_1")}
          >
            <p className={styles.elementText}>Services</p>
          </div>

          <div
            className={styles.navItem}
            onClick={(e) => scrollToSectionAndClose(e, "prices_1")}
          >
            <p className={styles.elementText}>Web Development</p>
          </div>

          <a
            className={styles.navItem}
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMenuClose}
          >
            <p className={styles.elementText}>About_us</p>
          </a>
        </div>
      </div>
    </>
  );
}

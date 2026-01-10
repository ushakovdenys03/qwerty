import { useState, useRef, useEffect } from "react";
import styles from "./form.module.css";

/* ====== ОПИСАНИЯ СЕРВИСОВ ====== */
const SERVICE_DATA = {
  "AI-Powered Bots": {
    description:
      "Smart automated bots for customer service, marketing, and internal processes across popular platforms.",
  },
  "Brand Identity & Guidelines": {
    description:
      "Comprehensive brand books including logo, color palette, typography, and usage rules to ensure consistent and professional branding.",
  },
  "Social Media Setup & Branding": {
    description:
      "Full creation and optimization of social media profiles across platforms, including content strategy, visuals, and initial setup.",
  },
  Other: {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

export default function Form({ id, selectedService }) {
  const defaultService = selectedService || "AI-Powered Bots";

  const [service, setService] = useState(defaultService);
  const [serviceDescription, setServiceDescription] = useState(
    SERVICE_DATA[defaultService]?.description || ""
  );

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const closeBtnRef = useRef(null);

  /* ====== ВАЛИДАЦИЯ ====== */
  const validate = () => {
    const e = {};
    if (!service) e.service = "Please select a service.";
    if (!email) e.email = "Email is required.";

    const atIndex = email.indexOf("@");
    if (email && (atIndex < 1 || email.indexOf(".", atIndex) === -1)) {
      e.email = "Please enter a valid email (example@mail.com).";
    }

    if (!message) e.message = "Message cannot be empty.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ====== SUBMIT ====== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true);

      setService("AI-Powered Bots");
      setServiceDescription(SERVICE_DATA["AI-Powered Bots"].description);
      setEmail("");
      setMessage("");
      setErrors({});
    }, 800);
  };

  /* ====== МОДАЛКА ====== */
  const closeModal = () => {
    setSent(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (sent) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sent]);

  /* ====== СИНХРОНИЗАЦИЯ С SERVICES ====== */
  useEffect(() => {
    if (selectedService && SERVICE_DATA[selectedService]) {
      setService(selectedService);
      setServiceDescription(SERVICE_DATA[selectedService].description);
    }
  }, [selectedService]);

  return (
    <div id={id} className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Contact Us!</h2>
        <p className={styles.subtitle}>
          Connect with us! We will be lorem ipsum sir a dor amet.
        </p>

        {/* ====== SERVICE SELECT ====== */}
        <label className={styles.label}>
          Service Type
          <div className={styles.selectWrap}>
            <select
              value={service}
              onChange={(e) => {
                const value = e.target.value;
                setService(value);
                setServiceDescription(SERVICE_DATA[value].description);
              }}
              className={styles.select}
            >
              <option value="AI-Powered Bots">AI-Powered Bots</option>
              <option value="Brand Identity & Guidelines">
                Brand Identity & Guidelines
              </option>
              <option value="Social Media Setup & Branding">
                Social Media Setup & Branding
              </option>
              <option value="Other">Other</option>
            </select>
          </div>
          <h3 className={styles.description}>Description:</h3>
          <p className={styles.serviceDescription}>{serviceDescription}</p>
          {errors.service && (
            <div className={styles.error}>{errors.service}</div>
          )}
        </label>

        {/* ====== EMAIL ====== */}
        <label className={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your_email@mail.com"
            className={styles.input}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </label>

        {/* ====== MESSAGE ====== */}
        <label className={styles.label}>
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hello, its an message example!"
            className={styles.textarea}
            rows="8"
          />
          {errors.message && (
            <div className={styles.error}>{errors.message}</div>
          )}
        </label>

        <div className={styles.buttonsRow}>
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={sending}
            aria-busy={sending}
          >
            {sending ? "sending..." : "send_message"}
          </button>
        </div>
      </form>

      {/* ====== SUCCESS MODAL ====== */}
      {sent && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.successTitle}>
              Email was successfully sent!
            </h3>
            <p className={styles.successSubtitle}>
              Thank you, we will contact with you as fast, as we can.
            </p>

            <div style={{ textAlign: "center", marginTop: 18 }}>
              <button
                ref={closeBtnRef}
                className={styles.successClose}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

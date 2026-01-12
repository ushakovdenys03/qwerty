import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./form.module.css";
import contactFormConfig from "./contactForm.json";

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
  "Mobile Development": {
    description:
      "Mobile apps for you and your clients. Developed for iOS and Android. Your company on your phone!",
  },
  Other: {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

export default function Form({ id, selectedService }) {
  /* ====== STATE ====== */
  const defaultService = selectedService || "AI-Powered Bots";

  const [service, setService] = useState(defaultService);
  const [serviceDescription, setServiceDescription] = useState(
    SERVICE_DATA[defaultService]?.description || ""
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const closeBtnRef = useRef(null);

  /* ====== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ЗАМЕНЫ ТЕКСТА ====== */
  const fillTemplate = (template, data) => {
    return template.replace(/{{(\w+)}}/g, (match, key) => {
      return data[key] || match;
    });
  };

  /* ====== EMAIL SENDER ====== */
  const sendEmail = useCallback(
    async ({ creation_date, title, main_text, name }) => {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_7k89wre",
            template_id: "template_1xhkldc",
            user_id: "zbvAAoiy554gF8jqW",
            template_params: {
              creation_date,
              title,
              main_text,
              name,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("EmailJS send failed");
      }
    },
    []
  );

  /* ====== ВАЛИДАЦИЯ ====== */
  const validate = useCallback(() => {
    const e = {};

    if (!name.trim()) e.name = "Please enter your name.";
    if (!service) e.service = "Please select a service.";
    if (!email) e.email = "Email is required.";

    const atIndex = email.indexOf("@");
    if (email && (atIndex < 1 || email.indexOf(".", atIndex) === -1)) {
      e.email = "Please enter a valid email (example@mail.com).";
    }

    if (!message.trim()) e.message = "Message cannot be empty.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }, [name, service, email, message]);

  /* ====== SUBMIT ====== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    const now = new Date().toLocaleString();
    const templateData = {
      name,
      email,
      service,
      message,
      creation_date: now,
    };

    try {
      // Формируем текст письма на основе JSON-шаблона
      const finalTitle = fillTemplate(contactFormConfig.title, templateData);
      const finalMainText = fillTemplate(
        contactFormConfig.main_text,
        templateData
      );

      await sendEmail({
        creation_date: now,
        title: finalTitle,
        main_text: finalMainText,
        name: name,
      });

      setSent(true);

      // Очистка формы
      setName("");
      setEmail("");
      setMessage("");
      setService("AI-Powered Bots");
      setServiceDescription(SERVICE_DATA["AI-Powered Bots"].description);
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to send email. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  /* ====== МОДАЛКА ====== */
  const closeModal = useCallback(() => {
    setSent(false);
    document.body.style.overflow = "";
  }, []);

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
          Connect with us! Leave your details below.
        </p>

        {/* ====== NAME ====== */}
        <label className={styles.label}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={styles.input}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </label>

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
              {Object.keys(SERVICE_DATA).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <h3 className={styles.description}>Description:</h3>
          <p className={styles.serviceDescription}>{serviceDescription}</p>
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
            placeholder="Tell us more about your project..."
            className={styles.textarea}
            rows="8"
          />
          {errors.message && (
            <div className={styles.error}>{errors.message}</div>
          )}
        </label>

        <div className={styles.buttonsRow}>
          <button type="submit" className={styles.sendBtn} disabled={sending}>
            {sending ? "sending..." : "send_message"}
          </button>
        </div>
      </form>

      {/* ====== SUCCESS MODAL ====== */}
      {sent && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <h3 className={styles.successTitle}>Successfully sent!</h3>
            <p className={styles.successSubtitle}>
              Thank you, we will contact you as fast as we can.
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

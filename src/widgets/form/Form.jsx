import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./form.module.css";
import contactFormConfig from "./contactForm.json";

/* ====== ОПИСАНИЯ СЕРВИСОВ ====== */
const SERVICE_DATA = {
  "AI-Powered Integrations": {
    description:
      "Modern technology allows you to integrate artificial intelligence directly into your digital projects. This means you can add smart features, such as automated consultants or virtual assistants, that work for you around the clock. These tools are designed to handle routine tasks, answer common questions instantly, and provide a high level of service without constant human supervision.",
  },
  "Brand Identity & Guidelines": {
    description:
      "A strong brand identity is what makes your company recognizable and unique in a crowded market. Our designers help you build a professional visual style, starting with a memorable logo and a complete brandbook. This service ensures that every part of your business - from your website to your documents - looks consistent, polished, and trustworthy.",
  },
  "Mobile Development": {
    description:
      "Mobile applications provide access to the largest group of users in the world today. Since most people carry a smartphone at all times, a mobile app puts your business directly into the hands of your audience. This platform allows you to stay visible and accessible, ensuring that your services are available with just a single tap on a screen. The installation of an app naturally motivates a person to use your service again and again. Unlike mobile websites, these applications are much faster and use native functions of the phone to provide a smooth experience. By having a permanent icon on their screen, your clients can quickly return to your business, which builds strong loyalty and a regular habit of interaction.",
  },
  "Your Unique Case": {
    description:
      "Have a unique idea or a specific challenge? We are open to all proposals and ready to create a tailored solution that fits your exact business needs. Let's discuss your vision!",
  },
};

export default function Form({ id, selectedService }) {
  /* ====== STATE ====== */
  // Используем функцию для инициализации, чтобы гарантировать наличие значения
  const [service, setService] = useState(() => {
    if (selectedService && SERVICE_DATA[selectedService]) {
      return selectedService;
    }
    return "AI-Powered Integrations";
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const closeBtnRef = useRef(null);

  /* ====== ДИНАМИЧЕСКОЕ ОПИСАНИЕ ====== */
  const currentServiceDescription =
    SERVICE_DATA[service]?.description ||
    SERVICE_DATA["AI-Powered Integrations"].description;

  /* ====== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ====== */
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: "service_7k89wre",
            template_id: "template_1xhkldc",
            user_id: "zbvAAoiy554gF8jqW",
            template_params: { creation_date, title, main_text, name },
          }),
        }
      );
      if (!response.ok) throw new Error("EmailJS send failed");
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
    const templateData = { name, email, service, message, creation_date: now };

    try {
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
      setName("");
      setEmail("");
      setMessage("");
      setService("AI-Powered Integrations");
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Failed to send email. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const closeModal = useCallback(() => {
    setSent(false);
    document.body.style.overflow = "";
  }, []);

  /* ====== ЭФФЕКТЫ ====== */
  useEffect(() => {
    if (sent) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [sent]);

  // Синхронизация
  useEffect(() => {
    if (selectedService && SERVICE_DATA[selectedService]) {
      setService(selectedService);
    }
  }, [selectedService]);

  return (
    <div id={id} className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Contact Us!</h2>
        <p className={styles.subtitle}>
          Connect with us! Leave your details below.
        </p>

        {/* ====== SERVICE SELECT ====== */}
        <label className={styles.label}>
          Service Type
          <div className={styles.selectWrap}>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
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
          <p className={styles.serviceDescription}>
            {currentServiceDescription}
          </p>
        </label>

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

      {/* SUCCESS MODAL */}
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

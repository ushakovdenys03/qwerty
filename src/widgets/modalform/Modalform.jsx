import { useEffect, useRef, useState } from "react";
import styles from "./modalform.module.css";

export default function ModalForm({ isOpen, onClose, prices, defaultPrice }) {
  const [selected, setSelected] = useState(defaultPrice);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSelected(defaultPrice);
      setEmail("");
      setMessage("");
      setErrors({});
      setSent(false);
    }
  }, [isOpen, defaultPrice]);

  /* ===== VALIDATION ===== */
  const validate = () => {
    const e = {};

    if (!email) e.email = "Email is required.";
    const at = email.indexOf("@");
    if (email && (at < 1 || email.indexOf(".", at) === -1)) {
      e.email = "Please enter a valid email.";
    }

    if (!message) e.message = "Message cannot be empty.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSent(true); // 🔥 форма исчезает
      document.body.style.overflow = "hidden";
    }, 800);
  };

  /* ===== CLOSE SUCCESS ===== */
  const closeSuccess = () => {
    setSent(false);
    document.body.style.overflow = "";
    onClose();
  };

  useEffect(() => {
    if (sent) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sent]);

  if (!isOpen && !sent) return null;

  return (
    <div className={styles.overlay}>
      {/* ===== FORM MODAL ===== */}
      {!sent && (
        <div className={styles.modal}>
          <h2 className={styles.title}>Contact Us!</h2>
          <p className={styles.desc}>
            Connect with us! We will contact you as soon as possible.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label>Service type</label>
            <select
              className={styles.select}
              value={selected.title}
              onChange={(e) => {
                const found = prices.find(
                  (item) => item.title === e.target.value
                );
                setSelected(found);
              }}
            >
              {prices.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>

            <div className={styles.block}>
              <h3>
                <strong>{selected.title}</strong>
              </h3>
              <p>{selected.text}</p>

              <ul>
                {selected.information.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>
                <strong>Price from: ${selected.price}</strong>
              </p>
            </div>

            <label>Email</label>
            <input
              type="email"
              placeholder="your_email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}

            <label>Message</label>
            <textarea
              placeholder="Hello, it's a message example!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <div className={styles.error}>{errors.message}</div>
            )}

            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.cancel}
                onClick={onClose}
                disabled={sending}
              >
                cancel
              </button>
              <button type="submit" className={styles.send} disabled={sending}>
                {sending ? "sending..." : "send_message"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== SUCCESS MODAL ===== */}
      {sent && (
        <div className={styles.successOverlay}>
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <h3 className={styles.successTitle}>
              Email was successfully sent!
            </h3>
            <p className={styles.successSubtitle}>
              Thank you, we will contact with you as fast, as we can.
            </p>

            <div style={{ textAlign: "center" }}>
              <button
                ref={closeBtnRef}
                className={styles.successClose}
                onClick={closeSuccess}
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

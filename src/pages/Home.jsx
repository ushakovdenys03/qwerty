import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../widgets/navigationbar/Navbar";
import Services from "../widgets/service/Services";
import PricesAll from "../widgets/prices/PricesAll";
import Form from "../widgets/form/Form";
import Footer from "../widgets/footer/Footer";
import ModalForm from "../widgets/modalform/Modalform";
import Hero from "../widgets/hero/Hero";

/* ===============================
   SINGLE SOURCE OF TRUTH
================================ */
const pricesData = [
  {
    id: "prices_1",
    title: "Online Stores & \nE-Commerce",
    text: "Scalable e-commerce platforms with shopping carts, payments, inventory managemen",
    information: [
      "Secure online payments",
      "Advanced product filtering",
      "Smart search functionality",
      "Shopping cart & wishlist",
      "Inventory & order tracking",
      "Mobile-responsive design",
      "SEO optimization for higher sales",
    ],
    price: "3000",
  },
  {
    id: "prices_2",
    title: "Business & \nCorporate Sites",
    text: "Informational websites to showcase your company, services, team, and build trust with potential clients.",
    information: [
      "Professional custom design",
      "Services & Portfolio showcase",
      "About Us & Team sections",
      "Blog & News integration",
      "Contact forms & maps",
      "Testimonials & case studies",
      "Fast loading & SEO-ready",
    ],
    price: "2000",
    featured: true,
  },
  {
    id: "prices_3",
    title: "Marketing Landing Pages",
    text: "Targeted one-page sites designed for ads, lead capture, and maximum conversion rates.",
    information: [
      "High-conversion layout",
      "Eye-catching hero section",
      "Lead capture forms",
      "Call-to-action buttons",
      "Social proof & testimonials",
      "A/B testing ready",
      "Integration with ads platforms",
    ],
    price: "700",
  },
  {
    id: "prices_4",
    title: "Custom Web Applications",
    text: "Tailored web-based solutions including production tracking systems, inventory management, manufacturing dashboards, CRM/ERP integrations, and automated reporting tools",
    information: [
      "Real-time production tracking",
      "Manufacturing dashboards",
      "Inventory & stock control",
      "CRM/ERP system integration",
      "Automated reports & analytics",
      "User roles & access control",
      "Data visualization charts",
    ],
    price: "1000",
  },
];

export default function Home() {
  /* ===============================
     STATE
  ================================ */
  const [selectedService, setSelectedService] = useState("Landing");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(pricesData[0]);

  /* ===============================
     SCROLL TO HASH (#prices_1)
  ================================ */
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      // небольшой timeout — чтобы DOM точно успел отрендериться
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

  /* ===============================
     HANDLERS
  ================================ */
  const openModal = (price) => {
    setCurrentPrice(price);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <>
      {/* NAVIGATION */}
      <Navbar onOrderClick={() => openModal(pricesData[0])} />

      {/* HERO */}
      <Hero />

      {/* SERVICES */}
      <Services onSelectService={setSelectedService} />

      {/* PRICES */}
      <PricesAll pricesData={pricesData} onOrderClick={openModal} />

      {/* FORM */}
      <Form id="form" selectedService={selectedService} />

      {/* FOOTER */}
      <Footer />

      {/* MODAL FORM */}
      <ModalForm
        isOpen={modalOpen}
        onClose={closeModal}
        prices={pricesData}
        defaultPrice={currentPrice}
      />
    </>
  );
}

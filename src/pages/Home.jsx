import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../widgets/navigationbar/Navbar";
import Services from "../widgets/service/Services";
import PricesAll from "../widgets/prices/PricesAll";
import Form from "../widgets/form/Form";
import Footer from "../widgets/footer/Footer";
import ModalForm from "../widgets/modalform/Modalform";
import Hero from "../widgets/hero/Hero";
import PortfolioAll from "../widgets/portfolio/PortfolioAll";

/* ===============================
   SINGLE SOURCE OF TRUTH
================================ */
const pricesData = [
  {
    id: "prices_1",
    title: "Online Stores & \nE-Commerce",
    text: "Scalable e-commerce platforms with shopping carts, payments, inventory management",
    information: [
      "Secure online payments",
      "Advanced product filtering",
      "Smart search functionality",
      "Shopping cart & wishlist",
      "Inventory & order tracking",
      "Mobile-responsive design",
      "SEO optimization for higher sales",
    ],
    price: "5000",
  },
  {
    id: "prices_2",
    title: "Business & \nCorporate Sites",
    text: "Informational websites to showcase your company, services, team, and build trust with potential clients.",
    information: [
      "Professional custom design",
      "Services showcase",
      "Blog integration",
      "Contact forms & maps",
      "CMS panel",
    ],
    price: "3000",
    featured: true,
  },
  {
    id: "prices_3",
    title: "Mobile Development",
    text: "Native and cross-platform mobile apps. Applications for you and your customers. ",
    information: [
      "Admin and client apps",
      "Super intuitive",
      "Push notifications",
      "Play Market",
      "App Store",
      "GPay/ApplePay integrations",
    ],
    price: "5000",
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

// ПОРТФОЛИО

const portfolioSlides = [
  {
    title: "Online Stores & \nE-Commerce",
    description:
      "Scalable e-commerce platforms with shopping carts, payments, inventory managemen",
    imageMain: <img src="/internetshop1.png" alt="main" />,
    imageOne: <img src="/internetshop2.png" alt="thumb4" />,
    imageTwo: <img src="/internetshop4.png" alt="thumb5" />,
    imageThree: <img src="/internetshop3.png" alt="thumb6" />,
  },
  {
    title: "Business & \nCorporate Sites",
    description:
      "Custom websites, e-commerce stores, landing pages, and web portals built with modern technologies for seamless user experience and high performance.",
    imageMain: <img src="/library-business.png" alt="main" />,
    imageOne: <img src="/library-business2.png" alt="thumb1" />,
    imageTwo: <img src="/international_comopany1.png" alt="thumb2" />,
    imageThree: <img src="/library-business3.png" alt="thumb3" />,
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps. Applications for you and your customers. ",
    imageMain: <img src="/mobile-1.png" alt="main" />,
    imageOne: <img src="/mobile-2.png" alt="thumb1" />,
    imageTwo: <img src="/library-mobile2.jpeg" alt="thumb2" />,
    imageThree: <img src="/mobile-3.png" alt="thumb3" />,
  },
  {
    title: "Custom Web Applications",
    description:
      "Tailored web-based solutions including production tracking systems, inventory management, manufacturing dashboards, CRM/ERP integrations, and automated reporting tools",
    imageMain: <img src="/library-custom1.png" alt="main" />,
    imageOne: <img src="/library-custom2.png" alt="thumb1" />,
    imageTwo: <img src="/library-custom3.png" alt="thumb2" />,
    imageThree: <img src="/penis.png" alt="thumb3" />,
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

      <PortfolioAll slides={portfolioSlides} />

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

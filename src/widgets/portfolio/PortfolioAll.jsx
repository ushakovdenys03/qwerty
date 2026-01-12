import { useState } from "react";
import Portfolio from "./Portfolio";
import styles from "./portfolioAll.module.css";

export default function PortfolioAll({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Buy now!</h2>
        <p className={styles.description}>Prices of your applications</p>
        <p className={styles.text}>
          Here's a list of our standard services. Our consultants can help you
          find the right one for you. Don't hesitate to contact us. We'll
          customize your order just for you! If in doubt, please contact us
          using the form below!
        </p>
      </div>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.navButton}
          onClick={prevSlide}
          style={{ left: "20px" }}
        >
          ‹
        </button>

        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className={styles.fullScreenSlide}>
                <Portfolio
                  imageMain={slide.imageMain}
                  imageOne={slide.imageOne}
                  imageTwo={slide.imageTwo}
                  imageThree={slide.imageThree}
                  title={slide.title}
                  description={slide.description}
                  // Передаем индекс текущего слайда карусели
                  slideIndex={currentIndex}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.navButton}
          onClick={nextSlide}
          style={{ right: "20px" }}
        >
          ›
        </button>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

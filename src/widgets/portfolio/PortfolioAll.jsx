import { useState } from "react";
import Portfolio from "./Portfolio";
import styles from "./portfolioAll.module.css";

export default function PortfolioAll({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const onTouchStart = (e) => {
    // Сохраняем начальную координату
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e) => {
    // Обновляем текущую координату при движении
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    // Если пользователь просто нажал и отпустил (не двигал), ничего не делаем
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Переключаем только если пройден минимальный порог
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    // Если свайп был короткий, currentIndex НЕ меняется, и слайд остается на месте

    // Обязательно обнуляем координаты для следующего раза
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.carouselWrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        /* Добавляем на случай, если мышка имитирует тач в браузере */
        onMouseLeave={() => {
          setTouchStart(null);
          setTouchEnd(null);
        }}
      >
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={prevSlide}
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
                <Portfolio {...slide} slideIndex={index} />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
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
    </div>
  );
}

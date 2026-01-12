import { useState } from "react";
import FsLightbox from "fslightbox-react";
import styles from "./portfolio.module.css";

export default function Portfolio({
  imageMain,
  imageOne,
  imageTwo,
  imageThree,
  description,
  title,
  slideIndex, // Принимаем индекс из PortfolioAll
}) {
  const [toggler, setToggler] = useState(false);
  const [productIndex, setProductIndex] = useState(0);

  // Собираем актуальные src
  const images = [
    imageMain.props.src,
    imageOne.props.src,
    imageTwo.props.src,
    imageThree.props.src,
  ];

  const openLightbox = (index) => {
    setProductIndex(index);
    setToggler(!toggler);
  };

  return (
    <div className={styles.field}>
      <div className={styles.container}>
        <div
          className={styles.mainImageWrapper}
          onClick={() => openLightbox(0)}
        >
          {imageMain}
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.smallImg} onClick={() => openLightbox(1)}>
          {imageOne}
        </div>
        <div className={styles.smallImg} onClick={() => openLightbox(2)}>
          {imageTwo}
        </div>
        <div className={styles.smallImg} onClick={() => openLightbox(3)}>
          {imageThree}
        </div>
      </div>

      {/* Ключ key заставляет лайтбокс полностью пересоздаться при смене слайда */}
      <FsLightbox
        key={`${slideIndex}_${images.join("")}`}
        toggler={toggler}
        sources={images}
        sourceIndex={productIndex}
      />
    </div>
  );
}

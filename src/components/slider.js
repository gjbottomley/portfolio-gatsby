import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";

import "../styles/slider.scss";

import { IMAGES } from "./sliderImages";

const sliderVariants = {
  incoming: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

const Slider = () => {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);

  const activeImageIndex = wrap(0, IMAGES.length, imageCount);

  const swipeToImage = (swipeDirection) => {
    setImageCount([imageCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToImage(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToImage(1);
    }
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className="slider">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={imageCount}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="exit"
              transition={sliderTransition}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
              className="image"
              style={{ overflow: "hidden" }}
            >
              <motion.div style={{ overflow: "auto", height: "fit-content" }}>
                <img src={IMAGES[activeImageIndex].imageSrc} alt="slider" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="buttons">
          <button
            className="button button--prev"
            onClick={() => swipeToImage(-1)}
          >
            PREV
          </button>
          <button
            className="button button--next"
            onClick={() => swipeToImage(1)}
          >
            NEXT
          </button>
        </div>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={activeImageIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="slider-description"
          dangerouslySetInnerHTML={{
            __html: IMAGES[activeImageIndex].description,
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default Slider;

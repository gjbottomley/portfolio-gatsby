import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
  useDragControls,
} from "motion/react";

import { wrap } from "@motionone/utils";
import Modal from "./modal";

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef(1);
  const dragControls = useDragControls();
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((t, delta) => {
    if (isHovered) return; // Stop animation when hovered

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  return (
    <motion.div
      className="parallax"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      drag="x" dragControls={dragControls}
      style={{ touchAction: "none" }}
    >
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </motion.div>
  );
};

const Tile = ({ skill }) => {
  
  const hoverMotion = {
    rest: { y: 0, opacity: 0 },
    hover: {
      y: -14,
      opacity: 1,
    }
  };

  return <motion.div className="tile" initial="rest" whileHover="hover" animate="rest">
    <motion.div className="tile-title" variants={hoverMotion}>{skill}</motion.div>
      <img src={`./skills/${skill}.png`} alt={skill} height={60} layout="fixed" quality={100} placeholder="none" />
    </motion.div>;
}

const Card = ({ id, title, url, description, portfolio }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(
    portfolio.findIndex((item) => item.id === id)
  );

  const hoverMotion = {
    rest: { y: 0, opacity: 0 },
    hover: {
      y: -14,
      opacity: 1,
    },
    arrowRest: {x: -10, opacity: 0},
    arrowHover: {
      x: 0,
      opacity: 1,
    }
  };

  const arrowMotion = {
    rest: {scale: 0, x: -10, opacity: 0},
    hover: {
      scale: 1,
      x: 0,
      opacity: 1,
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true); // Open the modal for this card
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentCardIndex(portfolio.findIndex((item) => item.id === id)); // Reset index
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex + 1 >= portfolio.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex - 1 < 0 ? portfolio.length - 1 : prevIndex - 1
    );
  };

  const currentCard = portfolio[currentCardIndex];

  return (
    <>
      <motion.div
        className="card"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div className="tile-title" variants={hoverMotion} onClick={handleCardClick}>
          {title} <motion.div className="arrow" variants={arrowMotion}></motion.div>
        </motion.div>
        <div className="card-inner">
          <img src={url} alt={title} width={280} />
          <motion.div className="tile-more" variants={arrowMotion} onClick={handleCardClick}>
            <div className="arrow arrow--big" />
          </motion.div>
        </div>
      </motion.div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-inner">
          <motion.img
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, y: -100 }}
            src={currentCard.url}
            alt={currentCard.title}
            width={380}
            onClick={(event) => event.stopPropagation()}
          />
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, y: -100 }}
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>{currentCard.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: currentCard.description,
              }}
            />
            <div className="modal-navigation" 
            onClick={(event) => event.stopPropagation()}>
              <div className="button button--prev" onClick={handlePrev}></div>
              <div className="button button--next" onClick={handleNext}></div>
            </div>
          </motion.div>
        </div>
      </Modal>
    </>
  );
};

export { ParallaxText, Tile, Card };

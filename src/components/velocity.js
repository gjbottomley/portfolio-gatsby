import React, { useRef } from "react";
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

  useAnimationFrame((t, delta) => {
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
    <div className="parallax">
      <motion.div className="scroller" style={{ x }} drag="x" dragConstraints={{ left: -100, right: 100 }} dragControls={dragControls}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
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

export { ParallaxText, Tile };

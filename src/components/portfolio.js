import React, { useState } from "react";
import {
  useScroll,
  useTransform,
} from "motion/react";
import { ParallaxText, Card } from "./velocity";
import { PORTFOLIO } from "./portfolioCards";

const Portfolio = () => {
  const { scrollY } = useScroll();
  const motionObject = useTransform(scrollY, [100, 0], [0, 100]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNavigate = (currentId, direction) => {
    const currentIndex = PORTFOLIO.findIndex((item) => item.id === currentId);
    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (newIndex < 0) newIndex = PORTFOLIO.length - 1; // Wrap to last
    if (newIndex >= PORTFOLIO.length) newIndex = 0; // Wrap to first

    setCurrentCardIndex(newIndex);
  };

  return (

        <div className="velocity-container velcoity-container--skills">
          <h3>Lets take a look</h3>
          <ParallaxText baseVelocity={0.1}>
            {PORTFOLIO.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                url={item.url}
                description={item.description}
                portfolio={PORTFOLIO}
              />
            ))}
          </ParallaxText>
        </div>
  );
};

export default Portfolio;

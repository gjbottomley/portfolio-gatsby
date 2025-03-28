import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";

const useParallax = (value, distance) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const Section = ({ title, children, color = `#ffffff`, valign = `center`, id }) => {
    const ref = useRef(null);
  
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 200);

  
    const isDarkColor = (color) => {
      const c = color.substring(1); // strip #
      const rgb = parseInt(c, 16); // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xff; // extract red
      const g = (rgb >> 8) & 0xff; // extract green
      const b = (rgb >> 0) & 0xff; // extract blue
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return luma < 128;
    };
  
    return (
      <section
        className={`bar ${isDarkColor(color) ? "dark" : ""} ${id}`}
        style={{ backgroundColor: `${color}`, alignItems: `${valign}` }}
        id={id} 
      >
        <div className="container">
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1,  transition: { delay: 0.2 } }}
          style={{y: y}}
          className="title" ref={ref}
        >
          <h2>{title}</h2>
        </motion.div>
      </section>
    );
  };

  export default Section;
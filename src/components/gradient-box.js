import React from "react";
import {
    motion,
  } from "motion/react";


const GradientBox = ({color, location}) => {

    return (
        <motion.div className={`gradient-box ${color} ${location}`} initial={{x: -600, opacity: 0, rotate: "30deg", transition: {delay: 1}}} whileInView={{x: -200, opacity: 1, rotate: "45deg"}}></motion.div>
    );
}

export default GradientBox;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          top: mousePosition.y,
          left: mousePosition.x,
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          top: mousePosition.y,
          left: mousePosition.x,
        }}
        transition={{ type: "ease", stiffness: 0 }}
      />
      <motion.div
        className="mouse-gradient"
        animate={{
          top: mousePosition.y,
          left: mousePosition.x,
        }}
        transition={{ type: "ease", stiffness: 300 }}
      ></motion.div>
    </>
  );
};

export default CustomCursor;

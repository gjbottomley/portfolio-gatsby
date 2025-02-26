import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    const handleLinkHover = () => {
      setIsHoveringLink(true);
    };

    const handleLinkUnhover = () => {
      setIsHoveringLink(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkUnhover);
      });
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
          transform: isHoveringLink
            ? "scale(1.3) translate(-50%,-50%)"
            : "scale(1) translate(-50%,-50%)",
          opacity: isHoveringLink ? 0.5 : 1,
        }}
        transition={{ type: "tween", stiffness: 0 }}
      />
      <motion.div
        className={`mouse-gradient ${isHoveringLink ? " active" : ""}`}
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

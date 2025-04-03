import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import {
  AnimatePresence,
  motion
} from "motion/react";

const Modal = ({ children, isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen); // Sync isModalOpen with isOpen
    if (typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? 'hidden' : ''; // Toggle body overflow
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = ''; // Cleanup on unmount
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false); // Set isModalOpen to false
    onClose(false); // Notify parent to set isOpen to false
  };

  if (typeof document === "undefined") {
    return null; // Prevent rendering on the server
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose} // Close modal when clicking outside
        >
          <div
              className="button button--close"
              onClick={handleClose} // Close modal when clicking the close button
            />
          <motion.div
            className="modal"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            //onClick={(event) => event.stopPropagation()} // Prevent closing when clicking inside
          >
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body // Render inside the body
  );
};

export default Modal;
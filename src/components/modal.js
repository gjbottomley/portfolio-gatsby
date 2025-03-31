import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    motion
} from "motion/react";
import {BrowserView, MobileView} from 'react-device-detect';
import { del } from 'framer-motion/client';

const Modal = () => {
      const isEventListenerConnected = useRef(false);
      const [isFullScreen, setFullScreen] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);
    
      const getFullScreenElement = (() => {
        if (document.fullscreenEnabled) {
          return document.fullscreenElement;
        } else if (document.webkitFullscreenEnabled) {
          return document.webkitFullscreenElement;
        } else if (document.mozFullScreenEnabled) {
          return document.mozFullScreenElement;
        } else if (document.msFullscreenEnabled) {
          return document.msFullscreenElement;
        } else {
          return;
        }
      });
    
      const hasEvent = ((contentElement, eventName) => {
        for (const key in contentElement) {
          if (eventName === key) {
            return true;
          }
        }
        return false;
      });
    
      const getFullScreenChangeEvent = ((contentElement) => {
        if (document.fullscreenEnabled && hasEvent(contentElement, 'onfullscreenchange')) {
          return 'fullscreenchange';
        } else if (document.webkitFullscreenEnabled && hasEvent(contentElement, 'onwebkitfullscreenchange')) {
          return 'webkitfullscreenchange';
        } else if (document.mozFullScreenEnabled && hasEvent(contentElement, 'onmozfullscreenchange')) {
          return 'mozfullscreenchange';
        } else if (document.msFullscreenEnabled && hasEvent(contentElement, 'onmsfullscreenchange')) {
          return 'msfullscreenchange';
        } else {
          return;
        }
      });
    
      const getFullScreenCancelMethod = (() => {
        if (document.fullscreenEnabled && document.exitFullscreen) {
          return document.exitFullscreen;
        } else if (document.webkitFullscreenEnabled && document.webkitExitFullscreen) {
          return document.webkitExitFullscreen;
        } else if (document.mozFullScreenEnabled && document.mozCancelFullScreen) {
          return document.mozCancelFullScreen;
        } else if (document.msFullscreenEnabled && document.msExitFullscreen) {
          return document.msExitFullscreen;
        } else {
          return;
        }
      });
    
      const getFullScreenRequestMethod = ((contentElement) => {
        if (document.fullscreenEnabled && contentElement.requestFullscreen) {
          return contentElement.requestFullscreen;
        } else if (document.webkitFullscreenEnabled && contentElement.webkitRequestFullscreen) {
          return contentElement.webkitRequestFullscreen;
        } else if (document.mozFullScreenEnabled && contentElement.mozRequestFullScreen) {
          return contentElement.mozRequestFullScreen;
        } else if (document.msFullscreenEnabled && contentElement.msRequestFullscreen) {
          return contentElement.msRequestFullscreen;
        } else {
          return;
        }
      });
    
      const fullScreenChangeListener = ((setFullScreen) => {
        const isFullScreenActive = getFullScreenElement() != null;
        setFullScreen(isFullScreenActive);
      });
    
      useEffect(() => {
        if (!isEventListenerConnected.current) {
          let contentElement = document.getElementById('app');
          if (contentElement) {
    
            let eventName = getFullScreenChangeEvent(contentElement);
            if (eventName) {
              contentElement.addEventListener(eventName, () => fullScreenChangeListener(setFullScreen));
            }
    
            isEventListenerConnected.current = true;
          }
        }
      }, [isEventListenerConnected, setFullScreen]);

      useEffect(() => {
        setModalOpen(true);
      },[]);
    
    
      const toggleFullScreen = useCallback(() => {
        if (isFullScreen) {
          const requestMethod = getFullScreenCancelMethod();
          if (requestMethod) {
            requestMethod.call(document);
          }
        } else {
          const contentElement = document.getElementById('app');
          const requestMethod = getFullScreenRequestMethod(contentElement);
          if (requestMethod) {
              requestMethod.call(contentElement);
          }
        }

        setModalOpen(false);
      }, [isFullScreen]);
  
      const hoverMotion = {
        show: { width: "auto", opacity: 1 },
        hover: {
          width: "auto",
          opacity: 1,
        },
        hide: {
          width: 0,
          opacity: 0,
          transition: {
            delay: 1,
          }
        }
      };

  return (
    <>
    {/* {modalOpen &&
      <div className="modal-wrapper" onClick={}>
          <motion.div className="modal">
              <div>
              <h3>Mobile Browser Detected</h3>
              <p>For the best mobile experience, I recommend using fullscreen mode.</p>
              <p><span>Note: Due to the website's dynamic nature, you may briefly notice layout adjustments when your browser's search/URL bar appears or disappears.</span></p>
              </div>
              <div className="button button--pink" onClick={toggleFullScreen}>Full screen</div>
          </motion.div>
      </div>
    } 
    <MobileView>
      <motion.div className="fullscreen-button" onClick={toggleFullScreen} initial="show" whileHover="hover" whileInView="hide">
        {!isFullScreen &&
          <img src="./expand.png" width="20"/>
        }
        { isFullScreen &&
          <img src="./compress.png" width="20"/>
        }
          <motion.div className="fullscreen__text" variants={hoverMotion}>
                  { isFullScreen ? ' Exit' : ' Enter' } Fullscreen
          </motion.div>
      </motion.div>
    </MobileView>*/}
    </>
  );
};

export default Modal;
import React, { useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const logo = require("../images/logo.png");

const SidePanel = () => {
  const [isDarkSection, setIsDarkSection] = useState(false);

  const handleClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });

    if (section && section.classList.contains("dark")) {
      setIsDarkSection(true);
    } else {
      setIsDarkSection(false);
    }
  };

  const checkCurrentSection = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
      ) {
        if (section.classList.contains("dark")) {
          setIsDarkSection(true);
        } else {
          setIsDarkSection(false);
        }
      }
    });
  };

  useEffect(() => {
    checkCurrentSection();
    window.addEventListener("scroll", checkCurrentSection);
    return () => {
      window.removeEventListener("scroll", checkCurrentSection);
    };
  }, []);

  return (
    <div className={`side-panel ${isDarkSection ? "dark" : ""}`}>
      <div className="logo" onClick={() => handleClick("top")}>
        <StaticImage
          src="../images/logo.png"
          alt="George Bottomley"
          placeholder="blurred"
          width={50}
        />
      </div>
      <div className="nav">
        <div onClick={() => handleClick("about")} className="nav-item">
          About
        </div>
        <div onClick={() => handleClick("skills")} className="nav-item">
          Skills
        </div>
        <div onClick={() => handleClick("portfolio")} className="nav-item">
          Portfolio
        </div>
        <div onClick={() => handleClick("contact")} className="nav-item">
          Contact
        </div>
      </div>
      <div className="social">
        <Link
          to="https://www.linkedin.com/in/gjbottomley"
          className="icon"
          target="_blank"
        >
          <StaticImage
            src="../images/linkedin.png"
            alt="Linkedin George Bottomley"
            placeholder="blurred"
            width={32}
            layout="fixed"
            quality={100}
          />
        </Link>
        <Link
          to="https://github.com/gjbottomley"
          className="icon"
          target="_blank"
        >
          <StaticImage
            src="../images/git.png"
            alt="Github George Bottomley"
            placeholder="blurred"
            width={32}
          />
        </Link>
      </div>
    </div>
  );
};

export default SidePanel;

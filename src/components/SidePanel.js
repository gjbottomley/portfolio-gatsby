import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <div className="logo">
        <StaticImage
          src="../images/logo.png"
          alt="George Bottomley"
          placeholder="blurred"
          width={50}
        />
      </div>
      <div className="nav">
        <Link to="" className="nav-item">
          About
        </Link>
        <Link to="" className="nav-item">
          Portfolio
        </Link>
        <Link to="" className="nav-item">
          Contact
        </Link>
      </div>

      <Link to="" className="icon">
        <StaticImage
          src="../images/git.png"
          alt="Github George Bottomley"
          placeholder="blurred"
          width={36}
        />
      </Link>
    </div>
  );
};

export default SidePanel;

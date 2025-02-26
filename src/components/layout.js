import React from "react";
import Favicon from "react-favicon";

// Styles
import "../styles/main.scss";
import icon from "../images/favicon.png";
import SidePanel from "./SidePanel";

export default function Layout({ children }) {
  return (
    <>
      <Favicon url={icon} />
      <SidePanel />
      <div className="gradient"></div>
      <main>{children}</main>
    </>
  );
}

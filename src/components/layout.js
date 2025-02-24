import React from "react";
import Favicon from "react-favicon";

// Styles
import "../styles/main.scss";
import icon from "../images/favicon.png";

export default function Layout({ children }) {
  return (
    <>
      <Favicon url={icon} />
      <main>{children}</main>
    </>
  );
}

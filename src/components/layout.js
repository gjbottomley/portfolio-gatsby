import React, {useEffect} from "react";
import Favicon from "react-favicon";

// Styles
import "../styles/main.scss";
import icon from "../images/favicon.png";
import SidePanel from "./sidePanel";

export default function Layout({ children }) {

    useEffect(() => {
      document.body.classList.add('snap');
    }, []);
  return (
    <>
      <Favicon url={icon} />
      <SidePanel />
      <main>{children}</main>
    </>
  );
}

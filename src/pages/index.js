import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import { Link } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";
import { TypeAnimation } from "react-type-animation";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const IndexPage = () => {
  const mousePosition = useMousePosition();

  return (
    <Layout>
      <div className="content">
        <div className="logo">
          <StaticImage
            src="../images/logo.png"
            alt="George Bottomley"
            placeholder="blurred"
            width={100}
          />
        </div>
        <div className="counter">
          <div
            className="mouse-gradient"
            style={{
              position: "absolute",
              top: mousePosition.y,
              left: mousePosition.x,
            }}
          ></div>
          <h1>
            George Bottomley
            <br />
            <TypeAnimation
              sequence={[
                " Frontend Developer",
                1000,
                " UI/UX & CX Designer",
                1000,
                " Saas Product designer",
                1000,
              ]}
              wrapper="span"
              speed={10}
              style={{
                fontSize: "1.3em",
                display: "inline-block",
                fontFamily: "Bentham",
                fontWeight: 400,
                fontStyle: "normal",
              }}
              repeat={Infinity}
            />
          </h1>
        </div>
        <Link to="" className="button">
          see portfolio
        </Link>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};

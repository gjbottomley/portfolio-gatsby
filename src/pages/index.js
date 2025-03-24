import React, { useRef, useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import { motion, useScroll, useTransform } from "motion/react";

import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import CustomCursor from "../components/customCursor";
import { ParallaxText, useParallax } from "../components/velocity";
import Contact from "../components/contact";

const Section = ({ title, children, color = `#ffffff`, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  const isDarkColor = (color) => {
    const c = color.substring(1); // strip #
    const rgb = parseInt(c, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma < 128;
  };

  return (
    <section
      className={`bar ${isDarkColor(color) ? "dark" : ""}`}
      style={{ backgroundColor: `${color}` }}
      id={id}
    >
      <div className="container" ref={ref}>
        {children}
      </div>
      <motion.div
        initial={{ visibility: "hidden", opacity: "0" }}
        animate={{ visibility: "visible", opacity: "1" }}
        style={{ y }}
        className="title"
      >
        <h2>{title}</h2>
      </motion.div>
    </section>
  );
};

const IndexPage = () => {
  const { scrollY } = useScroll();
  const motionObject = useTransform(scrollY, [100, 0], [0, 100]);
  const [formSucceeded, setFormSucceeded] = useState(false);

  return (
    <Layout>
      <CustomCursor />
      <section className="bar header" id="top">
        <div className="velocity-container">
          <ParallaxText baseVelocity={-2}>Software Developer</ParallaxText>
          <ParallaxText baseVelocity={2}>UI/UX Designer</ParallaxText>
        </div>
        <div className="head">
          <div className="content">
            <div className="counter">
              <h1 className="name">George Bottomley</h1>
            </div>
            <motion.div
              className="headshot-container"
              style={{ opacity: motionObject }}
            >
              <StaticImage
                className="headshot"
                src="../images/headshot.png"
                alt=""
                width={600}
                layout="fixed"
                quality={100}
                placeholder="none"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <Section title="About" color={`#f5f5f5`} id="about">
        <div className="block">contact info goes here</div>
      </Section>
      <Section title="Portfolio" id="portfolio">
        <div>contact info goes here</div>
      </Section>
      <Section title="Contact" color={`#30314f`} id="contact">
        <div
          className={`block block--contact ${formSucceeded ? "succeeded" : ""}`}
        >
          <Contact onSuccess={setFormSucceeded} />
        </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};

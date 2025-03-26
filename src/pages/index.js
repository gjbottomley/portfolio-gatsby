import React, { useRef, useState, useEffect } from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "motion/react";

import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import CustomCursor from "../components/customCursor";
import { ParallaxText, useParallax } from "../components/velocity";
import Contact from "../components/contact";
import Slider from "../components/slider";

const Section = ({ title, children, color = `#ffffff`, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 200);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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

  const ref = useRef(null);
  const isInView = useInView(ref);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [isInView]);

  return (
    <Layout>
      <CustomCursor />
      <section className="bar header" id="top">
        <div className="velocity-container">
          <ParallaxText baseVelocity={-1}>Software Developer</ParallaxText>
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
        <div className="block">
          <strong>Peronsal</strong>
          <p>
            Hi, I'm George, originally hailing from sunny England. I've been
            lucky enough to call beautiful New Zealand home for over seven years
            now. When I'm not around, you'll likely find me enjoying the great
            outdoors or spending quality time with my family.
          </p>
          <strong>Work</strong>
          <p>
            With a diverse background spanning web development, software
            development, app, UI/UX, graphic design, animation, marketing, and
            branding, I possess a unique blend of technical and creative skills
            My journey through these disciplines has provided me with a
            comprehensive understanding of the entire product development
            lifecycle, from initial concept to final execution.
          </p>
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="experience-counter"
        >
          <h3>I'm Looking for work!</h3>
        </motion.div>
      </Section>
      <Section title="Experience" id="experience" ref={ref}>
        <div className="flex-wrapper">
          <Slider />
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="experience-counter"
        >
          <h3>Over 15 Years</h3>
        </motion.div>
      </Section>
      <Section title="Contact" color={`#30314f`} id="contact">
        <div
          className={`block block--contact ${formSucceeded ? "succeeded" : ""}`}
        >
          <Contact onSuccess={setFormSucceeded} />
        </div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="experience-counter"
        >
          <h3>Id love to hear from you!</h3>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};

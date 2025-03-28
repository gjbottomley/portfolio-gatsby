import React, {  useState } from "react";
import { StaticImage } from "gatsby-plugin-image";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import CustomCursor from "../components/customCursor";
import { ParallaxText, Tile } from "../components/velocity";
import Contact from "../components/contact";
import Slider from "../components/slider";
import Section from "../components/section";
import GradientBox from "../components/gradient-box";

const IndexPage = () => {
  const { scrollY } = useScroll();
  const motionObject = useTransform(scrollY, [100, 0], [0, 100]);
  const [formSucceeded, setFormSucceeded] = useState(false);

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
              <h1 className="name">George Bottomley</h1>
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
      <Section title="About" color={`#f5f5f5`} id="about" valign="flex-start">
        <GradientBox color="green" />
        <div className="block block--about">
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
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="sub-title"
        >
          <h3>I'm Looking for work</h3>
        </motion.div>
      </Section>
      <Section title="Skills & Experience" color={`#30314f`} id="skills" valign="flex-start">
        <GradientBox color="pink" />
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="sub-title"
        >
          <h3>Over 15 Years</h3>
          
        </motion.div>
        <div className="skills-parallax"><h3>Knowledge in</h3>
        <ParallaxText baseVelocity={0.4}>
          <Tile skill="react" />
          <Tile skill="angular" />
          <Tile skill="typescript" />
          <Tile skill="flutter" />
          <Tile skill="php" />
          <Tile skill="laravel" />
          <Tile skill="git" />
          <Tile skill="html" />
          <Tile skill="css" />
          <Tile skill="javascript" />
        </ParallaxText>
        </div>
      </Section>
      <Section title="Portfolio" id="portfolio">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="sub-title"
        >
          <h3>A short overview</h3>
        </motion.div>
        <GradientBox color="green" location="top" />
        <div className="flex-wrapper">
          <Slider />
        </div>
      </Section>
      <Section title="Contact" color={`#30314f`} id="contact">
      <GradientBox color="pink" />
      <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 1 } }}
          className="sub-title"
        >
          <h3>Id love to hear from you</h3>
        </motion.div>
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

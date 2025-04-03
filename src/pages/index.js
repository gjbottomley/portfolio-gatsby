import React, {  useState } from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import { ParallaxText, Tile } from "../components/velocity";
import Contact from "../components/contact";
import Slider from "../components/slider";
import Section from "../components/section";
import GradientBox from "../components/gradient-box";
import Portfolio from "../components/portfolio";
import { BrowserView, MobileOnlyView } from "react-device-detect";

const IndexPage = () => {
  const { scrollY } = useScroll();
  const motionObject = useTransform(scrollY, [100, 0], [0, 100]);
  const [formSucceeded, setFormSucceeded] = useState(false);

  return (
    <Layout>
      <section className="bar header" id="top">
        <div className="velocity-container">
          <ParallaxText baseVelocity={-0.5}>Software Developer</ParallaxText>
          <ParallaxText baseVelocity={1}>UI/UX Designer</ParallaxText>
        </div>
        <div className="head">
          <div className="content">
          <StaticImage
                      src="../images/logo.png"
                      alt="George Bottomley"
                      placeholder="blurred"
                      width={100}
                      layout="fixed"
                      className="page-logo"
                    />
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
                layout="constrained"
                quality={100}
                placeholder="none"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <Section title="About" color={`#f5f5f5`} id="about" valign="flex-start">
        <GradientBox color="green" />
        <motion.div className="about-image" initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: 0.4 } }}>
        <StaticImage
                      src="../images/family.png"
                      alt="My Family"
                      placeholder="blurred"
                      width={400}
                      layout="fixed"
                      className="about-image"
                    />
                    </motion.div>
        <motion.div className="block block--about" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
          <p>
            Hi, I'm George, originally hailing from sunny England. I've been
            lucky enough to call beautiful New Zealand home for over seven years
            now. When I'm not around, you'll likely find me enjoying the great
            outdoors or spending quality time with my family.
          </p>
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          className="sub-title"
        >
          <h3>I'm Looking for work</h3>
        </motion.div>
      </Section>
      <Section title="Skills & Experience" color={`#30314f`} id="skills" valign="flex-start">
        <GradientBox color="pink" />
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          className="sub-title"
        >
          <h3>Over 15 Years</h3>
          
        </motion.div>
        <motion.div className="block block--skills" initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
          <p>
            My background spans web development, software
            development, app, UI/UX, graphic design, animation, marketing, and
            branding, I possess a unique blend of technical and creative skills
            My journey through these disciplines has provided me with a
            comprehensive understanding of the entire product development
            lifecycle, from initial concept to final execution.
          </p>
        </motion.div>
        <div className="velocity-container velcoity-container--skills"><h3>Technical Skills</h3>
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
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.5 } }}
          className="sub-title"
        >
          <h3>A short overview</h3>
        </motion.div>
        <GradientBox color="green" location="top" />
        <div className="flex-wrapper">
          <BrowserView><Portfolio /></BrowserView>
          <MobileOnlyView><Slider /></MobileOnlyView>
        </div>
      </Section>
      <Section title="Contact" color={`#30314f`} id="contact">
      <GradientBox color="pink" />
      <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
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
      <Section title="Built with" color={`#292a45`} id="built">
        <div className="built-container">
          <h4>Dependancies</h4>
          <ul className="built">
            <li>React</li>
            <li><Link to="https://www.gatsbyjs.com/" target="_blank" title="gatsby">Gatsby</Link></li>
            <li><Link to="https://motion.dev/" target="_blank" title="framer motion">Framer Motion</Link></li>
            <li>Sass</li>
            <li>Node</li>
          </ul>
          <h4>Tools</h4>
          <ul className="built">
            <li>Visual Studio Code</li>
            <li>Git</li>
            <li>Github Copilot</li>
            <li>Figma</li>
            <li>NPM</li>
            <li>Adobe Photoshop</li>
          </ul>
            <Link className="button button--pink center" to="https://github.com/gjbottomley/portfolio-gatsby" target="_blank" title="Github Repository">See Repository</Link>
      </div>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};

import * as React from "react";

import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import { Link } from "gatsby";

import { StaticImage } from "gatsby-plugin-image";
import Countdown from "react-countdown";
import { TypeAnimation } from "react-type-animation";

const IndexPage = () => {
  const Completionist = () => <span>One moment...</span>;

  const renderer = ({ days, hours, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <h2>{days} Days</h2>;
    }
  };

  return (
    <Layout>
      <div className="content">
        <div className="logo">
          <StaticImage
            src="../images/logo.png"
            alt="Freedom Wellness"
            placeholder="blurred"
            width={320}
          />
        </div>
        <div className="counter">
          <h1>
            coming soon&nbsp;
            <TypeAnimation
              sequence={[
                " wellness",
                1000,
                " health",
                1000,
                " lifestyle",
                1000,
                " recovery",
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
                color: "#B3A79B",
              }}
              repeat={Infinity}
            />
          </h1>
          <Countdown date={"2025-05-11T23:00:00"} renderer={renderer} />
        </div>
        <div className="socials">
          <p>
            <i>Follow our socials for sneak peaks</i>
          </p>
          <div className="links">
            <Link
              to="https://www.facebook.com/profile.php?id=61572996437291"
              target="_blank"
              title="Follow us on Facebook"
            >
              <StaticImage
                src="../images/icons/facebook.png"
                alt="Facebook"
                placeholder="blurred"
                width={24}
                quality={24}
              />
            </Link>
            <Link
              to="https://www.instagram.com/freedomwellnessnz/"
              target="_blank"
              title="Follow us on Instagram"
            >
              <StaticImage
                src="../images/icons/instagram.png"
                alt="Instagram"
                placeholder="blurred"
                width={24}
                quality={24}
              />
            </Link>
            {/* <Link to="" title="Follow us on Pinterest" target="_blank">
              <StaticImage
                src="../images/icons/pinterest.png"
                alt="Pinterest"
                placeholder="blurred"
                width={24}
                quality={24}
              />
            </Link>
            <Link to="" title="Follow us on TikTok" target="_blank">
              <StaticImage
                src="../images/icons/tiktok.png"
                alt="TikTok"
                placeholder="blurred"
                width={24}
                quality={24}
              />
            </Link> */}
          </div>
        </div>
      </div>
      <div className="tease-wrapper">
        <div className="tease">
          <div className="card">
            <StaticImage
              src="../images/tease1.png"
              alt="Freedom Wellness"
              placeholder="blurred"
              width={300}
              quality={100}
            />
          </div>
          <div className="card">
            <StaticImage
              src="../images/tease2.png"
              alt="Freedom Wellness"
              placeholder="blurred"
              width={300}
              quality={100}
            />
          </div>
          <div className="card">
            <StaticImage
              src="../images/tease3.png"
              alt="Freedom Wellness"
              placeholder="blurred"
              width={300}
              quality={100}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <SEO />;
};

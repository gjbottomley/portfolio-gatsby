import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { SEO } from "../components/SEO";
import { Link } from "gatsby";

import { TypeAnimation } from "react-type-animation";
import CustomCursor from "../components/CustomCursor";

const IndexPage = () => {
  return (
    <Layout>
      <CustomCursor />
      <div className="content">
        <div className="counter">
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

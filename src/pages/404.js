import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const NotFoundPage = () => {
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
        <h1>404, Page not found.</h1>
        <Link to="/" className="button">
          Return
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <title>Not found</title>;

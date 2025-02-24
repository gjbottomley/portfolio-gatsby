/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `George Bottomley - Portfolio`,
    description: `George Bottomley's portfolio website.`,
    image: `/logo.png`,
    ogImage: "/og.png",
    siteUrl: `https://www.george-bottomley.co.nz`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
  ],
};

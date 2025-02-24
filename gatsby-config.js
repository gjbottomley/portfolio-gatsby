/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Freedom Wellness`,
    description: `Coming soon, Wellness, Health, Lifestyle...`,
    image: `/logo.png`,
    ogImage: '/og.png',
    siteUrl: `https://www.freedomwellness.co.nz`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    ]
};
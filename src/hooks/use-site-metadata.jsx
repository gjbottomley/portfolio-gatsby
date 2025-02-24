import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          image
          ogImage
          siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}
import React from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import Welcome from "../components/index/welcome.js"
import SEO from "../components/seo.js"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <section id="page">
      <Layout location={location} title={siteTitle}>
        <SEO title={"About"} />
        <Welcome />
        <section id="page-content">
          <p>
            Welcome!
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <p>
            Website is currently undergoing some facelift. In the meantime, you
            can check out my previous projects.
          </p>
        </section>
      </Layout>
    </section>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

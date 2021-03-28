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
            I'm a software developer
            <span role="img" aria-label="smile">
              😄
            </span>
          </p>
          <p>
            I do machine learning
          </p>
          <p>
            I work on web
          </p>
          <p>
            I'm still learning front end dev. This website is based on a template designed by Berat Bozkurt.
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

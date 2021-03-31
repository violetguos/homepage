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
          I am a machine learning engineer and a data scientist. I worked on challenging aspects of data science and machine learning, e.g.
        </p>
          <ul>
            <li>
              Tackled data including audio, images, time series, health care data, natural languages, chemical molecules
            </li>
            <li>
              Maintained modular Python code with test suites (unit tests, integration, and coding style)
            </li>
            <li>
              Tackled challenging scenarios, such as datasets with few labels
            </li>
          </ul>
        <p>
          I also build websites. It started as a hobby, but now I'm determined to become a full stack (Rails + JS) dev.
        </p>
          <p>
            I'm still learning front end dev. This website is based on a template designed and developed by <a href="https://github.com/berat/homepage" target="_blank">
              Berat Bozkurt
            </a>.
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

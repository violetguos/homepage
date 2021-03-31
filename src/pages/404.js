import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <section id="page">
      <Layout location={location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <section id="not-found">
          <h1>
            404: not found{" "}
            <span role="img" aria-label="emoji">
              😔
            </span>
          </h1>
          <p>Sorry, perhaps you'd like to visit the homepage?</p>
        </section>
      </Layout>
    </section>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

import React, { useState } from "react"

import { graphql } from "gatsby"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import ProjectList from "../components/index/projectList.js"
import projects from '../../content/projects.js'


const About = ({ data, location }) => {
  const [isFilter, setFilter] = useState("All")
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categories = ["All", "web dev", "deep learning", "NLP"]

  const filterByCategory =
    isFilter && isFilter !== "All"
      ? projects.filter(item => item.category.indexOf(isFilter) + 1)
      : projects

  if (projects.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={"Projects"} />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <section id="page">
      <Layout location={location} title={siteTitle}>
        <SEO title={"Projects"} />
        <section>
          <section className="category-filter">
            <h4>categories : </h4>
            <ul>
              {categories.map((item, index) => (
                <li
                  aria-hidden="true"
                  className={isFilter === item ? "active" : null}
                  onClick={e => setFilter(item)}
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="all-project-list">
            <ProjectList projects={filterByCategory} isPost />
          </section>
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
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//blog//" } }
    ) {
      nodes {
        excerpt(pruneLength: 230)
        fields {
          slug
          readingTime {
            text
          }
        }
        frontmatter {
          date
          category
          title
        }
      }
    }
  }
`

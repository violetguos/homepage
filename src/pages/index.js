import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import BlogList from "../components/index/blogList.js"
import ProjectList from "../components/index/projectList.js"
import Right from "../assets/icons/arrow-right.svg"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.indexTitle || `Title`

  const posts = data.blog.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location}>
        <SEO title={siteTitle} />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} isIndex>
      <section id="index">
        <SEO title={siteTitle} />
        <section className="all-post-list">
          <h3 className="display-font">Son Yazılar</h3>
          <BlogList posts={posts} length={3} isPost />
          {posts.length > 3 && (
            <Link className="index-view-more" to="/blog">
              Diğer Yazılara Gözat <Right />
            </Link>
          )}
        </section>
        <section className="all-project-list">
          <h3>Projeler</h3>
          <ProjectList/>
        </section>
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        indexTitle
      }
    }
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//blog//" } }
    ) {
      nodes {
        excerpt(pruneLength: 300)
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

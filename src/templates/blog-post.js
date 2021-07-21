import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout.js"
import SEO from "../components/seo.js"
import Webmentions from "../components/post/webmention.js"
import Subscriber from "../components/post/subscriber.js"
import SocialShare from "../components/post/socialShare.js"

import TwitterIcon from "../assets/icons/twitter.svg"

const chars = { "?": "%3F", "#": "%23" }
//eslint-disable-next-line
const regex = /[\?\#]/g

const BlogPostTemplate = ({ data, location }) => {
  const [like, setLike] = useState(0)
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categories = post.frontmatter.category
  const { previous, next, webmention } = data
  const fullURL = `${data.site.siteMetadata?.siteUrl}/blog${post.fields.slug}`
  const commentCount = webmention.nodes?.filter(
    m => m.wmProperty === "in-reply-to"
  ).length

  useEffect(() => {
    fetch(
      "https://homepage-api.vercel.app/api/like?name=" +
        post.fields.slug.slice(1, post.fields.slug.length - 1),
      {
        method: "GET", // or 'PUT'
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        setLike(data.like)
      })
  }, [post])

  const onLike = () => {
    fetch("https://homepage-api.vercel.app/api/like", {
      method: "POST", // or 'PUT'
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: post.fields.slug, like: like }),
    })
      .then(response => response.json())
      .then(data => setLike(data.like))
  }

  return (
    <section id="page">
      <Layout id="blog-post-content" location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={`https://og-image.beratbozkurt0.vercel.app/**${post.frontmatter.title.replace(
            regex,
            m => chars[m]
          )}**.png?md=1${"&"}theme=dark`}
        />
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <div className="top-of-post-image">
              <h1 className="display-font" itemProp="headline">
                {post.frontmatter.title}
              </h1>
              <div className="top-of-header">
                <small>
                  {post.frontmatter.date} - {post.fields.readingTime.text}
                </small>
                <ul>
                  {categories?.length > 0 &&
                    categories.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                </ul>
              </div>
            </div>
            <Image
              alt={post.frontmatter.title || ``}
              className="post-cover"
              fluid={post.frontmatter.coverImage?.childImageSharp?.sizes}
            />
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </article>
        {/* <Subscriber substackUrl={data.site.siteMetadata.social.substack}/> */}
        <SocialShare
          fullURL={fullURL}
          title={post.frontmatter.title}
          onLike={onLike}
          like={like}
        />
        <nav className="blog-post-nav">
          <li>
            {previous && (
              <Link to={"/blog" + previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={"/blog" + next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </nav>
        <div
          id="webmentions"
          className="container"
          style={{ display: "block" }}
        >
          <h2>
            {commentCount > 0 ? (
              <span>Webmentions</span>
            ) : (
              <a
                href={`https://mobile.twitter.com/search?q=${fullURL}`}
                target="_blank"
                className="discuss-twitter"
                rel="noreferrer"
              >
                <TwitterIcon width="21" height="21" fill="white" />
                <b>Twitter</b>
              </a>
            )}
          </h2>
          <Webmentions mentions={webmention} />
        </div>
      </Layout>
    </section>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPost(
    $slug: String!
    $previousPostId: String
    $nextPostId: String
    $permalink: String!
  ) {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 125, height: 150, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
        author {
          name
          info
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        category
        date(formatString: "DD MMMM YYYY", locale: "en")
        coverImage {
          publicURL
          childImageSharp {
            sizes(maxWidth: 980, quality: 100) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    webmention: allWebMentionEntry(
      filter: { wmTarget: { eq: $permalink } }
      sort: { fields: wmReceived, order: ASC }
    ) {
      nodes {
        wmTarget
        wmProperty
        wmReceived(formatString: "MMMM DD, YYYY")
        wmId
        type
        url
        likeOf
        author {
          url
          type
          photo
          name
        }
        content {
          text
        }
      }
    }
  }
`

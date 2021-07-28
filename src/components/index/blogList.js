import React from "react"
import { Link } from "gatsby"
import moment from "moment"
import "moment/locale/tr"

const BlogList = ({ posts, length, isPost }) => {
  const currentDate = moment().format("YYYY-MM-DD")

  return (
    <div className="index-blog">
      {/* the blog list is displayed with list. we disable the bullets inline
      does not affect the bullet lists inside blogposts */}
      {/* <ol style={{listStyle: "none"}}> */}
      <ol>
        {posts.slice(0, length || posts.length).map(post => {
          const title = post.frontmatter.title || post.fields.slug
          var categories = isPost ? post.frontmatter.category : null
          var isNewPost =
            moment(post.frontmatter.date).diff(currentDate, "days") > -4

          return (
            <li key={post.fields.slug}>
              <Link to={"/blog" + post.fields.slug} itemProp="url">
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  {isPost ? (
                    <header>
                      <div className="top-of-post-image">
                        <h2 className="display-font" itemProp="headline">
                          {isNewPost && <span className="new-post"></span>}
                          {post.frontmatter.title}
                        </h2>
                        <div className="top-of-header">
                          <small>
                            {moment(post.frontmatter.date)
                              .locale("en")
                              .format("DD MMMM YYYY")}{" "}
                            - {post.fields.readingTime.text}
                          </small>
                          <ul>
                            {categories?.length > 0 &&
                              categories.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </header>
                  ) : (
                    <header>
                      <h2>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <small>
                        {moment(post.frontmatter.date)
                          .locale("en")
                          .format("DD MMMM YYYY")}{" "}
                        - {post.fields.readingTime.text}
                      </small>
                    </header>
                  )}
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default BlogList

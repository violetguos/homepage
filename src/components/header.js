import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import ThemeContext from "../context/Theme"
import Moon from "../assets/icons/moon.svg"
import Sun from "../assets/icons/sun.svg"

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author

  return (
    <header id="top">
      <h1>
        <Link to="/">{author.name || null}</Link>
      </h1>
      <ThemeContext.Consumer>
        {theme => (
          <nav id="navigation">
            <Link activeClassName="active" to="/about">
              about
            </Link>
            {/* <Link activeClassName="active" to="/blog">
              blog
            </Link> */}
            <Link activeClassName="inactive" to="/project">
              projects
            </Link>
            <button onClick={theme.toggleBlack}>
              {!theme.black ? (
                <Moon width="20" fill="#656565" stroke="#656565" />
              ) : (
                <Sun stroke="#FFCC33" width="20" />
              )}
            </button>
          </nav>
        )}
      </ThemeContext.Consumer>
    </header>
  )
}

export default Header

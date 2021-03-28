import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social

  return (
    <footer>
      <nav id="social">
        <a href={social.twitter} target="_blank" rel="me noreferrer">
          twitter
        </a>
        <a href={social.github} target="_blank" rel="noreferrer">
          github
        </a>
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
      </nav>
      <div className="email">
        <b>violetyueguo</b> at <b>gmail</b> dot <b>com</b>
      </div>
    </footer>
  )
}

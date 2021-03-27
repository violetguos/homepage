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
            instagram
            linkedin
            superpeer
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
        <a href={social.instagram} target="_blank" rel="noreferrer">
          instagram
        </a>
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
        <a href={social.superpeer} target="_blank" rel="noreferrer">
          superpeer
        </a>
      </nav>
      <div className="email">
        <b>me</b> at <b>beratbozkurt</b> dot <b>net</b>
      </div>
    </footer>
  )
}

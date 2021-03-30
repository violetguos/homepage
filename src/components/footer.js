import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import LinkedinIcon from "../assets/icons/linkedin.svg"
import GithubIcon from "../assets/icons/github.svg"
import TwitterIcon from "../assets/icons/twitter.svg"

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
          <TwitterIcon width="21" height="21" />
        </a>
        <a href={social.github} target="_blank" rel="noreferrer">
          <GithubIcon width="21" height="21" />
        </a>
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          <LinkedinIcon width="21" height="21" fill="#1966c2" />
        </a>
      </nav>
      <div className="email">
        <b>hello</b> at <b>violetyguo</b> dot <b>me</b>
      </div>
    </footer>
  )
}

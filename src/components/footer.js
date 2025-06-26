import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Obfuscate from "react-obfuscate"
import LinkedinIcon from "../assets/icons/linkedin.svg"
import GithubIcon from "../assets/icons/github.svg"
import YoutubeIcon from "../assets/icons/youtube.svg"

export default function Footer() {
  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            youtube
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
        <a href={social.youtube} target="_blank" rel="me noreferrer">
          <YoutubeIcon width="21" height="21" />
        </a>
        <a href={social.github} target="_blank" rel="noreferrer">
          <GithubIcon width="21" height="21" />
        </a>
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          <LinkedinIcon width="21" height="21" fill="#1966c2" />
        </a>
      </nav>

      <div className="email">
        Please reach out:{" "}
        <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL} />
      </div>
    </footer>
  )
}

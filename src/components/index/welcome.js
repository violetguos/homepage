import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Welcome = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.PNG/" }) {
        childImageSharp {
          fixed(width: 475, height: 475, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const avatar = data?.avatar?.childImageSharp?.fixed
  const { twitter, github, vsco } = data.site.siteMetadata?.social

  return (
    <section className="welcome">
      {avatar && (
        <Image
          fixed={avatar}
          width="175"
          height="175"
          alt={author.name || ``}
          className="bio-avatar"
        />
      )}
      <h2>Hi there</h2>
      <p className="display-font">
        I'm a software engineer and a machine learning engineer. 
        I can dive deep into machine learning (deep or classic) models and papers, and I also productionize them. 
        {/* saving how Berat links
         <a href={github} rel="noreferrer" target="_blank">
          github
        </a> */}
      </p>
    </section>
  )
}

export default Welcome

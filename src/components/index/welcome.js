import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Welcome = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
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
            vsco
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
      <h2>Selam, ben Berat</h2>
      <p className="display-font">
        front-end developer olarak çalışıyorum. Ayrıca yararlı bulduğum
        içerikleri ve deneyimlerimi{" "}
        <a href={twitter} rel="noreferrer" target="_blank">
          twitter
        </a>
        'da, açık kaynak projelerimi{" "}
        <a href={github} rel="noreferrer" target="_blank">
          github
        </a>
        'ta, gözüme güzel gelen her şeyi{" "}
        <a href={vsco} rel="noreferrer" target="_blank">
          vsco
        </a>
        'da paylaşıyorum.
      </p>
    </section>
  )
}

export default Welcome

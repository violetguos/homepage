import Link from 'next/link'

import { Github, Twitter, Linkedin, Blog, Instagram, At } from '../icons'
import config from '../../config'

function Footer() {
  return (
    <section id="footer" className="container">
      <h3>Freelance Front-End Developer - Berat Bozkurt</h3>
      <nav>
        <ul>
          <li>
            <Link href={`mailto:${config.mailAdress}`} prefetch={false}>
              <a>
                <At />
              </a>
            </Link>
          </li>
          <li>
            <Link href={config.githubURL} prefetch={false}>
              <a>
                <Github />
              </a>
            </Link>
          </li>
          <li>
            <Link href={config.twitterURL} prefetch={false}>
              <a>
                <Twitter />
              </a>
            </Link>
          </li>
          <li>
            <Link href={config.instagramURL} prefetch={false}>
              <a>
                <Instagram/>
              </a>
            </Link>
          </li>
          <li>
            <Link href={config.linkedinURL} prefetch={false}>
              <a>
                <Linkedin />
              </a>
            </Link>
          </li>
          <li>
            <Link href={config.mediumURL} prefetch={false}>
              <a>
                <Blog />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Footer

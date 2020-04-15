import Link from 'next/link'

import config from '../../config'

function About() {
  return (
    <section id="about" className="container">
      <img src="profile.jpg" width="175" height="175" alt="Berat Bozkurt" />
      <p>
        Hey, I’m <b>Berat Bozkurt</b>. I’m a freelance front-end developer. I’ve
        a startup. I’ve been also studying computer engineering. I{' '}
        <Link href={config.twitterURL} prefetch={false}>
          <a>tweet</a>
        </Link>{' '}
        about technologies and life,{' '}
        <Link href={config.vscoURL} prefetch={false}>
          <a>take photo</a>
        </Link>
        , active on{' '}
        <Link href={config.githubURL} prefetch={false}>
          <a>github</a>
        </Link>
        , writing{' '}
        <Link href={config.mediumURL} prefetch={false}>
          <a>blog</a>
        </Link>
        . You should also follow me there {':)'}
      </p>
    </section>
  )
}

export default About

import Link from 'next/link'

function About() {
  return (
    <section id="about" className="container">
      <img src="profile.jpg" width="175" height="175" alt="Berat Bozkurt" />
      <p>
        Hey, I’m <b>Berat Bozkurt</b>. I’m a freelance front-end developer. I’ve
        a startup. I’ve been also studying computer engineering. I{' '}
        <Link href="https://twitter.com/beratbozkurt0" prefetch={false}>
          <a>tweet</a>
        </Link>{' '}
        about technologies and life,{' '}
        <Link href="https://twitter.com/beratbozkurt0" prefetch={false}>
          <a>take photo</a>
        </Link>
        , active on{' '}
        <Link href="https://twitter.com/beratbozkurt0" prefetch={false}>
          <a>github</a>
        </Link>
        , writing{' '}
        <Link href="https://twitter.com/beratbozkurt0" prefetch={false}>
          <a>blog</a>
        </Link>
        . You should also follow me there {':)'}
      </p>
    </section>
  )
}

export default About

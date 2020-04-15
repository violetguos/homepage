import Link from 'next/link'

import { Star, Fork } from '../icons'
import config from '../../config'

function Projects() {
  const [getPins, setPins] = React.useState('')

  const getPinnedRepos = async () => {
    const response = await fetch(
      `https://api.github.com/users/${config.githubUsername}/starred`,
      { method: 'GET' }
    )
    const data = await response.json()
    const myPinned = data.filter(
      (item) => item.owner.login === config.githubUsername
    )
    setPins({ load: true, data: myPinned })
  }

  React.useEffect(() => {
    getPinnedRepos()
  }, [])

  return (
    <section id="projects" className="container">
      <div className="title">
        My Projects
        <div className="viewMore">
          <Link href={config.githubURL} prefetch={false}>
            <a>View More</a>
          </Link>
        </div>
      </div>
      <section id="gits">
        <ul>
          {getPins.load &&
            getPins.data.map((item, index) => (
              <li key={index}>
                <h2>
                  <Link href={item.html_url} prefetch={false}>
                    <a target={'_blank'}>{item.full_name}</a>
                  </Link>
                </h2>
                <div className="starButton">
                  <Link href={item.html_url}  prefetch={false}>
                    <a target={'_blank'}>
                      <Star /> Star
                    </a>
                  </Link>
                </div>
                <p>{item.description}</p>
                <div className="gitBottom">
                  <div className="gitLang">
                    <span></span>
                    {item.language}
                  </div>
                  <div className="gitStar">
                    <Star /> {item.stargazers_count}
                  </div>
                  <div className="gitFork">
                    <Fork /> {item.forks}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </section>
  )
}

export default Projects

import React from 'react'
import Link from 'next/link'
import config from '../../config'

function Blog() {
  const [getData, setData] = React.useState('')

  const getPost = async () => {
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/beratsblog',
    )
    const data = await response.json()
    setData({ load: true, data: data.items.slice(0, 4), url: data.feed.link })
  }

  const changeDateFormat = (sendDate) => {
    const pubDate = new Date(sendDate)
    return `${
      config.months[pubDate.getMonth() + 1]
    } ${pubDate.getDate()}, ${pubDate.getFullYear()}`
  }

  React.useEffect(() => {
    getPost()
  }, [])

  return (
    <section id="blog" className="container">
      <div className="title">
        Latest Articles
        <div className="viewMore">
          <Link href={config.mediumURL} prefetch={false}>
            <a>View More</a>
          </Link>
        </div>
      </div>
      <section className="blogList">
        <ul>
          {getData.load &&
            getData.data.map((item, index) => (
              <li key={index}>
                {item.thumbnail.indexOf('cdn') !== -1 ? (
                  <div className="blogListImg">
                    <div className="blogListImgBg"></div>
                    <img src={item.thumbnail} width="515" height="118" />
                  </div>
                ) : (
                  <div className="blogListJustBg"></div>
                )}
                <div className="blogListText">
                  <Link href={item.link} prefetch={false}>
                    <a>{item.title}</a>
                  </Link>
                  <div className="blogListTextDetail">
                    {changeDateFormat(item.pubDate)}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </section>
    </section>
  )
}

export default Blog

import React from 'react'
import Head from 'next/head'
import Cookies from 'js-cookie'

import Header from './header'
import About from './about'
import Projects from './projects'
import Blog from './blog'
import Footer from './footer'
import { GA_TRACKING_ID } from '../../lib/gtag'

function Layout() {
  const [isDark, setDark] = React.useState(true)

  React.useEffect(() => {
    if (Cookies.get('isDark') === undefined) {
      Cookies.set('isDark', true)
    } else {
      Cookies.get('isDark') == 'true'
        ? setDark(true)
        : Cookies.get('isDark') == 'false'
        ? setDark(false)
        : null
    }
  }, [Cookies.get('isDark')])

  return (
    <div
      id="index"
      className={
        Cookies.get('isDark') === undefined
          ? 'dark'
          : isDark === true
          ? 'dark'
          : isDark === false
          ? 'light'
          : null
      }
    >
      <Head>
        <title>Berat Bozkurt | Front-end Developer</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Berat Bozkurt | Front-end Developer" />
        <meta name="yandex-verification" content="ae0558ffdd8d3f12" />
        <meta
          name="description"
          content="Hey, I'm Berat Bozkurt, a freelance front-end developer. I've a startup named davetiyem.co"
        />
        <meta
          name="keywords"
          content="berat, berat bozkurt, front-end developer, freelance front end developer, react, next.js, react-native"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
      </Head>
      <Header setDark={setDark} isDark={isDark} />
      <About />
      <Projects />
      <Blog />
      <Footer />
    </div>
  )
}
export default Layout

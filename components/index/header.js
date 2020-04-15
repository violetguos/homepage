import Link from 'next/link'
import Cookies from 'js-cookie'
import Scrollchor from 'react-scrollchor'

import { Moon, Sun } from '../icons'

function Header({ setDark, isDark }) {
  return (
    <header>
      <h1>
        <Link href="/">
          <a>Berat Bozkurt</a>
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Scrollchor to="#about">About</Scrollchor>
          </li>
          <li>
            <Scrollchor to="#projects">Projects</Scrollchor>
          </li>
          <li>
            <Scrollchor to="#blog">Blog</Scrollchor>
          </li>
          <li>
            <Scrollchor to="#footer">Contact</Scrollchor>
          </li>
          <li
            className="darkORlight"
            onClick={() => {
              setDark(isDark === true ? false : true)
              Cookies.set('isDark', isDark === true ? false : true)
            }}
          >
            {Cookies.get('isDark') === undefined ? (
              <Sun />
            ) : isDark === true ? (
              <Sun />
            ) : (
              <Moon />
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

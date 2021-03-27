import React from "react"

import ThemeContext from "../context/Theme"
import Header from "./header.js"
import Welcome from "./index/welcome.js"
import Footer from "./footer.js"

const Layout = ({ children, isIndex = false }) => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <div id={theme.black ? "dark" : "white"}>
          <section className="container">
            <Header />
            {isIndex ? (
              <>
                <Welcome />
              </>
            ) : null}
            {children}
            <Footer />
          </section>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default Layout

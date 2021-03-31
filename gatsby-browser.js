import React from "react"
import { ThemeProvider } from "./src/context/Theme"
// custom typefaces
import "typeface-montserrat"
// normalize CSS across browsers
import "./src/styles/base/normalize.scss"
// custom CSS styles
import "./src/styles/style.scss"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

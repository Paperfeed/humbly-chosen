import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { themeStyle } from '../source/ContentScript/Components/Theme/themeStyle'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-size: 16px;
    font-family: 'Sofia Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  *, *:after, *:before {
    box-sizing: inherit;
  }
`

export const decorators = [
  (Story) => (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
]

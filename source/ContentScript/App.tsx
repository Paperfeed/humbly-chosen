import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Debug } from '../lib/debug'

interface AppProps {
  titles: string[]
}

const AppContainer = styled.div`
  height: 600px;
  background: blue;
  width: 100%;
`

const App: React.FC<AppProps> = ({ titles }) => (
  <AppContainer>{titles?.map(t => t)}</AppContainer>
)

export function injectApp(data: AppProps) {
  Debug.log('Injecting React App')

  const app = document.createElement('div')
  app.id = 'root'

  const containerSelector = '.content-choices-header'
  const container = document.querySelector(containerSelector)

  if (container) {
    container.insertAdjacentElement('afterend', app)
    ReactDOM.render(<App {...data} />, document.getElementById('root'))
  }
}

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Debug, Verbosity } from '../lib/debug'
import { PageType } from '../lib/enums'
import { ContentScriptOptions } from '../messages/background-messages'
import { Choice, Content } from '../messages/content-messages'
import { sendMessage } from '../messages/handler'
import { GameCard } from './Components/Cards/GameCard'
import { SteamID } from './Components/SteamID/SteamID'
import { themeStyle } from './Components/Theme/themeStyle'
import { Toast } from './Components/Toast/Toast'
import { Text } from './Components/Typography/Text'

interface AppProps {
  choices: Choice[]
  options: ContentScriptOptions
  pageType: PageType
  sendMessage: typeof sendMessage
}

const AppContainer = styled.div`
  padding: 1.5em 1.5em 0;

  > *:not(:last-child) {
    margin-bottom: 1.5em;
  }
`

const getIdentifier = () => {
  const splitPaths = window.location.pathname.split('/')
  if (splitPaths.length >= 3) return splitPaths[2]
  console.error('Somehow ended up on incorrect page')
  return ''
}

const requestGameData = async (games: Choice[]) =>
  sendMessage(Content.RequestGameData, {
    games,
    identifier: getIdentifier(),
  })

async function retrieveAndInjectGameData(choices: Choice[]) {
  const response = await requestGameData(choices)
  const gameCards = document.querySelectorAll('.content-choice')

  document.querySelectorAll('.humbly-gamecard').forEach(g => g.remove())

  gameCards.forEach(card => {
    const machineName = (card.querySelector(
      '[data-machine-name]',
    ) as HTMLElement).dataset.machineName

    const matchingData = response.find(r => r.machineName === machineName)
    const container = document.createElement('div')
    container.className = 'humbly-gamecard'

    card.appendChild(container)
    ReactDOM.render(
      <ThemeProvider theme={themeStyle}>
        <GameCard data={matchingData?.data} ownsGame={matchingData?.owned} />
      </ThemeProvider>,
      container,
    )
  })
}

const App: React.FC<AppProps> = ({ options, choices }) => {
  const [toastMessage, setToastMessage] = useState<string | undefined>()

  useEffect(() => {
    retrieveAndInjectGameData(choices)
  }, [choices])

  return (
    <ThemeProvider theme={themeStyle}>
      <AppContainer>
        {!options?.steamId && (
          <>
            <Text as="div">
              It appears you have not set up&nbsp;
              <b>
                <i>Humbly Chosen</i>
              </b>
              &nbsp; with your steam ID yet. This will limit the functionality
              we can provide. <br />
              <br />
              Note: Your steam profile should be set to public in order for all
              functionality to work. You can search it below by using the last
              part of your Steam profile&apos;s url:
              <pre>
                https://steamcommunity.com/id/
                <i>
                  <b>your-username</b>
                </i>
              </pre>
            </Text>

            <SteamID
              setToastMessage={setToastMessage}
              steamId={options?.steamId || ''}
              username={options?.username || ''}
            />
          </>
        )}
      </AppContainer>
      <Toast
        message={toastMessage}
        timeout={(toastMessage?.length || 0) * 80}
      />
    </ThemeProvider>
  )
}

const getCurrentPageType = () => {
  if (/subscription/.test(window.location.pathname))
    return PageType.HumbleChoice
  return false
}
export function injectApp(data: Omit<AppProps, 'pageType'>) {
  const pageType = getCurrentPageType()
  if (!pageType) {
    Debug.log(Verbosity.LOG, 'Current page is not supported')
    return
  }
  Debug.log(2, 'Injecting React App')

  const app = document.createElement('div')
  app.id = 'root'

  const containerSelector = '.content-choices-header'
  const container = document.querySelector(containerSelector)

  if (container) {
    container.insertAdjacentElement('afterend', app)
    ReactDOM.render(
      <App {...data} pageType={pageType} />,
      document.getElementById('root'),
    )
  }
}

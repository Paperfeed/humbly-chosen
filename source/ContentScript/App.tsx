import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'

import { Debug } from '../lib/debug'
import { ContentScriptOptions } from '../messages/background-messages'
import { Choice, Content } from '../messages/content-messages'
import { sendMessage } from '../messages/handler'
import { Button } from './Components/Button/Button'
import { GameCard } from './Components/Cards/GameCard'
import { Flex } from './Components/Flex/Flex'
import { Input } from './Components/Input/Input'
import { themeStyle } from './Components/Theme/themeStyle'
import { Text } from './Components/Typography/Text'
import useDebounce from './Hooks/useDebounce'

interface AppProps {
  choices: Choice[]
  options: ContentScriptOptions
  sendMessage: typeof sendMessage
}

const AppContainer = styled.div`
  background: ${props => props.theme.color.primaryDark};
  width: 100%;
`

const requestGameData = async (games: Choice[]) =>
  sendMessage(Content.RequestGameData, games)

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
        <GameCard data={matchingData?.data} ownsGame={false} />
      </ThemeProvider>,
      container,
    )
  })
}

function saveSteamId(steamId: string, username: string) {
  sendMessage(Content.SetSteamId, { steamId, username })
}

const App: React.FC<AppProps> = ({ options, choices }) => {
  const { steamId, username } = options

  const [localUsername, setLocalUserName] = useState(username || '')
  const [retrievedSteamId, setRetrievedSteamId] = useState(steamId || '')
  const [loading, setLoading] = useState(false)
  const debouncedUserName = useDebounce(localUsername, 500)

  const onSteamIDSearch = async (username: string) => {
    const response = await sendMessage(Content.RequestSteamId, { username })
    Debug.log(0, `Received steamId response: ${response.steamId}`)
    setRetrievedSteamId(response.steamId)
  }

  useEffect(() => {
    if (!debouncedUserName) return
    setLoading(true)
    onSteamIDSearch(debouncedUserName).then(() => setLoading(false))
  }, [debouncedUserName])

  useEffect(() => {
    retrieveAndInjectGameData(choices)
  }, [choices])

  return (
    <ThemeProvider theme={themeStyle}>
      <AppContainer>
        {!steamId && (
          <>
            <Text>
              It appears you have not set up Humbly Chosen with your steam ID
              yet. This will limit the functionality we can provide. <br />
              <br />
              Note: Your steam profile should be set to public in order for all
              functionality to work.
            </Text>
            <Flex withMargins>
              <Input
                placeholder="Username"
                value={localUsername}
                onChange={({ target: { value } }) => {
                  setLocalUserName(value)
                }}
              />
              <Input
                readOnly
                placeholder="Your steamID will be shown here"
                value={retrievedSteamId}
              />
              <Button
                disabled={retrievedSteamId === ''}
                loading={Boolean(loading)}
                onClick={() => saveSteamId(retrievedSteamId, localUsername)}
              >
                Save
              </Button>
            </Flex>
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  )
}

export function injectApp(data: AppProps) {
  if (!/subscription/.test(window.location.pathname)) return
  Debug.log(2, 'Injecting React App')

  const app = document.createElement('div')
  app.id = 'root'

  const containerSelector = '.content-choices-header'
  const container = document.querySelector(containerSelector)

  if (container) {
    container.insertAdjacentElement('afterend', app)
    ReactDOM.render(<App {...data} />, document.getElementById('root'))
  }
}

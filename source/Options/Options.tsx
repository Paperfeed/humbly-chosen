import React, { useState } from 'react'
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider,
} from 'styled-components'

import { Button } from '../ContentScript/Components/Button/Button'
import { Flex } from '../ContentScript/Components/Flex/Flex'
import { SteamID } from '../ContentScript/Components/SteamID/SteamID'
import { Tab, TabHeader } from '../ContentScript/Components/Tab/Tab'
import { themeStyle } from '../ContentScript/Components/Theme/themeStyle'
import { Toast } from '../ContentScript/Components/Toast/Toast'
import { database } from '../lib/db'
import { clearLocalStorage, clearSyncedStorage } from '../lib/local-storage'
import { ContentScriptOptions } from '../messages/background-messages'

interface OptionsProps {
  options: ContentScriptOptions
}
const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>(
  ({ theme: { color } }) => css`
    html,
    body {
      color: ${color.white};
      background: ${color.primaryDark};

      font-size: 16px;
      font-family: 'Sofia Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
  `,
)

const Main = styled.main`
  padding: 3rem 1.5rem;
`
const Options: React.FC<OptionsProps> = ({ options: initialOptions }) => {
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [options, setOptions] = useState<ContentScriptOptions>(initialOptions)

  const clearData = () => {
    try {
      database.delete()
      clearLocalStorage()
      clearSyncedStorage()
      setOptions({
        apiUrl: options.apiUrl,
        isDev: options.isDev,
        steamId: undefined,
        username: undefined,
      })
      setMessage('Data successfully removed')
    } catch (e) {
      setMessage('Something went wrong')
    }
  }

  return (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyle />
      <Main>
        <Tab>
          <TabHeader>Options</TabHeader>

          <Flex withMargins column>
            <SteamID
              setToastMessage={setMessage}
              steamId={options?.steamId || ''}
              username={options?.username || ''}
            />

            <Button
              onClick={() => setMessage(Math.random().toString(36).substr(7))}
            >
              TEST TOAST
            </Button>
            <Button highlight="red" onClick={clearData}>
              Clear Database
            </Button>
          </Flex>
        </Tab>
        <Toast message={message} timeout={(message?.length || 0) * 80} />
      </Main>
    </ThemeProvider>
  )
}

export default Options

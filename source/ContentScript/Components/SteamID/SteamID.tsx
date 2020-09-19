import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Debug } from '../../../lib/debug'
import { Content } from '../../../messages/content-messages'
import { sendMessage } from '../../../messages/handler'
import useDebounce from '../../Hooks/useDebounce'
import { Button } from '../Button/Button'
import { Flex } from '../Flex/Flex'
import { Input } from '../Input/Input'
import { Text } from '../Typography/Text'

interface SteamIDProps {
  setToastMessage: Function
  steamId: string
  username: string
}

const StyledSteamID = styled.div``

const ButtonContainer = styled(Flex)`
  > *:not(:last-child) {
    flex-grow: 1;
  }
`

function saveSteamId(steamId: string, username: string) {
  sendMessage(Content.SetSteamId, { steamId, username })
}

export const SteamID: React.FC<SteamIDProps> = ({
  setToastMessage,
  username,
  steamId,
}) => {
  const [localUsername, setLocalUserName] = useState(username)
  const [retrievedSteamId, setRetrievedSteamId] = useState(steamId)
  const [loading, setLoading] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const debouncedUserName = useDebounce(localUsername, 500)

  const onSteamIDSearch = async (username: string) => {
    const response = await sendMessage(Content.RequestSteamId, { username })
    Debug.log(0, `Received steamId response: ${response.steamId}`)
    if (!response.steamId) {
      setReadOnly(false)
      setRetrievedSteamId('')
      setToastMessage(
        'Could not find an ID, make sure you are using the right username or manually input your steam ID and click save',
      )
    } else {
      setReadOnly(true)
      setRetrievedSteamId(response.steamId)
    }
  }

  useEffect(() => {
    if (!debouncedUserName) return
    setLoading(true)
    setToastMessage(undefined)
    onSteamIDSearch(debouncedUserName).then(() => setLoading(false))
  }, [debouncedUserName])

  return (
    <StyledSteamID>
      <Text bold marginBottom="0.625em">
        Search SteamID:
      </Text>
      <ButtonContainer withMargins>
        <Input
          placeholder="Username"
          value={localUsername}
          onChange={({ target: { value } }) => {
            setLocalUserName(value)
          }}
        />
        <Input
          readOnly={readOnly}
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
      </ButtonContainer>
    </StyledSteamID>
  )
}

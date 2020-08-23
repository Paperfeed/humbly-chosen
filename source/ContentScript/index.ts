import { browser, Runtime } from 'webextension-polyfill-ts'

import { BackgroundMessage } from '../Background'
import { Debug } from '../lib/debug'
import { BackgroundMessageType, ContentMessageType } from '../lib/enums'
import { getGameInfo } from '../lib/igdb'
import { requestFromSteam } from '../lib/request'
import { injectApp } from './App'
type MessageSender = Runtime.MessageSender

interface UserAppResponse {
  response: {
    game_count: number
    games: GameData[]
  }
}

interface GameData {
  appid: number
  img_icon_url: string
  img_logo_url: string
  name: string
  playtime_forever: number
  playtime_linux_forever: number
  playtime_mac_forever: number
  playtime_windows_forever: number
}

function harvestChoices() {
  const titleElements = document.querySelectorAll('.content-choice-title')

  const titles: string[] = []
  titleElements.forEach(t =>
    t.textContent !== null ? titles.push(t.textContent.trim()) : 'ERROR',
  )

  return titles
}
async function onInitialized(apiUrl: string) {
  Debug.log('Content script has successfully initialized')

  const choices = harvestChoices()
  console.log(choices)
  injectApp({ titles: choices })

  try {
    const userAppsResponse = await requestFromSteam<UserAppResponse>(
      `${apiUrl}/steam/getOwnedGames?steamid=76561197988723008`,
    )
    console.log('UserAppResponse', userAppsResponse)
    // const userAppsResponse = await request<UserAppResponse>(
    //   'https://www.foxslash.com/apps/steamchecker/?steamid=76561197988723008',
    // )
    // console.log('UserAppResponse', userAppsResponse)
    const result = await getGameInfo(apiUrl)
    console.log('getGameInfo', result)
  } catch (e) {
    console.error(e)
  }
}

async function contentMessageHandler(
  request: BackgroundMessage,
  sender: MessageSender,
) {
  {
    Debug.log(
      `Content received message from ${sender.id}: ${JSON.stringify(
        request,
        null,
        2,
      )}`,
    )

    // const sendResponse = (message: Message) => {
    //   Debug.log(
    //     `Sending message to ${sender.id}: ${JSON.stringify(message, null, 2)}`,
    //   )
    //   return message
    // }

    switch (request.type) {
      case BackgroundMessageType.SendOptions:
        break
      case BackgroundMessageType.SendDevStatus:
        break
    }
  }
}

async function initialize() {
  const response = await browser.runtime.sendMessage({
    type: ContentMessageType.Initialize,
  })
  browser.runtime.onMessage.addListener(contentMessageHandler)

  const apiUrl = response.content.isDev
    ? 'https://humbly-cors.glitch.me' //'http://localhost:3000'
    : 'https://humbly-cors.glitch.me'

  await onInitialized(apiUrl)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
initialize().then(() => {})

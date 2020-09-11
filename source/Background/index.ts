import 'emoji-log'

import { browser } from 'webextension-polyfill-ts'

import { indexSteamAppList } from '../lib/db'
import { Debug, extensionIsDev } from '../lib/debug'
import { StorageKey } from '../lib/enums'
import {
  getFromLocalStorage,
  getFromStorage,
  saveToLocalStorage,
  saveToStorage,
} from '../lib/local-storage'
import { requestFromSteam, SteamEndpoint } from '../lib/request'
import { getAPIUrl } from '../lib/utilities'
import { Content } from '../messages/content-messages'
import { createListener, registerListener } from '../messages/handler'
import { findAppIdsByName, resolveSteamUserName } from './steam'

async function onBackgroundInit(apiUrl: string) {
  const listener = createListener()
    .handleMessage(Content.Initialize, async () => ({
      apiUrl: apiUrl,
      isDev: await extensionIsDev(),
      ...(await getFromStorage(StorageKey.Options)),
    }))
    .handleMessage(Content.RequestGameData, async ({ identifier, games }) => {
      const fromStorage = await getFromLocalStorage(StorageKey.HumbleChoiceData)
      if (fromStorage && fromStorage[identifier]) {
        Debug.log(0, `Results for ${identifier} were found in local storage.`)
        return fromStorage[identifier]
      }
      const results = await findAppIdsByName(games)
      saveToLocalStorage({
        [StorageKey.HumbleChoiceData]: {
          [identifier]: results,
        },
      })

      return results
    })
    .handleMessage(Content.RequestSteamId, ({ username }) =>
      resolveSteamUserName(apiUrl, username),
    )
    .handleMessage(Content.SetSteamId, ({ username, steamId }) =>
      saveToStorage({ [StorageKey.Options]: { steamId, username } }),
    )

  registerListener(listener)

  Debug.log(0, `Requesting steamAppList from ${apiUrl}`)
  const steamAppList = await requestFromSteam(apiUrl, SteamEndpoint.GetAppList)
  await indexSteamAppList(steamAppList)
}

browser.runtime.onInstalled.addListener(async () => {
  const timeStamp = /((?:[0-9]:?){3,})/.exec(
    new Date(Date.now()).toTimeString(),
  )![0]

  console.emoji(
    '🦄',
    `[${timeStamp}] Extension installed and running in ${
      extensionIsDev() ? 'development' : 'production'
    } mode`,
  )

  const apiUrl = await getAPIUrl()
  await onBackgroundInit(apiUrl)
})

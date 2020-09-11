import { browser } from 'webextension-polyfill-ts'

import { Debug, extensionIsDev, Verbosity } from '../lib/debug'
import { StorageKey } from '../lib/enums'
import {
  getFromLocalStorage,
  getFromStorage,
  saveToLocalStorage,
  saveToStorage,
} from '../lib/local-storage'
import { getAPIUrl } from '../lib/utilities'
import { Content } from '../messages/content-messages'
import { createListener, registerListener } from '../messages/handler'
import { requestAndIndexApplist } from './Functions/requestAndIndexAppList'
import { requestAndIndexOwnedGames } from './Functions/requestAndIndexOwnedGames'
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
      await saveToLocalStorage({
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
  await requestAndIndexApplist(apiUrl)

  const { steamId } = await getFromStorage(StorageKey.Options)
  if (steamId) {
    await requestAndIndexOwnedGames(steamId, apiUrl)
  }
}

browser.runtime.onInstalled.addListener(async () => {
  const timeStamp = /((?:[0-9]:?){3,})/.exec(
    new Date(Date.now()).toTimeString(),
  )![0]

  Debug.log(
    Verbosity.INFO,
    // Do not await this - It will break the app:
    `[${timeStamp}] Extension installed and running in ${
      extensionIsDev() ? 'development' : 'production'
    } mode`,
  )

  const apiUrl = await getAPIUrl()
  await onBackgroundInit(apiUrl)
})

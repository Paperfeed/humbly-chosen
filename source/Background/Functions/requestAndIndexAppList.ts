import { indexSteamAppList } from '../../lib/db'
import { Debug, Verbosity } from '../../lib/debug'
import { StorageKey } from '../../lib/enums'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../lib/local-storage'
import { requestFromSteam, SteamEndpoint } from '../../lib/request'

export async function requestAndIndexApplist(apiUrl: string) {
  Debug.log(Verbosity.INFO, `Requesting steamAppList from ${apiUrl}`)
  try {
    // TODO refactor
    let steamAppList
    const temp = await getFromLocalStorage(StorageKey.AppList)
    if (temp) {
      steamAppList = temp.data
    } else {
      steamAppList = await requestFromSteam(apiUrl, SteamEndpoint.GetAppList)

      await saveToLocalStorage({
        [StorageKey.AppList]: {
          data: steamAppList,
          timestamp: Date.now(),
        },
      })
    }

    if (!steamAppList.applist.apps.length) {
      throw new Error('Steam AppList returned 0 results')
    }

    await indexSteamAppList(steamAppList)
  } catch (e) {
    Debug.log(Verbosity.WARN, `Failed to retrieve applist from ${apiUrl}`)
    throw e
  }
}

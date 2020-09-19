import { indexSteamAppList } from '../../lib/db'
import { Debug, Verbosity } from '../../lib/debug'
import { StorageKey, USE_CACHING } from '../../lib/enums'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../lib/local-storage'
import { requestFromSteam, SteamEndpoint } from '../../lib/request'

export async function requestAndIndexApplist(apiUrl: string) {
  Debug.log(Verbosity.INFO, `Requesting steamAppList from ${apiUrl}`)

  const fromStorage = await getFromLocalStorage(StorageKey.AppList)
  if (
    USE_CACHING &&
    fromStorage &&
    fromStorage?.data?.applist?.apps?.length &&
    Date.now() - fromStorage.timestamp <= 1000 * 60 * 30
  ) {
    Debug.log(
      Verbosity.INFO,
      `Retrieved AppList from storage, containing ${
        fromStorage.data.applist.apps.length
      } records, from ${new Date(fromStorage.timestamp).toTimeString()}`,
    )
    Debug.log(Verbosity.LOG, 'Cached data is less than 30 minutes old')
    await indexSteamAppList(fromStorage.data)
  } else {
    try {
      Debug.log(
        Verbosity.LOG,
        'Cached data is more than 30 minutes old or non-existent, calling API',
      )

      const steamAppList = await requestFromSteam(
        apiUrl,
        SteamEndpoint.GetAppList,
      )

      if (!steamAppList.applist.apps.length) {
        throw new Error('Steam AppList returned 0 results')
      }

      await saveToLocalStorage({
        [StorageKey.AppList]: {
          data: steamAppList,
          timestamp: Date.now(),
        },
      })

      await indexSteamAppList(steamAppList)
    } catch (e) {
      Debug.log(Verbosity.WARN, `Failed to retrieve applist from ${apiUrl}`)
      throw e
    }
  }
}

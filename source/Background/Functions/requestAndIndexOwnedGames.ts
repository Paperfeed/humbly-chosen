import { indexOwnedGames } from '../../lib/db'
import { Debug, Verbosity } from '../../lib/debug'
import { StorageKey, USE_CACHING } from '../../lib/enums'
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../lib/local-storage'
import { requestFromSteam, SteamEndpoint } from '../../lib/request'

export async function requestAndIndexOwnedGames(
  steamId: string,
  apiUrl: string,
) {
  Debug.log(Verbosity.INFO, `Requesting owned games from ${apiUrl}`)

  const fromStorage = await getFromLocalStorage(StorageKey.OwnedGames)
  if (
    USE_CACHING &&
    fromStorage &&
    fromStorage?.data?.response?.games?.length > 0 &&
    Date.now() - fromStorage.timestamp <= 1000 * 60 * 10
  ) {
    Debug.log(
      Verbosity.INFO,
      `Retrieved owned games from storage, containing ${
        fromStorage.data.response.games.length
      } records, from ${new Date(fromStorage.timestamp).toTimeString()}`,
    )
    Debug.log(Verbosity.LOG, 'Cached data is less than 10 minutes old')
  } else {
    try {
      Debug.log(
        Verbosity.LOG,
        'Cached data is more than 10 minutes old or non-existent, calling API',
      )
      const ownedGames = await requestFromSteam(
        apiUrl,
        SteamEndpoint.GetOwnedGames,
        {
          steamId,
        },
      )

      await saveToLocalStorage({
        [StorageKey.OwnedGames]: {
          data: ownedGames,
          timestamp: Date.now(),
        },
      })

      await indexOwnedGames(ownedGames.response.games)
    } catch (e) {
      Debug.log(Verbosity.WARN, `Failed to update owned games`)
    }
  }
}

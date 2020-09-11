import { indexOwnedGames } from '../../lib/db'
import { Debug, Verbosity } from '../../lib/debug'
import { StorageKey } from '../../lib/enums'
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
  // TODO refactor
  let ownedGames
  const temp = await getFromLocalStorage(StorageKey.OwnedGames)
  if (temp) {
    ownedGames = temp.data
  } else {
    ownedGames = await requestFromSteam(apiUrl, SteamEndpoint.GetOwnedGames, {
      steamId,
    })

    await saveToLocalStorage({
      [StorageKey.OwnedGames]: {
        data: ownedGames,
        timestamp: Date.now(),
      },
    })
  }

  await indexOwnedGames(ownedGames.response.games)
}

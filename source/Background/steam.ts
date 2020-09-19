import Dexie from 'dexie'
import fuzzysort from 'fuzzysort'

import { database, SteamApp } from '../lib/db'
import { Debug, Verbosity } from '../lib/debug'
import { getGameInfoBySteamId } from '../lib/igdb'
import { ExternalGameCategory } from '../lib/igdb-enums'
import { requestFromSteam, SteamEndpoint } from '../lib/request'
import { getAPIUrl } from '../lib/utilities'
import { Choice, Content, ContentResponse } from '../messages/content-messages'

export async function findAppIdsByName(games: Choice[]) {
  const fuzzySorted = await database.transaction(
    'r',
    database.apps,
    async function () {
      // Parallel search for all prefixes - just select resulting primary keys
      const results = await Dexie.Promise.all(
        games.map(prefix =>
          database.apps
            .where('name')
            .startsWithAnyOfIgnoreCase(prefix.title)
            .toArray(),
        ),
      )

      return games.map(
        (game, index) =>
          fuzzysort.go<SteamApp>(game.title, results[index], {
            allowTypo: false,
            key: 'name',
            limit: 1,
          })[0],
      )
    },
  )

  const apiUrl = await getAPIUrl()
  const databaseResults = fuzzySorted.map(a => a && a.obj)
  const steamIds = databaseResults
    .filter(a => a !== undefined)
    .map(a => a.appId)
  const missingResults: Choice[] = []

  const dataFromIGDB = await getGameInfoBySteamId(apiUrl, steamIds)

  const mergedResults = databaseResults
    .map((a, i) => {
      if (!a) missingResults.push(games[i])
      return (
        a && {
          ...a,
          machineName: games[i].machineName,
        }
      )
    })
    .filter(a => a !== undefined)

  if (missingResults.length) {
    Debug.log(
      Verbosity.INFO,
      `Could not find data on ${missingResults.length} apps`,
    )
  }

  return mergedResults.map(app => ({
    data: dataFromIGDB.find(d =>
      d.external_games.some(
        eg =>
          eg.category === ExternalGameCategory.Steam &&
          parseInt(eg.uid) === app.appId,
      ),
    ),
    ...app,
  }))
}

export const resolveSteamUserName = async (
  apiUrl: string,
  username: string,
): Promise<ContentResponse[Content.RequestSteamId]> => {
  const response = await requestFromSteam(apiUrl, SteamEndpoint.GetSteamId, {
    vanityurl: username,
  })
  return { steamId: response.response.steamid }
}

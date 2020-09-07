import Dexie from 'dexie'
import fuzzysort from 'fuzzysort'

import { database, SteamApp } from '../lib/db'
import { getGameIdBySteamId, getGameInfo } from '../lib/igdb'
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
  const igdbIDs = await getGameIdBySteamId(
    apiUrl,
    fuzzySorted.map(a => a && a.obj.appId).filter(a => a !== undefined),
  )

  const data = await getGameInfo(
    apiUrl,
    igdbIDs.map(r => r.game),
  )

  return games.map(({ title, machineName }) => ({
    data: data.find(d => d.name === title),
    machineName,
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

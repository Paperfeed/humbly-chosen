import { Debug } from './debug'
import { Endpoint, ExternalGameCategory, GameCategory } from './igdb-enums'
import { APP_ID } from './request'

const axios = require('axios').default

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataToRequestBody = (data: Record<string, any>) =>
  Object.keys(data)
    .reduce((reducedString, dataKey) => {
      const fieldData = data[dataKey]
      if (Array.isArray(fieldData)) {
        reducedString += `${dataKey} ${fieldData.join(',')}; `
      } else if (
        typeof fieldData === 'string' ||
        typeof fieldData === 'number'
      ) {
        reducedString += `${dataKey} ${fieldData}; `
      }
      return reducedString
    }, '')
    .trimEnd()

async function fetchIDGBData<T>(
  apiUrl: string,
  endpoint: Endpoint,
  data: Record<string, string | number | Array<string | number>> = {},
): Promise<T> {
  const appId = APP_ID

  if (appId === undefined) {
    throw new Error('No app-id defined')
  }

  if (apiUrl === '') {
    throw new Error('API_URL has not been initialized yet')
  }

  Debug.log(0, `Requesting from ${apiUrl}: ${dataToRequestBody(data)}`)

  try {
    const response = await axios.post(
      `${apiUrl}/igdb/${endpoint}`,
      dataToRequestBody(data),
      {
        headers: {
          Accept: 'application/json',
          appId,
        },
      },
    )
    return response.data
  } catch (e) {
    Debug.log(4, `IGDB request failed with error ${e}`)
    throw new Error('Could not retrieve data from IGDB')
  }
}

export interface GameDataResponse {
  age_ratings: number[]
  aggregated_rating: number
  aggregated_rating_count: number
  artworks: number[]
  category: GameCategory
  checksum: string
  cover: number
  created_at: number // UTC
  dlcs: number[]
  external_games: number[]
  first_release_date: number
  game_engines: number[]
  game_modes: number[]
  genres: number[]
  hypes: number
  id: number
  involved_companies: number[]
  keywords: number[]
  name: string
  platforms: number[]
  player_perspectives: number[]
  popularity: number
  pulse_count: number
  rating: number
  rating_count: number
  release_dates: number[]
  screenshots: number[]
  similar_games: number[]
  slug: string
  storyline: string
  summary: string
  tags: number[]
  themes: number[]
  total_rating: number
  total_rating_count: number
  updated_at: number
  url: string
  videos: number[]
  websites: number[]
}

export const getGameInfo = async (apiUrl: string, games: string[] | number[]) =>
  await fetchIDGBData<GameDataResponse[]>(apiUrl, Endpoint.Games, {
    fields: '*',
    where: `id = (${games.join(',')})`,
  })

type SteamIDLookupResponse = { game: number }[]

export const getGameIdBySteamId = async (
  apiUrl: string,
  games: string[] | number[],
) =>
  await fetchIDGBData<SteamIDLookupResponse>(apiUrl, Endpoint.ExternalGames, {
    fields: 'game',
    where: `category = ${ExternalGameCategory.Steam} & uid = (${games.join(
      ',',
    )})`,
  })

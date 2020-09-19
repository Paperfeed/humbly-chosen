import { Debug } from './debug'
import {
  Endpoint,
  ExternalGameCategory,
  GameCategory,
  WebsiteCategory,
} from './igdb-enums'
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
  age_ratings: { id: number; rating: number }[]
  aggregated_rating: number
  aggregated_rating_count: number
  artworks: { height: number; id: number; url: string; width: number }[]
  category: GameCategory
  checksum: string
  cover: { id: number; url: string }
  created_at: number // UTC
  dlcs: { id: number; name: string }[]
  external_games: { category: ExternalGameCategory; id: number; uid: string }[]
  first_release_date: number
  game_engines: { id: number; name: string; slug: string }[]
  game_modes: { id: number; name: string; slug: string }[]
  genres: { id: number; name: string; slug: string }[]
  hypes: number
  id: number
  involved_companies: number[]
  keywords: { id: number; name: string; slug: string }[]
  name: string
  platforms: number[]
  player_perspectives: { id: number; name: string; slug: string }[]
  popularity: number
  pulse_count: number
  rating: number
  rating_count: number
  release_dates: {
    date: number
    id: number
    platform: { id: number; name: string }
    y: number
  }[]
  screenshots: { height: number; id: number; url: string; width: number }[]
  similar_games: { id: number; name: string }[]
  slug: string
  storyline: string
  summary: string
  tags: number[]
  themes: { id: number; name: string; slug: string }[]
  total_rating: number
  total_rating_count: number
  updated_at: number
  url: string
  videos: { id: number; name: string; video_id: string }[]
  websites: { category: WebsiteCategory; id: number; url: string }[]
}

export const getGameInfoBySteamId = async (
  apiUrl: string,
  games: string[] | number[],
) =>
  await fetchIDGBData<GameDataResponse[]>(apiUrl, Endpoint.Games, {
    fields: `*,
age_ratings.rating,age_ratings.rating_cover_url,
artworks.url,artworks.width,artworks.height,
dlcs.name,expansions.name,
external_games.category,external_games.uid,
cover.url,
game_engines.name,game_engines.slug,
game_modes.name,game_modes.slug,
genres.name,genres.slug,
keywords.name,keywords.slug,
player_perspectives.name,player_perspectives.slug,
multiplayer_modes.*,
release_dates.date,release_dates.platform.name,release_dates.y,
screenshots.url,screenshots.width,screenshots.height,
similar_games.name,
themes.name,themes.slug,
time_to_beat.completely,time_to_beat.hastly,time_to_beat.normally,
videos.name,videos.video_id,
websites.url,websites.category`,
    limit: 12,
    where: `external_games.category = 1 & external_games.uid = (${games.join(
      ',',
    )})`,
  })

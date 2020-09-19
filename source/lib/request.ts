export const APP_ID =
  'FdARTribFXw5a92F0m57pbi52Fvt5I9irEJe6Wjcyh3Sqjo7ccQKlGl8h1Y5FzIR'

/*export async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (response.status === 200) {
    return await response.json()
  } else {
    throw new Error('Request failed')
  }
}*/

export enum SteamEndpoint {
  GetAppList = 'getAppList',
  GetOwnedGames = 'getOwnedGames',
  GetSteamId = 'getSteamId',
}

export type SteamAppListGame = {
  appid: string
  name: string
}

export interface AppListResponse {
  applist: {
    apps: SteamAppListGame[]
  }
}

export interface UserAppResponse {
  response: {
    game_count: number
    games: GameData[]
  }
}

export interface SteamIDResponse {
  response: {
    steamid: string
    success: number
  }
}

export interface GameData {
  appid: number
  playtime_forever: number
  playtime_linux_forever: number
  playtime_mac_forever: number
  playtime_windows_forever: number
}

interface EndpointOptions {
  [SteamEndpoint.GetOwnedGames]: {
    appids_filter?: string // If set, restricts result set to the passed in apps (comma delimited?)
    include_appinfo?: boolean // If we want additional details (name, icon) about each game
    include_played_free_games?: boolean // Free games are excluded by default. If this is set, free games the user has played will be returned.
    steamId: string // The player we're asking about
  }
  [SteamEndpoint.GetAppList]: undefined
  [SteamEndpoint.GetSteamId]: {
    vanityurl: string
  }
}

interface EndpointResponse {
  [SteamEndpoint.GetOwnedGames]: UserAppResponse
  [SteamEndpoint.GetAppList]: AppListResponse
  [SteamEndpoint.GetSteamId]: SteamIDResponse
}

export const unpackObjectToQuery = (
  options: {
    [key: string]: string | boolean | number | undefined
  } = {},
) =>
  Object.keys(options)
    .flatMap(key => `${key}=${options[key]}`)
    .join('&')

export async function requestFromSteam<Endpoint extends SteamEndpoint>(
  apiUrl: string,
  endpoint: Endpoint,
  options?: EndpointOptions[Endpoint],
): Promise<EndpointResponse[Endpoint]> {
  const queryString = unpackObjectToQuery(options)
  const response = await fetch(
    `${apiUrl}/steam/${endpoint}${
      Boolean(queryString) ? `?${queryString}` : ''
    }`,
    {
      headers: {
        appId: APP_ID,
      },
    },
  )

  if (response.status === 200) {
    return await response.json()
  } else {
    throw new Error('Request failed')
  }
}

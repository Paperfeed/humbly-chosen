import { findAppIdsByName } from '../Background/steam'
import { ContentScriptOptions } from './background-messages'
import { PayloadRecord } from './handler'

export type Choice = {
  machineName: string
  title: string
}

type GameDataRequest = { games: Choice[]; identifier: string }

export type Await<T> = T extends Promise<infer U> ? U : T
export type GameInfoResponse = Await<ReturnType<typeof findAppIdsByName>>

export enum Content {
  Initialize = 'content/INITIALIZE',
  RequestGameData = 'content/REQUEST_GAME_DATA',
  RequestSteamId = 'content/REQUEST_STEAM_ID',
  SetSteamId = 'content/SET_STEAM_ID',
}

export interface ContentPayload extends PayloadRecord<Content> {
  [Content.RequestGameData]: GameDataRequest
  [Content.RequestSteamId]: { username: string }
  [Content.SetSteamId]: { steamId: string; username: string }
}

export interface ContentResponse extends PayloadRecord<Content> {
  [Content.Initialize]: ContentScriptOptions
  [Content.RequestGameData]: GameInfoResponse
  [Content.RequestSteamId]: { steamId: string }
}

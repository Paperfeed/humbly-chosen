import { PayloadRecord } from './handler'

export interface ContentScriptOptions {
  apiUrl: string
  isDev: boolean
  steamId: string | undefined
  username: string | undefined
}

export enum Background {
  Initialize = 'background/INITIALIZE',
  SendOptions = 'background/SEND_OPTIONS',
}

export interface BackgroundPayload extends PayloadRecord<Background> {
  [Background.Initialize]: ContentScriptOptions
}

export type BackgroundResponse = PayloadRecord<Background>

// export interface BackgroundResponse extends PayloadRecord<Background> {
//   [Content.RequestGameData]
// }

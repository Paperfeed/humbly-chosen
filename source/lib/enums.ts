export enum ContentMessageType {
  GetOptions = 'CONTENT/get_options',
  Initialize = 'CONTENT/initialize',
  IsDev = 'CONTENT/is_dev',
}

export enum BackgroundMessageType {
  Initialize = 'BACKGROUND/initialize',
  SendDevStatus = 'BACKGROUND/send_dev_status',
  SendOptions = 'BACKGROUND/send_options',
}

export enum StorageKey {
  Options = 'options',
  SteamGames = 'steam_games',
}

export interface MessageSender {
  frameId?: number
  id?: string
  tab?: {
    active: boolean
    attention?: boolean
    audible?: boolean
    cookieStoreId?: string
    discarded?: boolean
    favIconUrl?: string
    height?: number
    hidden?: boolean
    highlighted: boolean
    id?: number
    incognito: boolean
    index: number
    isArticle?: boolean
    isInReaderMode?: boolean
    lastAccessed?: number
    mutedInfo?: {
      extensionId?: string
      muted: boolean
      reason?: 'user' | 'capture' | 'extension'
    }
    openerTabId?: number
    pinned: boolean
    sessionId?: string
    sharingState?: { camera: boolean; microphone: boolean; screen?: string }
    status?: string
    successorTabId?: number
    title?: string
    url?: string
    width?: number
    windowId?: number
  }
  url?: string
}

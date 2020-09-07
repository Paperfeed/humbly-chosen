import { browser } from 'webextension-polyfill-ts'

import { StorageKey } from './enums'

export interface StoredOptions {
  steamId: string
  username: string
}

export function loadFromLocalStorage(key: StorageKey): unknown {
  return localStorage.getItem(key)
}

export const getFromStorage = async <T>(key: StorageKey): Promise<T> =>
  (await browser.storage.sync.get(key)) as T

import { browser } from 'webextension-polyfill-ts'

import { StorageKey } from './enums'

export interface StoredOptions {
  steamId: string
  username: string
}

export function loadFromLocalStorage(key: StorageKey): unknown {
  return localStorage.getItem(key)
}

export const getFromStorage = async <T>(key: StorageKey): Promise<T> => {
  const storedItem = await browser.storage.sync.get(key)
  return storedItem[key]
}

export const saveToStorage = async <T>(item: T) =>
  await browser.storage.sync.set(item)

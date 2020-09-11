import { browser } from 'webextension-polyfill-ts'

import { GameInfoResponse } from '../messages/content-messages'
import { StorageKey } from './enums'

export interface StoredOptions {
  steamId: string
  username: string
}

export type StoredHumbleChoiceData = Record<string, GameInfoResponse[]>

type StoredRecords<T extends StorageKey> = Record<T, object>

export interface StoredData extends StoredRecords<StorageKey> {
  [StorageKey.Options]: StoredOptions
  [StorageKey.HumbleChoiceData]: StoredHumbleChoiceData
}

export const getFromStorage = async <T extends StorageKey>(
  key: T,
): Promise<StoredData[T]> => {
  const storedItem = await browser.storage.sync.get(key)
  return storedItem[key]
}

export const saveToStorage = async <T>(item: T) =>
  await browser.storage.sync.set(item)

export const getFromLocalStorage = async <T extends StorageKey>(
  key: T,
): Promise<StoredData[T]> => {
  const storedItem = await browser.storage.local.get(key)
  return storedItem[key]
}

export const saveToLocalStorage = async <T>(item: T) =>
  await browser.storage.local.set(item)

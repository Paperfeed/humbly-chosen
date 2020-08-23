import { StorageKey } from './enums'

export function loadFromLocalStorage(key: StorageKey): unknown {
  return localStorage.getItem(key)
}

import { browser } from 'webextension-polyfill-ts'

import { BackgroundMessageType } from './background-messages'
import { ContentMessageType } from './content-messages'

type OptionalPayload<T> = T extends undefined ? [] : [T]

export function createMessage<P = undefined, M = string>(messageType: M) {
  return function dispatchMessage(...args: OptionalPayload<P>) {
    const content = args[0]

    if (content === undefined) {
      return { type: messageType }
    } else {
      return { ...content, type: messageType }
    }
  }
}

export type Flatten<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : undefined
}[keyof T]

export type Message = BackgroundMessageType | ContentMessageType

export const sendMessage = <T>(message: Message): Promise<T> =>
  browser.runtime.sendMessage(message)

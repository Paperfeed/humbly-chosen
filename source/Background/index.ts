import 'emoji-log'

import { browser } from 'webextension-polyfill-ts'

import { Debug, extensionIsDev } from '../lib/debug'
import {
  BackgroundMessageType,
  ContentMessageType,
  StorageKey,
} from '../lib/enums'

browser.runtime.onInstalled.addListener(async () => {
  const timeStamp = /((?:[0-9]:?){3,})/.exec(
    new Date(Date.now()).toTimeString(),
  )![0]

  console.emoji(
    '🦄',
    `[${timeStamp}] Extension installed and running in ${
      extensionIsDev() ? 'development' : 'production'
    } mode`,
  )
})

interface Message {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  type: ContentMessageType | BackgroundMessageType
}

export interface BackgroundMessage extends Message {
  type: BackgroundMessageType
}

export interface ContentMessage extends Message {
  type: ContentMessageType
}

const getFromStorage = async (key: StorageKey) =>
  await browser.storage.sync.get(key)

browser.runtime.onMessage.addListener(async function (
  request: ContentMessage,
  sender,
) {
  const sendResponse = (message: Message) => {
    Debug.log(
      `Sending message to ${sender.id}: ${JSON.stringify(message, null, 2)}`,
    )
    return message
  }

  Debug.log(
    `Background received message from [${
      sender.tab ? `${sender.tab.id} - ${sender.tab.title}` : sender.id
    }]: ${JSON.stringify(request, null, 2)}`,
  )

  switch (request.type) {
    case ContentMessageType.Initialize:
      return sendResponse({
        content: {
          isDev: await extensionIsDev(),
          options: await getFromStorage(StorageKey.Options),
        },
        type: BackgroundMessageType.Initialize,
      })
    case ContentMessageType.IsDev:
      return sendResponse({
        content: await extensionIsDev(),
        type: BackgroundMessageType.SendDevStatus,
      })
    case ContentMessageType.GetOptions:
      const options = await getFromStorage(StorageKey.Options)
      return sendResponse({
        content: options,
        type: BackgroundMessageType.SendOptions,
      })
  }

  return Promise.reject()
})

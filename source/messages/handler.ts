import { browser } from 'webextension-polyfill-ts'

import { Debug } from '../lib/debug'
import { MessageSender } from '../lib/types'
import {
  Background,
  BackgroundPayload,
  BackgroundResponse,
} from './background-messages'
import { Content, ContentPayload, ContentResponse } from './content-messages'

export type MessageType = Content | Background
export type PayloadRecord<T extends MessageType> = Record<T, object>
export type MessagePayload = ContentPayload & BackgroundPayload
export type MessageResponse = ContentResponse & BackgroundResponse

export type MessageHandler<T extends MessageType> = {
  payload: MessagePayload[T]
  type: T
}

export function sendMessage<T extends MessageType>(
  messageType: T,
): Promise<MessageResponse[T]>
export function sendMessage<T extends MessageType>(
  messageType: T,
  payload: MessagePayload[T],
): Promise<MessageResponse[T]>
export function sendMessage<T extends MessageType>(
  messageType: T,
  payload?: MessageResponse[T],
) {
  if (payload === undefined) {
    return browser.runtime.sendMessage({ type: messageType })
  } else {
    return browser.runtime.sendMessage({ payload, type: messageType })
  }
}

export const sendResponse = <T extends MessageType>(
  response: MessageResponse[T],
  sender: MessageSender,
) => {
  Debug.log(
    0,
    `Sending response to ${sender.id}: ${JSON.stringify(response, null, 2)}`,
  )
  return response
}

export function createListener(): {
  handleMessage: HandleMessageFn
  handleRequest: HandleRequestFn
} {
  const handlers: Partial<Record<MessageType, Function>> = {}

  const handleRequest: HandleRequestFn = async (request, sender) => {
    if (handlers.hasOwnProperty(request.type)) {
      const result = await (handlers[request.type] as Function)(
        request.payload,
        sender,
      )
      Debug.log(
        0,
        `Sending response for ${request.type} with payload ${JSON.stringify(
          request.payload,
          null,
          2,
        )}:\n\n${JSON.stringify(result, null, 2)}`,
      )
      return result
    } else {
      console.warn(`No handler has been implemented for ${request.type}`)
      // return Promise.reject()
    }
  }

  const handleMessage: HandleMessageFn = (messageType, handler) => {
    handlers[messageType] = handler

    return {
      handleMessage,
      handleRequest,
    }
  }

  return {
    handleMessage,
    handleRequest,
  }
}

type HandleMessageFn = <Message extends MessageType>(
  messageType: Message,
  handler: (
    payload: MessagePayload[Message],
    sender?: MessageSender,
  ) => MessageResponse[Message] | Promise<MessageResponse[Message]>,
) => ReturnType<typeof createListener>

type HandleRequestFn = <Message extends MessageType>(
  request: MessageHandler<Message>,
  sender?: MessageSender,
) => void

export function registerListener(listener: ReturnType<typeof createListener>) {
  browser.runtime.onMessage.addListener(async function (
    request: MessageHandler<Content>,
    sender,
  ) {
    Debug.log(
      0,
      `Received message from [${
        sender.tab ? `${sender.tab.id} - ${sender.tab.title}` : sender.id
      }]: ${JSON.stringify(request, null, 2)}`,
    )

    return listener.handleRequest(request, sender)
  })
}

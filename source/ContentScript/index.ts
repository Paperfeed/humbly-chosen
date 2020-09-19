import { Debug } from '../lib/debug'
import { ContentScriptOptions } from '../messages/background-messages'
import { Choice, Content } from '../messages/content-messages'
import {
  createListener,
  registerListener,
  sendMessage,
} from '../messages/handler'
import { injectApp } from './App'

function harvestChoices() {
  const choiceElements = document.querySelectorAll('.content-choice')
  const choices: Choice[] = []

  choiceElements.forEach(c => {
    const title = c.querySelector('.content-choice-title')
    const machineName = c.querySelector('[data-machine-name]') as HTMLElement
    choices.push({
      machineName:
        machineName !== null && machineName.dataset.machineName
          ? machineName.dataset.machineName
          : 'ERROR',
      title:
        title !== null && title.textContent
          ? title.textContent.trim()
          : 'ERROR',
    })
  })

  return choices
}

async function onInitialized(options: ContentScriptOptions) {
  Debug.log(2, 'Content script has successfully initialized')
  const choices = harvestChoices()
  injectApp({ choices, options, sendMessage })
}

async function initialize() {
  const listener = createListener()
  registerListener(listener)

  const options = await sendMessage(Content.Initialize)

  onInitialized(options)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
initialize().then(() => {})

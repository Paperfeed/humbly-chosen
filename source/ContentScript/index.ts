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

  console.log(choiceElements)

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
  const { apiUrl, steamId } = options

  const choices = harvestChoices()
  injectApp({ choices, options, sendMessage })

  try {
    // const userAppsResponse = await requestFromSteam<UserAppResponse>(
    //   `${apiUrl}/steam/getOwnedGames?steamid=76561197988723008`,
    // )
    // console.log('UserAppResponse', userAppsResponse)
    // const userAppsResponse = await request<UserAppResponse>(
    //   'https://www.foxslash.com/apps/steamchecker/?steamid=76561197988723008',
    // )
    // console.log('UserAppResponse', userAppsResponse)
  } catch (e) {
    console.error(e)
  }
}

async function initialize() {
  const listener = createListener()
  registerListener(listener)

  const options = await sendMessage(Content.Initialize)

  onInitialized(options)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
initialize().then(() => {})

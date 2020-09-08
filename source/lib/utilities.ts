import { DefaultTheme } from 'styled-components'

import { extensionIsDev } from './debug'

export const getAPIUrl = async () =>
  (await extensionIsDev())
    ? 'http://localhost:8888' //'http://localhost:3000'
    : 'https://humbly-serverless.netlify.app'

export type WithTheme<T> = T & { theme: DefaultTheme }

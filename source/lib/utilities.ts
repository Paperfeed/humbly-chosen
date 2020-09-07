import { extensionIsDev } from './debug'

export const getAPIUrl = async () =>
  (await extensionIsDev())
    ? 'http://localhost:8888' //'http://localhost:3000'
    : 'https://humbly-serverless.netlify.app'

export const clampToRange = (
  value: number,
  originalMax: number,
  originalMin = 0,
  newMin = 0,
  newMax = 1,
) =>
  ((value - originalMin) * (newMax - newMin)) / (originalMax - originalMin) +
  newMin

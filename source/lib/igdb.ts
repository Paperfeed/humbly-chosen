import { Debug } from './debug'
import { Endpoint, ExternalGameCategory } from './igdb-enums'
import { APP_ID } from './request'

const axios = require('axios').default

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataToRequestBody = (data: Record<string, any>) =>
  Object.keys(data)
    .reduce((reducedString, dataKey) => {
      const fieldData = data[dataKey]
      if (Array.isArray(fieldData)) {
        reducedString += `${dataKey} ${fieldData.join(',')}; `
      } else if (
        typeof fieldData === 'string' ||
        typeof fieldData === 'number'
      ) {
        reducedString += `${dataKey} ${fieldData}; `
      }
      return reducedString
    }, '')
    .trimEnd()

async function fetchIDGBData<T>(
  apiUrl: string,
  endpoint: Endpoint,
  data: Record<string, string | number | Array<string | number>> = {},
): Promise<T> {
  const appId = APP_ID

  if (appId === undefined) {
    throw new Error('No app-id defined')
  }

  if (apiUrl === '') {
    throw new Error('API_URL has not been initialized yet')
  }

  Debug.log(`Requesting from ${apiUrl}: ${dataToRequestBody(data)}`)

  try {
    const response = await axios.post(
      `${apiUrl}/${endpoint}`,
      dataToRequestBody(data),
      {
        headers: {
          Accept: 'application/json',
          appId,
        },
      },
    )
    return response.data
  } catch (e) {
    console.log(e)
    throw new Error('Could not retrieve data from IGDB')
  }
}

export const getGameInfo = async (apiUrl: string) =>
  await fetchIDGBData(apiUrl, Endpoint.ExternalGames, {
    fields: '*',
    limit: 10,
    where: `category = ${ExternalGameCategory.Steam}`,
  })

// export const getGameInfo = async (apiUrl: string) => {
//   const response = await apicalypseFactory({
//     baseURL: apiUrl,
//     headers: {
//       Accept: 'application/json',
//       appId: APP_ID,
//     },
//     method: 'POST',
//   })
//     .fields([
//       GameField.Name,
//       GameField.AggregatedRating,
//       GameField.AggregatedRatingCount,
//       GameField.PlayerPerspectives,
//       GameField.TimeToBeat,
//       GameField.TotalRating,
//       GameField.TotalRatingCount,
//       GameField.Popularity,
//     ])
//     .limit(10)
//     .sort(GameField.Name, 'desc')
//     .search('Halo')
//     .where('rating >= 80')
//     .request(`${Endpoint.Games}`)
//
//   return response.data
// }

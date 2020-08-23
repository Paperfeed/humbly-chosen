export const APP_ID =
  'FdARTribFXw5a92F0m57pbi52Fvt5I9irEJe6Wjcyh3Sqjo7ccQKlGl8h1Y5FzIR'

export async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (response.status === 200) {
    return await response.json()
  } else {
    throw new Error('Request failed')
  }
}

export async function requestFromSteam<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      appId: APP_ID,
    },
  })

  if (response.status === 200) {
    return await response.json()
  } else {
    throw new Error('Request failed')
  }
}

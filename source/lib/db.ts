import Dexie from 'dexie'

import { Debug, Verbosity } from './debug'
import { AppListResponse, GameData, SteamAppListGame } from './request'

export interface SteamApp {
  appId: number
  name: string
  owned: boolean
  playTimeForever?: number
  playTimeLinux?: number
  playTimeMac?: number
  playTimeWindows?: number
}

// This is the best way to setup Dexie in Typescript
export class SteamAppDatabase extends Dexie {
  apps: Dexie.Table<SteamApp, number>

  constructor() {
    super('AppDatabase')

    this.version(1).stores({
      apps: '&appId, name',
    })

    this.apps = this.table('apps')
  }
}

export const database = new SteamAppDatabase()

export async function indexSteamAppList(data: AppListResponse) {
  Debug.log(Verbosity.LOG, 'Initializing Datastore')

  database.open().catch(e => {
    Debug.log(3, 'Opening Database failed with error: ', e)
  })

  // TODO - Make this generic once I figure out some TypeScript magic
  const steamAppsToKeyedObject = (apps: SteamAppListGame[]) =>
    apps.reduce<Record<string, SteamAppListGame>>((obj, current) => {
      obj[current.appid] = current
      return obj
    }, {})

  const databaseAppsToKeyedObject = (apps: SteamApp[]) =>
    apps.reduce<Record<string, SteamApp>>((obj, current) => {
      obj[current.appId] = current
      return obj
    }, {})

  const recordsInDB = await database.apps.count()
  const recordsOnSteam = data.applist.apps.length

  Debug.log(
    Verbosity.INFO,
    `Database currently holds ${recordsInDB} records, Steam App list returned ${recordsOnSteam}`,
  )
  const time = performance.now()

  if (recordsOnSteam < recordsInDB) {
    /**
     * Less records exist than stored in the database,
     * so we should purge the database of those records
     */
    Debug.log(2, `Purging database of ${recordsInDB - recordsOnSteam} records`)

    const steamAppIds = steamAppsToKeyedObject(data.applist.apps)
    const allApps = await database.apps.toArray()
    const appsToBePurged = allApps
      .filter(a => steamAppIds[a.appId] === undefined)
      .map(i => i.appId)

    await database.apps.where('appId').anyOf(appsToBePurged).delete()
  } else if (recordsOnSteam > recordsInDB) {
    /**
     * New records exist, so we should update the database
     */
    Debug.log(
      2,
      `Adding ${recordsOnSteam - recordsInDB} new records to database`,
    )

    const allAppsInDb = await database.apps.toArray()
    const databaseAppIds = databaseAppsToKeyedObject(allAppsInDb)
    const appsToBeAdded = data.applist.apps
      .filter(app => databaseAppIds[app.appid] === undefined)
      .map(app => ({
        appId: parseInt(app.appid),
        name: app.name,
        owned: false,
      }))

    await database.apps.bulkAdd(appsToBeAdded)
  }

  Debug.log(
    Verbosity.INFO,
    `Took ${Math.round(performance.now() - time)}ms to perform operation(s)`,
  )
  Debug.log(Verbosity.LOG, 'Successfully initialized Database')
}

export async function indexOwnedGames(games: GameData[]) {
  Debug.log(
    Verbosity.LOG,
    `Indexing owned games and merging them with existing data`,
  )

  const time = performance.now()
  const transformedApps = games.map(g => ({
    appId: g.appid,
    owned: true,
    playTimeForever: g.playtime_forever,
    playTimeLinux: g.playtime_linux_forever,
    playTimeMac: g.playtime_mac_forever,
    playTimeWindows: g.playtime_windows_forever,
  }))

  const ownedAppIds = transformedApps.map(g => g.appId)
  const ownedApps = await database.apps.bulkGet(ownedAppIds)

  if (ownedApps.length !== transformedApps.length) {
    throw new Error('Owned apps is not equal to transformed apps')
  }

  const mergedApps = ownedApps
    .map((a, i) => {
      if (a?.appId !== transformedApps[i]?.appId) {
        Debug.log(
          Verbosity.WARN,
          `Merging went wrong! Found differing appIds for ${JSON.stringify(
            a,
          )} and ${JSON.stringify(transformedApps[i])}`,
        )
      }
      return {
        ...transformedApps[i],
        ...a,
      }
    })
    .filter(a => a !== undefined)

  Debug.log(
    Verbosity.INFO,
    `Merging ${transformedApps.length} owned games into database`,
  )
  await database.apps.bulkPut(mergedApps)
  Debug.log(Verbosity.DEBUG, `Operation took ${performance.now() - time}ms`)
}

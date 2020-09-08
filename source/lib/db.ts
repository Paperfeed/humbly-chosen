import Dexie from 'dexie'

import { Debug } from './debug'
import { AppListResponse } from './request'

export interface SteamApp {
  appId: number
  name: string
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
  Debug.log(1, 'Initializing Datastore')
  database.open().catch(e => {
    Debug.log(3, 'Opening Database failed with error: ', e)
  })

  const recordsInDB = await database.apps.count()
  const recordsOnSteam = data.applist.apps.length
  Debug.log(
    2,
    `Database currently holds ${recordsInDB} records, Steam App list returned ${recordsOnSteam}`,
  )

  const time = performance.now()
  if (recordsOnSteam < recordsInDB) {
    Debug.log(2, `Purging database of ${recordsInDB - recordsOnSteam} records`)
    const appIds = data.applist.apps.map(app => app.appid)
    await database.apps.where('appId').noneOf(appIds).delete()
  } else if (recordsOnSteam > recordsInDB) {
    Debug.log(
      2,
      `Adding ${recordsOnSteam - recordsInDB} new records to database`,
    )
    const appIds = data.applist.apps.map(app => app.appid)
    const existingApps = await database.apps
      .where('appId')
      .anyOf(appIds)
      .toArray()

    const newRecords = data.applist.apps
      .filter(
        app =>
          !existingApps.some(
            existingApp => existingApp.appId === parseInt(app.appid),
          ),
      )
      .map(app => ({ appId: parseInt(app.appid), name: app.name }))

    Debug.log(2, `Adding ${newRecords.length} new records to Database`)
    await database.apps.bulkAdd(newRecords)
  }
  Debug.log(
    2,
    `Took ${Math.round(performance.now() - time)}ms to perform operation(s)`,
  )

  Debug.log(2, 'Succesfully initialized Database')
}

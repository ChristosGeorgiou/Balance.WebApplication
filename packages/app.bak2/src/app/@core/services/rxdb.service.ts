import { Injectable } from '@angular/core'
import { addRxPlugin, createRxDatabase, removeRxDatabase, RxCollection, RxDatabase } from 'rxdb'
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments'
import { getRxStorageDexie } from 'rxdb/plugins/dexie'
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBUpdatePlugin } from 'rxdb/plugins/update'
import { BehaviorSubject } from 'rxjs'
import { Migrations } from '../migrations'
import schema from '../models/entity.json'
import { ConfigService } from '../services/config.service'

addRxPlugin(RxDBLeaderElectionPlugin)
// addRxPlugin(RxDBReplicationPlugin)
addRxPlugin(RxDBAttachmentsPlugin)
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBUpdatePlugin)

@Injectable({
  providedIn: 'root'
})
export class RxDBService {

  public db: RxDatabase

  replicationState: any
  entities: RxCollection
  status$: BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>
    = new BehaviorSubject<'active' | 'error' | 'syncing' | 'disabled'>('disabled')

  get workspace () {
    return this.configService.workspace
  }

  constructor (
    private configService: ConfigService
  ) { }

  async setup () {

    if (!this.workspace) {
      console.log('[DatabaseService]', `There is not a selected workspace. Abord!`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: balnc_${this.workspace.key}`)

    try {
      this.db = await createRxDatabase({
        name: `balnc_${this.workspace.key}`,
        storage: getRxStorageDexie()
      })
    } catch (err) {
      console.log('[DatabaseService]', err)
      // console.log('[DatabaseService]', `Database exist: balnc_${this.workspace.key}`)
      return
    }

    await this.db.addCollections({
      entities: {
        schema: schema,
        migrationStrategies: Migrations
      }
    })

    this.entities = this.db.entities
  }

  async remove (workspaceKey: string) {
    await removeRxDatabase(`balnc_${workspaceKey}`, getRxStorageDexie())
  }
}

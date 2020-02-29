import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Profile } from '@balnc/shared'
import { ToastrService } from 'ngx-toastr'
import * as AdapterHttp from 'pouchdb-adapter-http'
import * as AdapterIdb from 'pouchdb-adapter-idb'
import * as AdapterMemory from 'pouchdb-adapter-memory'
// import { PouchFind } from 'pouchdb-find'
import { RxDatabase } from 'rxdb'
import AdapterCheckPlugin from 'rxdb/plugins/adapter-check'
import AttachmentsPlugin from 'rxdb/plugins/attachments'
import RxDB from 'rxdb/plugins/core'
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages'
import JsonDumpPlugin from 'rxdb/plugins/json-dump'
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election'
import RxDBReplicationModule from 'rxdb/plugins/replication'
import RxDBReplicationGraphQL, { RxGraphQLReplicationState } from 'rxdb/plugins/replication-graphql'
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check'
import RxDBUpdateModule from 'rxdb/plugins/update'
import RxDBValidateModule from 'rxdb/plugins/validate'
import environment from '../../../environments/environment'
import { ConfigService } from '../services/config.service'
import { Migrations } from './migrations'
import schema from './models/entity.json'

if (!environment.production) {
  console.log('[DatabaseService]', 'In debug')
  RxDB.plugin(RxDBSchemaCheckModule)
  // RxDB.QueryChangeDetector.enableDebugging()
}

RxDB.plugin(RxDBValidateModule)
RxDB.plugin(RxDBLeaderElectionModule)
RxDB.plugin(RxDBReplicationModule)
RxDB.plugin(AttachmentsPlugin)
RxDB.plugin(RxDBErrorMessagesModule)
RxDB.plugin(AdapterCheckPlugin)
RxDB.plugin(JsonDumpPlugin)
RxDB.plugin(AdapterHttp)
RxDB.plugin(AdapterIdb)
RxDB.plugin(AdapterMemory)
RxDB.plugin(RxDBUpdateModule)
RxDB.plugin(RxDBReplicationGraphQL)
// RxDB.plugin(PouchFind)

@Injectable()
export class RxDBService {

  public db: RxDatabase
  private replicationState: RxGraphQLReplicationState
  private profile: Profile

  get http () {
    return this.injector.get(HttpClient)
  }
  get configService () {
    return this.injector.get(ConfigService)
  }
  get toastr () {
    return this.injector.get(ToastrService)
  }

  constructor (
    private injector: Injector
  ) {
  }

  async setup () {
    this.profile = {
      ...{
        key: 'default',
        data: {
          persist: true
        },
        remote: {
          enabled: false
        }
      }, ...this.configService.profile
    }
    if (!this.profile) {
      console.log('[DatabaseService]', `There is not a selected profile`)
      return
    }

    console.log('[DatabaseService]', `Initializing DB: ${this.profile.key}`)

    // if (this.db && this.db.name === `balnc_${this.profile.key}`) return

    try {
      this.db = await RxDB.create({
        name: `balnc_${this.profile.key}`,
        adapter: 'memory'
      })
    } catch (err) {
      return
    }

    await this.db.collection({
      name: 'entities',
      schema: schema,
      migrationStrategies: Migrations
    })

    console.log('[DatabaseService]', `Sync entities`)

    if (!this.profile.remote.enabled) {
      return
    }

    // if (this.config.username) {
    //   await this.authenticate(this.config.username, this.config.password)
    // }

    console.log('sync with syncGraphQL')

    this.replicationState = this.db.entities.syncGraphQL({
      url: 'http://127.0.0.1:10102/graphql',
      push: {
        batchSize: 5,
        queryBuilder: (doc) => {
          return {
            query: `
              mutation EntityCreate($doc: EntityInput) {
                setEntity(doc: $doc) {
                  _id,
                  timestamp
                }
              }
            `,
            variables: {
              doc
            }
          }
        }
      },
      pull: {
        queryBuilder: (doc) => {
          if (!doc) {
            doc = {
              id: '',
              updatedAt: 0
            }
          }
          return {
            query: `
                {
                  feedForRxDBReplication(lastId: "${doc._id}", minUpdatedAt: ${doc._date}, limit: 30) {
                    _id
                    timestamp
                    deleted
                    type
                    data
                  }
                }`
            ,
            variables: {}
          }
        }
      },
      live: true,
      /**
       * TODO
       * we have to set this to a low value, because the subscription-trigger
       * does not work sometimes. See below at the SubscriptionClient
       */
      liveInterval: 1000 * 2,
      deletedFlag: 'deleted'
    })
  }

  async authenticate (username: string, password: string) {
    return this.http.post(`${this.profile.remote.host}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
      .catch((res) => {
        this.toastr.error('Could not auto-login with db server. Check your internet connection.', '[Database] Load Failed')
      })
  }

  async remove (profileKey: string) {
    if (this.profile.cache) {
      await RxDB.removeDatabase(`balnc_${profileKey}`, 'idb')
    }
  }
}

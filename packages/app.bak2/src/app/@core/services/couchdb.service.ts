import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CouchDBIntegration } from '../models/integration'
import { ConfigService } from './config.service'
import { RxDBService } from './rxdb.service'

@Injectable({
  providedIn: 'root'
})
export class CouchDBService {
  replicationState: any

  get config () {
    return this.configService.integrations.couchdb as CouchDBIntegration
  }

  constructor (
    private configService: ConfigService,
    private rxdbService: RxDBService,
    private http: HttpClient,
  ) { }

  enable () {
    this.replicationState = this.rxdbService.db.entities.syncCouchDB({
      remote: `${this.config.host}/${this.config.db}`
    })
    this.replicationState.active$
      .subscribe((state: boolean) => {
        this.rxdbService.status$.next(state ? 'syncing' : 'active')
      })
  }

  disable () {
    if (this.replicationState) {
      this.replicationState.cancel()
    }
    this.rxdbService.status$.next('disabled')
  }

  async needAuth () {
    const resp = await this.http.get(`${this.config.host}/_session`, {
      withCredentials: true
    }).toPromise().catch(() => false)
    if (!resp) {
      console.log('[CouchDB Service]', `No response from ${this.config.host}/_session. Disable remote`)
      return false
    }
    if (resp['userCtx'].name) {
      console.log('[DatabaseService]', `Already authenticated`)
      return false
    }
    return true
  }

  async authenticate (username: string, password: string) {
    return this.http.post(`${this.config.host}/_session`, {
      name: username,
      password: password
    }, { withCredentials: true })
      .toPromise()
  }
}

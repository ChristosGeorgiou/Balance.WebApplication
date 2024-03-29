import { Injectable } from '@angular/core'
import { ReadFile } from 'ngx-file-helpers'
import { LocalStorage } from 'ngx-store'
import { BehaviorSubject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { Helpers } from '../../@shared/helpers'
import { Build } from '../models/enviroment'
import { Integration } from '../models/integration'
import { DEFAULT_USER, User } from '../models/user'
import { Workspace, WORKSPACE_VERSION } from '../models/workspace'
import { environment } from './../../../environments/environment'

@Injectable()
export class ConfigService {

  @LocalStorage() isSidebarClosed: boolean = false
  @LocalStorage() roles: string[] = []

  @LocalStorage()
  private activated: string = ''

  @LocalStorage() workspaces: Workspace[] = []
  @LocalStorage() userId: string | null = null

  users: User[] = []
  integrations?: { [key: string]: Integration } = {}

  menu: any
  userAvatars: { [key: string]: string } = {}

  workspace$: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>({} as Workspace)

  get usernames() {
    return this.users.reduce((l, i) => {
      l[i.id] = i.username
      return l
    }, {} as { [key: string]: string })
  }

  get version(): string {
    return environment.version
  }

  get build(): Build {
    return environment.build
  }

  get workspace() {
    return this.workspace$.value
  }

  get user() {
    return this.users?.find(u => u.id === this.userId)
  }

  constructor() {
    this.workspaces = this.workspaces.filter(x => x.version || x.version > WORKSPACE_VERSION)
  }

  setup() {
    console.log('[ConfigService]', 'Initializing with env:', environment)

    if (!this.workspaces.length) {
      console.log('[ConfigService]', 'No workspaces are available. Abording!')
      return
    }

    console.log('[ConfigService]', 'Workspaces available:', this.workspaces.length)

    if (!this.activated) {
      console.log('[ConfigService]', 'No selected workspace. Auto select first')
      this.activate(this.workspaces[0].key)
    } else if (this.workspaces.findIndex(p => p.key === this.activated) === -1) {
      console.log('[ConfigService]', 'Selected workspace not exist. Auto select first')
      this.activate(this.workspaces[0].key)
    } else {
      this.activate(this.activated)
    }
  }

  activate(key: string) {
    console.log('[ConfigService]', 'Activate workspace', this.activated)
    let w = this.workspaces.find(x => x.key === key)
    if (!w) w = this.workspaces[0]
    this.activated = w.key
    this.workspace$.next(w)
  }

  create(data: Partial<Workspace>): string {
    const ws: Partial<Workspace> = {
      ...DEFAULT_USER,
      ...{
        key: uuidv4().replace(/-/g, ''),
        name: Helpers.generateName(),
        created: Date.now()
      },
      ...data
    }
    this.workspaces.push(ws as Workspace)
    this.workspaces = [...this.workspaces]
    return data.key as string
  }

  update(data: Partial<Workspace>): string {
    let i = this.workspaces.findIndex(p => p.key === data.key)
    this.workspaces[i] = data as Workspace
    this.workspaces = [...this.workspaces]
    return data.key as string
  }

  remove(key: string) {
    let workspaces = [...this.workspaces]
    let index = this.workspaces.findIndex(p => p.key === key)
    if (index !== -1) {
      workspaces.splice(index, 1)
    }
    this.workspaces = workspaces
  }

  import(file: ReadFile): Workspace {
    try {
      const data = file.content.split(',')[1]
      const workspaceStr = atob(data)
      const workspace: Workspace = JSON.parse(workspaceStr)
      return workspace
    } catch (error) {
      return {} as Workspace
    }
  }

  export() {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.workspace, null, 2)], { type: 'application/json' })
    a.href = URL.createObjectURL(file)
    a.download = `${(new Date()).toDateString()} - ${this.workspace?.key}.json`
    a.click()
  }

  getIntergration<T>(key: string) {
    // if (!this.integrations) return null
    // return this.integrations[key] || {}
  }

}

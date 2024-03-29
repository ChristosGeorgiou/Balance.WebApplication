import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService, RxDBService, UsersRepo, Workspace } from '@balnc/core'
import { Helpers, MENU } from '@balnc/shared'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']

})
export class GeneralComponent implements OnInit {

  @ViewChild('name') name: ElementRef
  @ViewChild('alias') alias: ElementRef

  workspaceName: string
  workspaceAlias: string

  selected: string
  workspace: Workspace

  deleteData = false
  deleteDataRemote = false
  editName = false

  source: string
  options: any = { maxLines: 1000, printMargin: true }
  rawErr = false

  menuItems: { [key: string]: boolean }

  usersSub: any
  allItems: {}

  get username () {
    return this.configService.user?.username
  }

  get user () {
    return this.configService.user
  }

  get avatar () {
    return this.configService.userAvatars[this.user.id]
  }

  get menu () {
    return MENU
  }

  constructor (
    private configService: ConfigService,
    private router: Router,
    private dbService: RxDBService,
    private usersRepo: UsersRepo,
    private angulartics2: Angulartics2
  ) {
  }

  ngOnInit () {
    this.workspace = this.configService.workspace
    this.allItems = Helpers.allMenuItems()
  }

  updateWorkspace (data: any) {
    this.workspace = { ...this.workspace, ...data }
    this.configService.update(this.workspace)
    this.angulartics2.settings.developerMode = !this.workspace.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.workspace.errors
  }

  async deleteWorkspace () {
    if (!confirm('Are you sure?')) return
    await this.dbService.remove(this.workspace.key)
    this.configService.remove(this.workspace.key)

    if (!this.configService.workspaces.length) {
      await this.router.navigate(['/setup'])
      return false
    }
    this.configService.setup()
    await this.dbService.setup()
  }

  export () {
    this.configService.export()
  }

  removeUser () {
    return this.usersRepo.remove(this.user.id)
  }

  async saveUser () {
    await this.usersRepo.update(this.user.id, this.user)
  }

  @ViewChild('fileupload') fileupload: ElementRef
  selectAvatar () {
    this.fileupload.nativeElement.click()
  }

  async clearAvatar () {
    await this.usersRepo.detach(this.user.id, 'avatar')
  }

  async uploadAvatar (file: File) {
    await this.usersRepo.attach(this.user.id, file, 'avatar')
  }
}

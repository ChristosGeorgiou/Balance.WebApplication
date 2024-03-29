import { Component, OnInit } from '@angular/core'
import { ConfigService, RxDBService, Workspace } from '@balnc/core'
import { Helpers, MenuItem } from '@balnc/shared'
import { ReadFile } from 'ngx-file-helpers'
import environment from '../../../environments/environment'

@Component({
  selector: 'app-settings-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {

  error: string
  workspace: Workspace

  helperService = Helpers

  menu: MenuItem[] = [{
    route: '/settings/general',
    icon: 'cog',
    type: 'button',
    label: 'General'
  }, {
    route: '/settings/integrations',
    icon: 'boxes',
    type: 'button',
    label: 'Integrations'
  }]

  extra: MenuItem[] = [{
    route: '/settings/workspaces',
    icon: 'swatchbook',
    type: 'button',
    label: 'Workspaces'
  }, {
    route: '/settings/developer',
    icon: 'code',
    type: 'button',
    label: 'Developer'
  }]

  support: MenuItem[] = [{
    route: '/settings/faq',
    icon: ['far', 'question-circle'],
    type: 'button',
    label: 'FAQ'
  },
  {
    route: '/settings/live',
    icon: 'concierge-bell',
    type: 'button',
    label: 'Live Chat'
  },
  {
    route: '/settings/about',
    icon: 'info-circle',
    type: 'button',
    label: 'About'
  }]

  get version () {
    return environment.version
  }

  get build () {
    return environment.build
  }

  get workspaces () {
    return this.configService.workspaces
  }

  get activated () {
    return this.configService.workspace.key
  }

  constructor (
    public configService: ConfigService,
    // private modal: BsModalService,
    private dbService: RxDBService
  ) { }

  ngOnInit () {
    this.workspace = this.configService.workspace
  }

  // async remove (workspaceId) {
  //   await this.modal.open(ConfirmDialogComponent, { size: 'sm' })
  //     .result
  //     .then(async () => {
  //       this.configService.remove(workspaceId)
  //       await this.dbService.remove(workspaceId)
  //     })
  //     .catch(() => {
  //       console.log('dismised')
  //     })
  // }

  onFilePicked (file: ReadFile) {
    this.error = null
    try {
      const data = file.content.split(',')[1]
      const workspaceStr = atob(data)
      const workspace = JSON.parse(workspaceStr)
      const key = this.configService.update(workspace)
      this.configService.activate(key)
    } catch (error) {
      this.error = 'File is corrupted'
      console.log('[WorkspaceComponent]', 'Error' + error)
    }
  }
}

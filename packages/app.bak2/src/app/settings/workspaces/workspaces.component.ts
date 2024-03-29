import { Component } from '@angular/core'
import { ConfigService, DEFAULT_WORKSPACE, RxDBService } from '@balnc/core'
import { ReadFile } from 'ngx-file-helpers'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-settings-workspaces',
  templateUrl: './workspaces.component.html'
})
export class WorkspacesComponent {

  get workspaces () {
    return this.configService.workspaces
  }

  get activated () {
    return this.configService.workspace.key
  }

  constructor (
    private configService: ConfigService,
    private toastr: ToastrService,
    private dbService: RxDBService
  ) { }

  async create () {
    const key = this.configService.create({ ...DEFAULT_WORKSPACE })
    this.configService.activate(key)
    await this.activate(key)
  }

  async import (file: ReadFile) {
    const workspace = this.configService.import(file)
    if (!workspace) {
      this.toastr.error('Import failed')
      return
    }
    const key = this.configService.update(workspace)
    await this.activate(key)
  }

  async activate (key: string) {
    this.configService.activate(key)
    this.configService.setup()
    await this.dbService.setup()
    window.location.reload()
  }
}

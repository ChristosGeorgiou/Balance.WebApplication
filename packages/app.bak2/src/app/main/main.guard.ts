import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ConfigService, RxDBService } from '@balnc/core'

@Injectable()
export class MainGuard implements CanActivate {

  constructor (
    private rxdbService: RxDBService,
    private configService: ConfigService,
    private router: Router) { }

  async canActivate () {
    if (!this.configService.workspaces.length) {
      return this.router.parseUrl('/setup')
    }

    this.configService.setup()

    if (!this.configService.workspace) {
      return this.router.parseUrl('/setup')
    }

    await this.rxdbService.setup()

    return true
  }
}

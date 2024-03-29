import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'

@Injectable()
export class SetupGuard implements CanActivate {
  constructor (public configService: ConfigService, public router: Router) { }
  async canActivate () {
    if (this.configService.workspaces.length) {
      await this.router.navigate(['/dashboard'])
      return false
    }
    return true
  }
}

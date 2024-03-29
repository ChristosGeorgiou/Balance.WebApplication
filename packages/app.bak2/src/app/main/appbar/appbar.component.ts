import { Component, HostBinding, OnInit } from '@angular/core'
import { ConfigService, UsersRepo } from '@balnc/core'
import { MENU } from '@balnc/shared'

@Component({
  selector: 'app-appbar',
  templateUrl: 'appbar.component.html',
  styleUrls: ['appbar.component.scss']
})
export class AppbarComponent implements OnInit {

  @HostBinding('class.compact') get compact () {
    return this.configService.user?.config?.menu?.size
      ? this.configService.user?.config?.menu?.size === 'compact'
      : true
  }

  username: string

  networkStatus = navigator.onLine
  databaseStatus = false
  isOnline = false

  pageLoading = false

  get menu () {
    return [...MENU]
      .filter(m => this.user?.config?.menu?.items[m.label])
      .map((x, i) => {
        // x.iconColor = '#aaa'// COLORS[Object.keys(COLORS)[i]]['300']
        return x
      })
  }

  get isClosed () {
    return this.configService.isSidebarClosed
  }

  get user () {
    return this.configService.user
  }

  constructor (
    private usersRepo: UsersRepo,
    private configService: ConfigService
  ) { }

  ngOnInit () { }

  toggleMenu () {
    this.configService.isSidebarClosed = !this.configService.isSidebarClosed
  }
}

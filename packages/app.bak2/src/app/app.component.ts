import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'
import * as Sentry from '@sentry/browser'
import { Angulartics2 } from 'angulartics2'
import { ConfigService } from './@core'

const minHeight = 960
const minWidth = 660

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor (
    private configService: ConfigService,
    private router: Router,
    titleService: Title,
    angulartics2: Angulartics2
  ) {

    angulartics2.settings.developerMode = !this.configService.workspace?.analytics
    Sentry.getCurrentHub().getClient().getOptions().enabled = this.configService.workspace?.errors

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ')
        titleService.setTitle(`Balnc${title ? ` - ${title}` : ''}`)
      }
    })

    if (window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator['standalone'] === true) {
      window.addEventListener('resize', () => {
        if (window.innerHeight < minHeight) {
          window.resizeTo(window.innerWidth, minHeight)
        }
        if (window.innerWidth < minWidth) {
          window.resizeTo(minWidth, window.innerHeight)
        }
      })
    }
  }

  getTitle (state, parent) {
    let data = []
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title)
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)))
    }
    return data
  }

}

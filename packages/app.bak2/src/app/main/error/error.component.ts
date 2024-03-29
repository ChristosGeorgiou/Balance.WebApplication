import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SessionStorage } from 'ngx-store'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {

  @SessionStorage() error = ''

  constructor (private router: Router) { }

  async clear () {
    let keys = Object.keys(localStorage)
    let i = keys.length
    while (i--) {
      indexedDB.deleteDatabase(keys[i])
    }
    localStorage.clear()
    await this.router.navigate(['/setup'])
  }
}

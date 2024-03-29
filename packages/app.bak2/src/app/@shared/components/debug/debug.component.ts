import { Component, Input, OnInit } from '@angular/core'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['debug.component.scss']
})
export class DebugComponent implements OnInit {

  @Input() title
  @Input() color = 'dark'
  @Input() type = 'custom'
  @Input() data

  show = true

  ngOnInit () {

    this.show = !environment.production || this.type !== 'debug'

    switch (this.type) {
      case 'custom':
        break
      case 'debug':
        this.title = this.title || 'debug'
        this.color = this.color || 'dark'
        break
      case 'info':
        this.title = this.title || 'Info'
        this.color = this.color || 'dark'
        break
      case 'warning':
        this.title = this.title || 'Warning'
        this.color = this.color || 'warning'
        break
      case 'error':
        this.title = this.title || 'Error'
        this.color = this.color || 'danger'
        break
    }

    this.color = `bg-${this.color}`
  }
}

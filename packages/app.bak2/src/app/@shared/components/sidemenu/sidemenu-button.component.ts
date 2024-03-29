import { Component, HostBinding, Input } from '@angular/core'
import { MenuItem } from '../../models/menu-item'

@Component({
  selector: 'app-sidemenu-button',
  templateUrl: './sidemenu-button.component.html',
  styleUrls: ['./sidemenu-button.component.scss']
})
export class SidemenuButtonComponent {

  @HostBinding('class.highlight') get highlight () {
    return this.i.highlight
  }

  @Input('item') i: MenuItem
}

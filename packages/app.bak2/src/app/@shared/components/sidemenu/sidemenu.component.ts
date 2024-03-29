import { Component, Input } from '@angular/core'
import { MenuItem } from '../../models/menu-item'

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {

  @Input() menu: MenuItem[]

}

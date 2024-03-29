import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['empty.component.scss']
})
export class EmptyComponent {
  @Input() message
  @Input() submessage
  @Input() undraw = 'no-data'
}

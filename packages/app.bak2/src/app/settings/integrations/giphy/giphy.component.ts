import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GiphyIntegration } from '@balnc/core'

@Component({
  selector: 'app-integration-giphy',
  templateUrl: './giphy.component.html'
})
export class GiphyComponent {
  @Input() config: GiphyIntegration
  @Output() configChange = new EventEmitter<GiphyIntegration>()

}

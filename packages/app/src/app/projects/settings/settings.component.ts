import { Component } from '@angular/core'
import { DemoService } from '../@shared/services/demo.service'

@Component({
  selector: 'app-projects-settings',
  templateUrl: 'settings.component.html'

})
export class SettingsComponent {

  generating: boolean
  generated: number

  constructor (
    private demoService: DemoService
  ) { }

  async generateDemoData () {
    if (!confirm('Are you sure?')) return
    this.generating = true
    await this.demoService.generate()
    this.generated = Date.now()
    this.generating = false
  }
}

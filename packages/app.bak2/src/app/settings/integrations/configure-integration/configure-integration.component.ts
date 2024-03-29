import { Component, Input, OnInit } from '@angular/core'
import { ConfigService, IntegrationsRepo } from '@balnc/core'
import { IntegrationView } from '@balnc/shared'
import { BsModalService } from 'ngx-bootstrap/modal'
import { Integration } from '../../../@core/models/integration'

@Component({
  selector: 'app-configure-integration',
  templateUrl: './configure-integration.component.html'
})
export class ConfigureIntegrationComponent implements OnInit {

  @Input() integration: IntegrationView

  config: Integration

  get modal () {
    return this.activeModal
  }

  constructor (
    private activeModal: BsModalService,
    private configService: ConfigService,
    private integrationRepo: IntegrationsRepo
  ) { }

  ngOnInit () {
    this.config = { ...this.configService.integrations[this.integration.key] }
  }

  async save () {
    if (this.configService.integrations[this.integration.key]) {
      await this.integrationRepo.update(this.config.id, this.config)
    } else {
      await this.integrationRepo.add(this.config, this.integration.key)
    }
  }

}

import { Component, OnInit } from '@angular/core'
import { ConfigService } from '@balnc/core'
import { BsModalService } from 'ngx-bootstrap/modal'
import { INTEGRATIONS } from '../../@shared/consts/integrations'
import { ConfigureIntegrationComponent } from './configure-integration/configure-integration.component'

@Component({
  selector: 'app-settings-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['integrations.component.scss']

})
export class IntegrationsComponent implements OnInit {

  integrations = INTEGRATIONS

  get active () {
    if (!this.configService.integrations) return {}
    return Object.keys(this.configService.integrations).reduce((l, k) => {
      l[k] = this.configService.integrations[k].enabled
      return l
    }, {})
  }

  constructor (
    private configService: ConfigService,
    private modalSrv: BsModalService
  ) { }

  ngOnInit () { }

  configure (key: string) {
    const integration = INTEGRATIONS.find(x => x.key === key)
    if (integration.disabled) return
    const bsModalRef = this.modalSrv.show(ConfigureIntegrationComponent)
    bsModalRef.content.integration = integration
  }
}

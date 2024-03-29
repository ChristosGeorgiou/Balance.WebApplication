import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ShellComponent } from './@shell/shell.component'
import { AboutComponent } from './about/about.component'
import { FaqComponent } from './faq/faq.component'
import { GeneralComponent } from './general/general.component'
import { ConfigureIntegrationComponent } from './integrations/configure-integration/configure-integration.component'
import { GiphyComponent } from './integrations/giphy/giphy.component'
import { IntegrationsComponent } from './integrations/integrations.component'
import { MailgunComponent } from './integrations/mailgun/mailgun.component'
import { StripeComponent } from './integrations/stripe/stripe.component'
import { LiveComponent } from './live/live.component'
import { SettingsRoutes } from './settings.routes'
import { WorkspacesComponent } from './workspaces/workspaces.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    IntegrationsComponent,
    WorkspacesComponent,
    MailgunComponent,
    StripeComponent,
    GiphyComponent,
    ConfigureIntegrationComponent,
    FaqComponent,
    LiveComponent,
    AboutComponent
  ],
  entryComponents: [
    ConfigureIntegrationComponent
  ]
})
export class SettingsModule { }

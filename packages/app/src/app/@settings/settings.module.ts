import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AceEditorModule } from 'ng2-ace-editor'
import { ShellComponent } from './@shell/shell.component'
import { DemoComponent } from './developer/demo/demo.component'
import { DeveloperComponent } from './developer/developer.component'
import { RawComponent } from './developer/raw/raw.component'
import { GeneralComponent } from './general/general.component'
import { ConfigureIntegrationComponent } from './integrations/configure-integration/configure-integration.component'
import { GiphyComponent } from './integrations/giphy/giphy.component'
import { IntegrationsComponent } from './integrations/integrations.component'
import { MailgunComponent } from './integrations/mailgun/mailgun.component'
import { ServerComponent } from './integrations/server/server.component'
import { StripeComponent } from './integrations/stripe/stripe.component'
import { SettingsRoutes } from './settings.routes'
import { WorkspacesComponent } from './workspaces/workspaces.component'

@NgModule({
  imports: [
    SharedModule,
    AceEditorModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    IntegrationsComponent,
    RawComponent,
    WorkspacesComponent,
    DeveloperComponent,
    DemoComponent,
    MailgunComponent,
    StripeComponent,
    GiphyComponent,
    ConfigureIntegrationComponent,
    ServerComponent
  ],
  entryComponents: [
    RawComponent,
    ConfigureIntegrationComponent
  ]
})
export class SettingsModule { }
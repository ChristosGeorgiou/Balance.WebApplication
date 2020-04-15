import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AceEditorModule } from 'ng2-ace-editor'
import { ShellComponent } from './@shell/shell.component'
import { DemoDataComponent } from './demo-data/demo-data.component'
import { DeveloperComponent } from './developer/developer.component'
import { GeneralComponent } from './general/general.component'
import { ConfigureIntegrationComponent } from './integrations/configure-integration/configure-integration.component'
import { GiphyComponent } from './integrations/giphy/giphy.component'
import { IntegrationsComponent } from './integrations/integrations.component'
import { MailgunComponent } from './integrations/mailgun/mailgun.component'
import { ServerComponent } from './integrations/server/server.component'
import { StripeComponent } from './integrations/stripe/stripe.component'
import { RawViewComponent } from './raw-view/raw-view.component'
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
    RawViewComponent,
    WorkspacesComponent,
    DeveloperComponent,
    DemoDataComponent,
    MailgunComponent,
    StripeComponent,
    GiphyComponent,
    ConfigureIntegrationComponent,
    ServerComponent
  ],
  entryComponents: [
    RawViewComponent,
    ConfigureIntegrationComponent
  ]
})
export class SettingsModule { }

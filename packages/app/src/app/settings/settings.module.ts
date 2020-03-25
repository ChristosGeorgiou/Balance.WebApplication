import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { AceEditorModule } from 'ng2-ace-editor'
import { ShellComponent } from './@shell/shell.component'
import { DemoDataComponent } from './demo-data/demo-data.component'
import { DeveloperComponent } from './developer/developer.component'
import { GeneralComponent } from './general/general.component'
import { MailgunComponent } from './modules/integrations/mailgun/mailgun.component'
import { StripeComponent } from './modules/integrations/stripe/stripe.component'
import { ModulesComponent } from './modules/modules.component'
import { CreateProfileComponent } from './profiles/create-profile/create-profile.component'
import { ProfilesComponent } from './profiles/profiles.component'
import { RawViewComponent } from './raw-view/raw-view.component'
import { RemoteComponent } from './remote/remote.component'
import { SettingsRoutes } from './settings.routes'

@NgModule({
  imports: [
    SharedModule,
    AceEditorModule,
    RouterModule.forChild(SettingsRoutes)
  ],
  declarations: [
    ShellComponent,
    GeneralComponent,
    ModulesComponent,
    RemoteComponent,
    RawViewComponent,
    ProfilesComponent,
    CreateProfileComponent,
    DeveloperComponent,
    DemoDataComponent,
    MailgunComponent,
    StripeComponent
  ],
  entryComponents: [
    RawViewComponent,
    CreateProfileComponent
  ]
})
export class SettingsModule { }

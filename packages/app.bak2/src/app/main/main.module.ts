import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { ImportComponent } from '../import/import.component'
import { SetupComponent } from '../setup/setup.component'
import { SetupGuard } from '../setup/setup.guard'
import { MainShellComponent } from './@shell/shell.component'
import { AppbarComponent } from './appbar/appbar.component'
import { ErrorComponent } from './error/error.component'
import { LoginComponent } from './login/login.component'
import { MainGuard } from './main.guard'
import { OfflineComponent } from './offline/offline.component'
import { StatusbarComponent } from './statusbar/statusbar.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    AppbarComponent,
    ErrorComponent,
    MainShellComponent,
    StatusbarComponent,
    LoginComponent,
    SetupComponent,
    ImportComponent,
    OfflineComponent
  ],
  providers: [
    MainGuard,
    SetupGuard
  ],
  exports: [
    ErrorComponent,
    MainShellComponent
  ],
  entryComponents: [
    LoginComponent
  ]
})
export class MainModule { }

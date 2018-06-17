import { NgModule, APP_INITIALIZER } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule, PreloadAllModules, Routes } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MarkdownModule } from 'ngx-md'
import { ToastrModule } from 'ngx-toastr'

import { CommonModule } from '@balnc/common/common.module'
import { CoreModule } from '@balnc/core/core.module'

import { AppComponent } from './app.component'
import { DatabaseService } from '@balnc/common/services/database.service'
import { ConfigService } from '@balnc/common/services/config.service'
import { ProfileService } from '@balnc/core/profile/services/profile.service'
import { ENV } from 'environments/environment'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ENV.isProd ? ServiceWorkerModule.register('ngsw-worker.js') : [],
    ToastrModule.forRoot({
      positionClass: "toast-bottom-center"
    }),
    RouterModule.forRoot([], {
      // enableTracing: true,
      // preloadingStrategy: PreloadAllModules,
    }),
    CommonModule,
    CoreModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DatabaseService,
    ConfigService,
    ProfileService,
    {
      provide: APP_INITIALIZER,
      useFactory: (databaseService: DatabaseService, profileService: ProfileService, configService: ConfigService) => async () => {
        configService.setup()
        profileService.setup()
        const profile = profileService.getCurrent()
        if (profile) {
          configService.profile = profile
          await databaseService.setup(profile)
        }
      },
      deps: [DatabaseService, ProfileService, ConfigService],
      multi: true,
    }
  ],
  // exports: [
  //   CommonModule,
  // ]
})
export class AppModule { }
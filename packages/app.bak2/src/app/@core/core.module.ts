import { CommonModule } from '@angular/common'
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ModalModule } from 'ngx-bootstrap/modal'
import { DateFnsModule } from 'ngx-date-fns'
import { MarkdownModule, MarkedOptions } from 'ngx-markdown'
import { ToastrModule } from 'ngx-toastr'
import environment from 'src/environments/environment'
import { SentryErrorHandler } from './handlers/sentry-error.handler'
import { ConfigService } from './services/config.service'
import { CouchDBService } from './services/couchdb.service'
import { RxDBService } from './services/rxdb.service'
import { UpdateService } from './services/update.service'

@NgModule({
  imports: [
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    DateFnsModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: true,
          smartLists: true,
          smartypants: true
        }
      }
    }),

    ModalModule.forRoot()
  ],
  providers: [
    UpdateService,
    ConfigService,
    RxDBService,
    CouchDBService,
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule')
    }
  }
}

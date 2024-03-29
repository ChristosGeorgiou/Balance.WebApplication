import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { CoreModule } from '@balnc/core'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { Angulartics2Module } from 'angulartics2'
import { AppComponent } from './app.component'
import { APP_ROUTES } from './app.routes'
import { MainModule } from './main/main.module';
import { WebStorageModule } from 'ngx-store';
import { LandingComponent } from './landing/landing.component'

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Angulartics2Module.forRoot({
      pageTracking: {
        clearIds: true
      }
    }),
    RouterModule.forRoot(APP_ROUTES, {
      // enableTracing: true,
      // preloadingStrategy: PreloadAllModules
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CoreModule,
    MainModule,
    WebStorageModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LandingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

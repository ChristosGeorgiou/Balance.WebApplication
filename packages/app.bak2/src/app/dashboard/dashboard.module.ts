import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { DashboardComponent } from './dashboard.component'
import { DASHBOARD_ROUTES } from './dashboard.routes'
import { TileComponent } from './tile/tile.component'

@NgModule({
  imports: [
    SharedModule,
    NgxChartsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [
    DashboardComponent,
    TileComponent
  ],
  providers: []
})
export class DashboardModule { }

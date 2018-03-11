import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DatabaseModule } from '@blnc/core/database/database.module'
import { Entity } from '@blnc/core/database/models/entity';

import { InvoicesItemComponent, InvoicesOverviewComponent, InvoicesReportComponent } from './components'

import { InvoiceSchema } from './data/invoice';
import { CommonModule } from '@blnc/core/common/common.module';

const entities: Entity[] = [{
  name: 'invoice',
  schema: InvoiceSchema,
  sync: true,
}]

const routes: Routes = [
  { path: 'overview', component: InvoicesOverviewComponent },
  { path: 'report/:id', component: InvoicesReportComponent },
  { path: 'report', component: InvoicesReportComponent },
  { path: 'item/:id', component: InvoicesItemComponent },
  { path: '', redirectTo: "report" },
]

@NgModule({
  imports: [
    CommonModule,
    DatabaseModule.forChild(entities),
    RouterModule.forChild(routes),
  ],
  declarations: [
    InvoicesOverviewComponent,
    InvoicesItemComponent,
    InvoicesReportComponent,
  ],
  providers: []
})
export class InvoicesModule { }

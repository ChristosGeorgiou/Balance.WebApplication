import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@balnc/shared';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactComponent } from './contact/contact.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderComponent } from './order/order.component';
import { OverviewComponent } from './overview/overview.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { BusinessResolver } from './_shared/resolver';
import { ContactsService } from './_shared/services/contacts.service';
import { InvoicesService } from './_shared/services/invoices.service';
import { OrdersService } from './_shared/services/orders.service';
import { ShellComponent } from './_shell/shell.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{
      path: '',
      component: ShellComponent,
      resolve: {
        setup: BusinessResolver
      },
      children: [
        { path: 'overview', component: OverviewComponent },
        { path: 'contact/:id', component: ContactComponent },
        { path: 'order/:id', component: OrderComponent },
        { path: 'search', component: SearchComponent },
        { path: 'invoice/:id', component: InvoiceComponent },
        { path: 'settings', component: SettingsComponent },
        { path: '', redirectTo: 'overview', pathMatch: 'full' }
      ]
    }])
  ],
  declarations: [
    ShellComponent,
    ContactComponent,
    SettingsComponent,
    QuickSearchComponent,
    OrderComponent,
    InvoiceComponent,
    SearchComponent,
    OverviewComponent,
    ContactCreateComponent,
    OrderCreateComponent
  ],
  providers: [
    BusinessResolver,
    ContactsService,
    InvoicesService,
    OrdersService
  ],
  entryComponents: [
    QuickSearchComponent,
    ContactCreateComponent,
    OrderCreateComponent
  ]
})
export class BusinessModule { }
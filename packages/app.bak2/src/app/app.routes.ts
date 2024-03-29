import { Routes } from '@angular/router'
import { ImportComponent } from './import/import.component'
import { MainShellComponent } from './main/@shell/shell.component'
import { ErrorComponent } from './main/error/error.component'
import { MainGuard } from './main/main.guard'
import { SetupComponent } from './setup/setup.component'
import { SetupGuard } from './setup/setup.guard'

export const APP_ROUTES: Routes = [
//   {
//   path: '',
//   component: LandingComponent,
// },
  {
    path: '',
    component: MainShellComponent,
    canActivate: [MainGuard],
    children: [
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    // { path: 'contacts', data: { title: 'Contacts' }, loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
    // { path: 'payments', loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule), data: { title: 'Payments' } },
    // { path: 'agreements', loadChildren: () => import('./agreements/agreements.module').then(m => m.AgreementsModule), data: { title: 'Agreements' } },
    // { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), data: { title: 'Orders' } },
    // { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule), data: { title: 'Invoices' } },
    // { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
    // { path: 'files', loadChildren: () => import('./files/files.module').then(m => m.FilesModule), data: { title: 'Files' } },
    // { path: 'notes', loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule), data: { title: 'Notes' } },
    // { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
    // { path: 'presentations', loadChildren: () => import('./presentations/presentations.module').then(m => m.PresentationsModule) },
    { path: 'boards', loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule) },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
{ path: 'setup', canActivate: [SetupGuard], component: SetupComponent },
{ path: 'import', component: ImportComponent },
{ path: 'error', component: ErrorComponent },
{ path: '**', pathMatch: 'full', redirectTo: 'setup' }
]

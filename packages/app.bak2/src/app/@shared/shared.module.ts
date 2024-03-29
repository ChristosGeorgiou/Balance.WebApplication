import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { ModalModule } from 'ngx-bootstrap/modal'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { DateFnsModule } from 'ngx-date-fns'
import { NgxFileHelpersModule } from 'ngx-file-helpers'
import { MarkdownModule } from 'ngx-markdown'
import { WebStorageModule } from 'ngx-store'
import { ToastrModule } from 'ngx-toastr'
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'
import { ContentComponent } from './components/content/content.component'
import { DebugComponent } from './components/debug/debug.component'
import { EmptyComponent } from './components/empty/empty.component'
import { FooterComponent } from './components/footer/footer.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { PageComponent } from './components/page/page.component'
import { RemotePageComponent } from './components/remote-page/remote-page.component'
import { SidemenuButtonComponent } from './components/sidemenu/sidemenu-button.component'
import { SidemenuComponent } from './components/sidemenu/sidemenu.component'
import { SpinnerComponent } from './components/spinner/spinner.component'
import { PaginatePipe } from './components/table/paginate.pipe'
import { SearchPipe } from './components/table/search.pipe'
import { TableComponent } from './components/table/table.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { UndrawComponent } from './components/undraw/undraw.component'
import { DocVersionPipe } from './pipes/doc-version.pipe'
import { EllipsisPipe } from './pipes/ellipsis.pipe'
import { SafePipe } from './pipes/safe.pipe'

@NgModule({
  imports: [
    CommonModule,
    NgxFileHelpersModule,
    FormsModule,
    HttpClientModule,

    ModalModule,
    PopoverModule,

    ReactiveFormsModule,
    RouterModule,
    WebStorageModule,
    ToastrModule,
    // ContenteditableModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    ContentComponent,
    ConfirmDialogComponent,
    PageComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    TableComponent,

    DocVersionPipe,
    EllipsisPipe,
    PaginatePipe,
    SearchPipe,
    SafePipe,

    ToolbarComponent,
    SidemenuComponent,
    SidemenuButtonComponent,
    UndrawComponent,
    RemotePageComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    RouterModule,
    CommonModule,
    NgxFileHelpersModule,
    FormsModule,
    HttpClientModule,

    ReactiveFormsModule,
    ToastrModule,
    DateFnsModule,
    MarkdownModule,

    ModalModule,
    PopoverModule,

    DocVersionPipe,
    EllipsisPipe,
    SearchPipe,
    SafePipe,

    ConfirmDialogComponent,
    ContentComponent,
    PageComponent,
    DebugComponent,
    EmptyComponent,
    FooterComponent,
    SpinnerComponent,
    TableComponent,
    ToolbarComponent,
    SidemenuComponent,
    UndrawComponent,
    RemotePageComponent
  ]
})
export class SharedModule { }

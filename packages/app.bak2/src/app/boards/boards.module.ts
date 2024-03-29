import { NgModule } from '@angular/core'
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot } from '@angular/router'
import { SharedModule } from '@balnc/shared'
import { BOARDS_ROUTES } from './@shared/constants/routes'
import { BoardsRepo } from './@shared/repos/boards.repo'
import { ShellComponent } from './@shell/shell.component'
import { BoardComponent } from './board/board.component'
import { FilesComponent } from './board/files/files.component'
import { ManageComponent } from './board/manage/manage.component'
import { MessageComponent } from './board/timeline/message/message.component'
import { TimelineComponent } from './board/timeline/timeline.component'
import { SettingsComponent } from './settings/settings.component'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BOARDS_ROUTES)
  ],
  declarations: [
    ShellComponent,
    BoardComponent,
    SettingsComponent,
    TimelineComponent,
    MessageComponent,
    ManageComponent,
    FilesComponent
  ],
  providers: [
    {
      provide: 'boardNameResolver',
      useFactory: (repo: BoardsRepo) => (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        repo.one(route.paramMap.get('id')).then(x => x.name),
      deps: [BoardsRepo]
    }
  ]
})
export class BoardsModule { }

import { ShellComponent } from '../../@shell/shell.component'
import { BoardComponent } from '../../board/board.component'
import { FilesComponent } from '../../board/files/files.component'
import { ManageComponent } from '../../board/manage/manage.component'
import { TimelineComponent } from '../../board/timeline/timeline.component'

export const BOARDS_ROUTES = [{
  path: '',
  component: ShellComponent,
  data: {
    title: 'boards'
  },
  children: [
    {
      path: ':id',
      component: BoardComponent,
      resolve: {
        title: 'boardNameResolver'
      },
      children: [{
        path: 'timeline',
        component: TimelineComponent,
        data: {
          title: 'timeline'
        }
      }, {
        path: 'manage',
        component: ManageComponent,
        data: {
          title: 'manage'
        }
      }, {
        path: 'files',
        component: FilesComponent,
        data: {
          title: 'files'
        }
      }, {
        path: '',
        redirectTo: 'timeline',
        pathMatch: 'full'
      }]
    }
  ]
}]

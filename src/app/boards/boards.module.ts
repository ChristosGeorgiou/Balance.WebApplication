import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@balnc/shared'

import { BoardsService } from './boards.service'
import { WrapperComponent } from './components/_wrapper/wrapper.component'
import { BoardComponent } from './components/board/board.component'
import { BoardsRoutes } from './boards.routes'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(BoardsRoutes)
  ],
  declarations: [
    WrapperComponent,
    BoardComponent
  ],
  providers: [
    BoardsService
  ]
})
export class BoardsModule { }

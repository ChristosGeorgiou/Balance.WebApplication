import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { LocalStorage } from 'ngx-store'
import { Board } from '../models/board'
import { BoardStats } from '../models/board-stats'

@Injectable({
  providedIn: 'root'
})
export class BoardsRepo extends Repository<Board> {

  @LocalStorage() boardsStats: BoardStats[] = []

  selectedBoard: string
  selected: string

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.board'
  }
}

import { Component, NgZone, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { Helpers, MenuItem } from '@balnc/shared'
import { combineLatest, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { BoardStats } from '../@shared/models/board-stats'
import { BUser } from '../@shared/models/buser'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { BUsersRepo } from '../@shared/repos/buser.repo'
import { MessagesRepo } from '../@shared/repos/messages.repo'

@Component({
  selector: 'app-boards-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']

})
export class ShellComponent implements OnInit {

  boardsStats: BoardStats[]
  unread = {}
  menu: MenuItem[] = [{
    label: 'Create Board',
    type: 'button',
    highlight: true,
    icon: 'plus-circle',
    action: () => {
      return this.create()
    }
  }]
  boards$: Observable<MenuItem[]>

  constructor (
    private boardsRepo: BoardsRepo,
    private router: Router,
    private configService: ConfigService,
    private messageRepo: MessagesRepo,
    private buserRepo: BUsersRepo,
    private zone: NgZone

  ) { }

  ngOnInit () {
    const boards$ = this.boardsRepo.allm$().pipe(
      tap((boards) => boards.sort((a, b) => a.name > b.name ? 1 : -1))
    )

    const messages$ = this.messageRepo.allm$().pipe(
      map((messages) => {
        messages.sort((a, b) => a.date - b.date)
        return messages.reduce((l, i) => {
          if (!l[i.group]) l[i.group] = []
          l[i.group].unshift(i)
          return l
        }, {})
      })
    )

    const lastRead$ = this.buserRepo.allm$({ group: this.configService.userId }).pipe(
      map((busers: BUser[]) => {
        return busers.reduce((l, i) => {
          l[i.board] = i.lastread
          return l
        }, {})
      })
    )

    this.boards$ = combineLatest(
      [boards$, messages$, lastRead$]
    ).pipe(
      map(x => x[0].map(board => {
        const messages = x[1][board.id] ?? []
        const lastread = x[2][board.id] ?? 0
        const unread = messages
          .filter(m =>
            m.date > lastread &&
            m.sender !== this.configService.userId).length
        return {
          label: board.name,
          sublabel: messages[0]?.text ?? '...',
          route: ['/boards', board.id],
          type: 'button',
          note: (unread > 0) ? ((unread > 99) ? '99+' : unread) : '',
          noteColor: board.color
        } as MenuItem
      })
      ),
      tap(() => {
        this.zone.run(() => { })
      })

    )
  }

  async create () {
    console.log('create board')
    const board = await this.boardsRepo.add({
      name: Helpers.generateName(),
      creator: this.configService.userId
    })
    await this.router.navigate(['/boards', board.id])
  }
}

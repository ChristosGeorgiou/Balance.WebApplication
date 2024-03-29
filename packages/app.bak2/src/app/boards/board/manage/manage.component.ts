import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { COLORS } from '@balnc/shared'
import { Board } from '../../@shared/models/board'
import { BoardsRepo } from '../../@shared/repos/boards.repo'
import { MessagesRepo } from '../../@shared/repos/messages.repo'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  board: Board
  colors = COLORS
  colorsMap

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo
  ) {
    this.colorsMap = Object.keys(COLORS).reduce((l, i) => {
      l.push({ basic: i, variations: Object.keys(COLORS[i]) })
      return l
    }, [])
  }

  ngOnInit () {
    this.route.parent.params.subscribe(async (params) => {
      this.board = await this.boardsRepo.one(params['id'])
    })
  }

  async save () {
    await this.boardsRepo.update(this.board.id, {
      name: this.board.name,
      color: this.board.color
    })
  }

  async deleteBoard () {
    if (!confirm('Are you sure? All message will be deleted')) return
    await this.boardsRepo.remove(this.board.id)

    const messages = await this.messagesRepo.all({ group: this.board.id })
    const ps = messages.map(m => this.messagesRepo.remove(m.id))
    await Promise.all(ps)

    await this.router.navigateByUrl('/boards')
  }
}

import { Injectable, Injector } from '@angular/core'
import { ConfigService, Repository } from '@balnc/core'
import { BUser } from '../models/buser'
import { MessagesRepo } from './messages.repo'

@Injectable({
  providedIn: 'root'
})
export class BUsersRepo extends Repository<BUser> {

  interv

  constructor (
    private messagesRepo: MessagesRepo,
    private configService: ConfigService,
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.buser'
  }

  async join (board) {
    const busers = await this.all({
      group: this.configService.userId
    })
    const buser = busers.find(bu => bu.board === board)

    if (buser) {
      buser.lastread = Date.now()
      await this.update(buser.id, buser)
    } else {
      const newbuser: Partial<BUser> = {
        board,
        lastread: Date.now()
      }
      await this.add(newbuser, this.configService.userId)
      await this.messagesRepo.add({
        text: `User ${this.configService.user.username} has joined`,
        type: 'EVENT'
      }, board)
    }
  }

  async leave (board) {
    const busers = await this.all({
      group: this.configService.userId
    })
    const buser = busers.find(bu => bu.board === board)

    if (buser) {
      buser.lastread = Date.now()
      await this.update(buser.id, buser)
    }
  }
}

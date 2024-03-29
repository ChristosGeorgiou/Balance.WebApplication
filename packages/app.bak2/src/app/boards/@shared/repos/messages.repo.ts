import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Message } from '../models/message'

@Injectable({
  providedIn: 'root'
})
export class MessagesRepo extends Repository<Message> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'boards.message'
  }
}

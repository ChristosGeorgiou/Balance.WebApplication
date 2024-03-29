import { Injectable, Injector } from '@angular/core'
import { User } from '../models/user'
import { Repository } from '../services/repository'

@Injectable({
  providedIn: 'root'
})
export class UsersRepo extends Repository<User> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'core.user'
  }
}

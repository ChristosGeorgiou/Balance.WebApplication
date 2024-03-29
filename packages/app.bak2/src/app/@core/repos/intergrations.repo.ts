import { Injectable, Injector } from '@angular/core'
import { Integration } from '../models/integration'
import { Repository } from '../services/repository'

@Injectable({
  providedIn: 'root'
})
export class IntegrationsRepo extends Repository<Integration> {

  constructor (
    injector: Injector
  ) {
    super(injector)
    this.entity = 'core.integration'
  }
}

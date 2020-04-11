
import { Injectable, Injector } from '@angular/core'
import { Repository } from '@balnc/core'
import { Helpers } from '@balnc/shared'
import { CEventsRepo } from '../../contacts/@shared/cevents.repo'
import { CEventType } from '../../contacts/@shared/contacts'
import { Agreement } from './agreement'

@Injectable({
  providedIn: 'root'
})
export class AgreementsRepo extends Repository<Agreement> {

  constructor (
    private ceventsService: CEventsRepo,
    injector: Injector
  ) {
    super(injector)
    this.entity = 'agreement'
  }

  async add (data: Partial<Agreement>, group?: string, ts?: number): Promise<Agreement> {
    data.serial = Helpers.uid()
    const agreement = await super.add(data, group, ts)
    await this.ceventsService.add({
      contact: agreement.contact,
      type: CEventType.AgreementCreated,
      comment: `new agreement #${agreement.serial}`,
      reference: `/agreements/${agreement._id}`
    }, agreement.contact, ts)
    return agreement
  }

}
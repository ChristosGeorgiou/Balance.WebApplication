import { Component, OnInit } from '@angular/core'
import { TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Contact } from '../../contacts/@shared/contacts'
import { ContactsRepo } from '../../contacts/@shared/contacts.repo'
import { Agreement } from '../@shared/agreement'
import { AgreementsRepo } from '../@shared/agreements.repo'

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html'
})
export class AgreementsComponent implements OnInit {
  agreements$: Observable<Agreement[]>
  contacts: Contact[]

  schema: TableSchema = {
    name: 'agreements',
    properties: [
      {
        label: 'Id', style: { width: '250px' }, locked: true, type: 'link', val: (item: Agreement) => {
          return {
            label: item._id,
            link: ['/agreements', item._id]
          }
        }
      },
      { label: 'Date', style: { width: '160px' }, type: 'date', val: (item: Agreement) => { return item._date } },
      {
        label: 'Contact', type: 'link', val: (item: Agreement) => {
          const c = this.contacts.find(c => c._id === item.contact)
          return {
            label: c.name,
            link: ['/contacts', item.contact]
          }
        }
      }
    ]
  }

  constructor (
    private agreementsService: AgreementsRepo,
    private contactsService: ContactsRepo
  ) { }

  async ngOnInit () {
    this.agreements$ = this.agreementsService.all$()
    this.contacts = await this.contactsService.all()
  }
}
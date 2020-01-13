import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Helpers, TableSchema } from '@balnc/shared'
import { Observable } from 'rxjs'
import { Account, AccountType, AccountTypeBadges } from '../../@shared/models/account'
import { AccountsRepo } from '../../@shared/repos/accounts.repo'
import { RecordsRepo } from '../../@shared/repos/records.repo'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'

})
export class AccountsComponent implements OnInit {

  schema: TableSchema = {
    name: 'accounts',
    properties: [
      {
        label: 'Name', type: 'link', locked: true, val: (item: Account) => {
          return {
            label: item.name || '{unamed account}',
            link: ['/business/accounts', item._id]
          }
        }
      },
      { label: 'Type', style: { width: '100px' }, type: 'badge', badges: AccountTypeBadges, val: (item: Account) => AccountType[item.type] },
      {
        label: 'Amount', style: { width: '140px', 'text-align': 'right' }, type: 'currency', locked: true,
        val: (item: Account) => this.totals[item._id] ? this.totals[item._id].amount : 0
      }, {
        label: 'Amount', style: { width: '140px', 'text-align': 'right' }, type: 'currency', locked: true,
        val: (item: Account) => this.totals[item._id] ? this.totals[item._id].records : 0
      }
    ]
  }

  accounts$: Observable<Account[]> = new Observable<Account[]>()
  totals: { [key: string]: { amount: number, records: number } } = {}

  constructor (
    private accountsRepo: AccountsRepo,
    private recordsRepo: RecordsRepo,
    private router: Router
  ) { }

  async ngOnInit () {
    this.accounts$ = this.accountsRepo.all$().pipe()

    const records = await this.recordsRepo.all()

    this.totals = records.reduce((m, d) => {
      if (!m[d.account]) {
        m[d.account] = { amount: 0, records: 0 }
      }
      m[d.account].amount += d.amount
      m[d.account].records += 1
      return m
    }, {})
  }

  async createAccount () {
    const account = await this.accountsRepo.add({ name: `Account #${Helpers.uid()}` })
    await this.router.navigate(['/business/accounts', account._id])
  }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'
import { Account } from '../../_shared/models/account'
import { AccountsRepo } from '../../_shared/repos/accounts.repo'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  host: { 'class': 'page' }
})
export class AccountComponent implements OnInit {

  account$: Observable<Account> = new Observable<Account>()
  constructor (
    private accountsRepo: AccountsRepo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit () {
    this.account$ = this.route.params.pipe(
      mergeMap(params => this.accountsRepo.one$(params.id)),
      tap(async (account) => {
        if (!account) {
          await this.router.navigate([`/business/contacts`])
        }
      })
    )
  }

}
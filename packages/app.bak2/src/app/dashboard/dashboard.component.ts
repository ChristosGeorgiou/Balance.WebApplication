import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { CalendarEvent } from 'angular-calendar'
// import * as faker from 'faker'
import { Observable } from 'rxjs'
// import { ContactsRepo } from '../contacts/@shared/contacts.repo'
@Component({
  selector: 'app-core-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menu: any
  workspace: any

  data = {
    customers: [{ name: 'customers', value: 55403 }]
  }
  contacts$: Observable<number>

  calEvents: CalendarEvent[] = []
  currentDate = new Date()
  colors = [
    { label: 'black', color: '#000' },
    { label: 'blue', color: '#158cba' },
    { label: 'indigo', color: '#6610f2' },
    { label: 'purple', color: '#6f42c1' },
    { label: 'pink', color: '#e83e8c' },
    { label: 'red', color: '#ff4136' },
    { label: 'orange', color: '#fd7e14' },
    { label: 'yellow', color: '#ff851b' },
    { label: 'green', color: '#28b62c' },
    { label: 'teal', color: '#20c997' },
    { label: 'cyan', color: '#75caeb' }
  ]
  constructor (
    private configService: ConfigService,
    // private contactsRepo: ContactsRepo,
    private router: Router
  ) { }

  ngOnInit () {
    this.workspace = this.configService.workspace
    // this.contacts$ = this.contactsRepo.all$().pipe(
    //   map(contacts => contacts.length)
    // )

    // for (let i = 0; i < 100; i++) {
    //   const color = this.colors[faker.random.number(this.colors.length - 1)].color
    //   this.calEvents.push({
    //     start: faker.date.between(new Date(), new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
    //     title: faker.hacker.phrase(),
    //     color: { primary: color, secondary: '#FFF' }
    //   })
    //   this.calEvents.sort((a, b) => a.start.getTime() - b.start.getTime())
    // }
  }
}

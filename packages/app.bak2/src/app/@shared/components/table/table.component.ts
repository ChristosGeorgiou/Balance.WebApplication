import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { LocalStorage } from 'ngx-store'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { TableSchema } from './table-schema'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() schema: TableSchema
  @Input() data$: Observable<any[]> = new Observable<any[]>()
  @Input() debug: any
  @Input() templates: { [key: string]: ElementRef }

  @ViewChild('wrapper') wrapper: ElementRef
  @ViewChild('tableWrapper') tableWrapper: ElementRef

  showDebug = false
  page = 0
  totalPages: number[]
  pages: number[]

  limit = null
  properties: any

  headerHeight = 50
  footerHeight = 52
  rowHeight = 50

  @LocalStorage('table_settings') settings: any = {}
  emitted: any

  dataSub: Subscription
  total: number
  sort: any
  direction: 'asc' | 'desc' = 'asc'

  dataview: any[]
  data: any[]

  constructor (
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit (): void {
    this.updateSettings()

    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(200)
        )
        .subscribe(() => {
          this.zone.run(() => {
            this.calcPages()
            this.cd.markForCheck()
          })
        })
    })
  }

  ngAfterViewInit (): void {
    if (this.data$) {
      this.dataSub = this.data$
        .subscribe((data) => {
          this.data = data
          this.total = data.length
          this.calcPages()
          this.cd.markForCheck()
        })
    }
  }

  ngOnDestroy () {
    if (this.dataSub) {
      this.dataSub.unsubscribe()
    }
  }

  updateSettings () {
    this.settings[this.schema.name] = this.settings[this.schema.name] || { visible: {} }
    this.schema.properties.forEach((p, i) => {
      this.settings[this.schema.name].visible[i] = this.settings[this.schema.name].visible[i] || !p.hidden
    })
    this.settings.save()
    this.properties = this.schema.properties.filter((p, i) => this.settings[this.schema.name].visible[i])

    if (this.schema.sort) {
      this.sort = this.schema.properties.find(p => p.label === this.schema.sort)
    }
  }

  setSort (prop) {
    if (this.sort !== prop) {
      this.sort = prop
      this.direction = 'asc'
    } else {
      this.direction = (this.direction === 'asc') ? 'desc' : 'asc'
    }
  }

  switch (page) {
    this.page = page
    this.movePageWindow()
  }

  previous () {
    if (this.page > 0) {
      this.page -= 1
      this.movePageWindow()
    }
  }

  next () {
    if (this.page < this.totalPages.length - 1) {
      this.page += 1
      this.movePageWindow()
    }
  }

  first () {
    this.page = 0
    this.movePageWindow()
  }

  last () {
    this.page = this.totalPages.length - 1
    this.movePageWindow()
  }

  getBadge (prop, item) {
    let defaultBadge = {
      label: 'Unknown',
      class: 'default',
      style: {
        'background-color': '#DDD',
        color: '#000'
      }
    }
    if (!prop.badges) {
      return defaultBadge
    }
    const v = prop.val(item)
    const b = prop.badges.find(x => x.key === v)
    if (!b) {
      return defaultBadge
    }
    return { ...defaultBadge, ...b }
  }

  private calcPages () {
    let tableHeight = this.wrapper.nativeElement.offsetHeight

    this.tableWrapper.nativeElement.scrollTop = 0
    this.limit = Math.floor((tableHeight - this.headerHeight - this.footerHeight) / this.rowHeight)

    if (this.limit < 1) return

    let pages = Math.floor(this.total / this.limit)
    pages += (this.total % this.limit > 0) ? 1 : 0
    this.totalPages = Array.from(Array(pages), (x, index) => index)
    if (this.page >= pages && pages) this.page = pages - 1

    this.movePageWindow()
  }

  private movePageWindow () {
    if (this.totalPages.length <= 5) {
      this.pages = this.totalPages
    } else if (this.page <= 2) {
      this.pages = [0, 1, 2, 3, 4]
    } else if (this.page >= this.totalPages.length - 3) {
      this.pages = [
        this.totalPages.length - 5,
        this.totalPages.length - 4,
        this.totalPages.length - 3,
        this.totalPages.length - 2,
        this.totalPages.length - 1
      ]
    } else {
      this.pages = [
        this.page - 2,
        this.page - 1,
        this.page,
        this.page + 1,
        this.page + 2
      ]
    }
  }
}

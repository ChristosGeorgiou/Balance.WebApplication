import { Pipe, PipeTransform } from '@angular/core'
import { RepositoryHelpers } from '@balnc/core'
import { TableProperty } from './table-schema'

@Pipe({ name: 'paginate' })
export class PaginatePipe implements PipeTransform {
  transform (data: any[], page: number, limit: number, sortProp: TableProperty, direction: 'asc' | 'desc') {
    if (sortProp && sortProp.val) {
      data.sort((a, b) => {
        let vala = sortProp.d(a)
        let valb = sortProp.d(b)
        let tvala = ''
        let tvalb = ''
        switch (sortProp.type) {
          case 'link':
            tvala = vala.label
            tvalb = valb.label
            break
          default:
            tvala = vala
            tvalb = valb
            break
        }

        if (direction === 'asc') {
          return (vala > valb) ? 1 : ((valb > vala) ? -1 : 0)
        } else if (direction === 'desc') {
          return (vala < valb) ? 1 : ((valb < vala) ? -1 : 0)
        }

      })
    }
    return data.slice(page * limit, page * limit + limit).map((d) => RepositoryHelpers.mapEntity(d))
  }
}

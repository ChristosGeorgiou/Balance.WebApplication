import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform (data: any[], properties: string[], term: string) {
    if (!term) return data
    return data
      .filter(d => d[properties[0]]
        .toUpperCase()
        .startsWith(term
          .toUpperCase()))
  }
}

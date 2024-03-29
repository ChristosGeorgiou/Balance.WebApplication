import { Pipe, PipeTransform } from '@angular/core'
import { RxDocumentBase } from 'rxdb'

@Pipe({ name: 'docVersion' })
export class DocVersionPipe implements PipeTransform {
  transform (val: RxDocumentBase<any> & any, args) {
    return val._rev.split('-')[0]
  }
}

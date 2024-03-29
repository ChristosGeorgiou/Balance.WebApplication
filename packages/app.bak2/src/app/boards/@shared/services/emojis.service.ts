import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Emoji } from '../models/emoji'

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

  emojis: { items: Emoji[], label: string }[]

  constructor (
    http: HttpClient
  ) {
    http.get<Emoji[]>('/assets/emojis.json').subscribe((emojis) => {
      this.emojis = emojis.reduce((l, i) => {
        let group = l.find(x => x.label === i.group)
        if (!group) {
          group = { items: [], label: i.group }
          l.push(group)
        }
        group.items.push(i)
        return l
      }, [])
    })
  }
}

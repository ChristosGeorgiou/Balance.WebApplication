import { HttpClient, HttpParams } from '@angular/common/http'
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ConfigService } from '@balnc/core'
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap'
import { Observable, Subject, Subscription } from 'rxjs'
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators'
import { Board } from '../@shared/models/board'
import { Message, OgMetadata } from '../@shared/models/message'
import { BoardsRepo } from '../@shared/repos/boards.repo'
import { MessagesRepo } from '../@shared/repos/messages.repo'
import { Emoji, EmojisService } from './../@shared/services/emojis.service'

const urlRegex = /(https?:\/\/[^\s]+)/g

@Component({
  selector: 'app-boards-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']

})
export class BoardComponent implements OnInit, OnDestroy {

  @ViewChild('messageList') messageList: ElementRef
  @ViewChild('messageInput') messageInput: ElementRef
  @ViewChild('fileupload') fileupload: ElementRef
  @ViewChild('giphyP') giphyP: NgbPopover
  @ViewChild('emojiP') emojiP: NgbPopover

  selected: string

  messages$: Observable<Message[]>
  filteredMessages$: Subject<Message[]>

  board$: Observable<Board>
  previews: {
    [key: string]: {
      base64?: string,
      file?: any,
      blob?: Blob
    }
  } = {}
  sub: Subscription

  emojiGroupSelect = 0

  giphyResults = []

  get nickname () {
    return this.configService.workspace.nickname
  }

  get emojis () {
    return this.emojisService.emojis
  }

  constructor (
    private configService: ConfigService,
    private boardsRepo: BoardsRepo,
    private messagesRepo: MessagesRepo,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private emojisService: EmojisService,
    private zone: NgZone
  ) { }

  ngOnInit () {
    this.route.params.subscribe(async (params) => {
      this.selected = params['id']
      if (!this.selected) return
      this.boardsRepo.selected = this.selected
      this.board$ = this.boardsRepo.one$(this.selected)
      this.messages$ = this.messagesRepo
        .allm$({ group: this.selected })
        .pipe(
          mergeMap(async (messages) => {
            messages.sort((a, b) => a._date - b._date)
            const ps = messages.map(async (msg, i) => {
              if (!this.previews[msg._id]) {
                this.previews[msg._id] = {}
              }
              if (msg.file && !this.previews[msg._id].file) {
                this.previews[msg._id].file = await this.messagesRepo.getAttachment(msg._id, msg.file)
                if (this.previews[msg._id].file) {
                  this.previews[msg._id].blob = await this.previews[msg._id].file.getData()
                  if (this.previews[msg._id].file.type.startsWith('image/')) {
                    this.previews[msg._id].base64 = await this.getImage(this.previews[msg._id].blob, this.previews[msg._id].file.type)
                  }
                }
              }
              if (msg.text) {
                msg.text = msg.text.replace(urlRegex, (url) => `<a target="_blank" href="${url}">${url}</a>`)
              }
            })
            await Promise.all(ps)
            console.log(messages)
            return messages
          })
        )

      this.sub = this.messages$.subscribe(() => {
        setTimeout(() => {
          this.cdr.detectChanges()
          this.scrollToBottom()
          this.focusInput()
        }, 100)
      })
    })
  }

  ngOnDestroy () {
    this.sub.unsubscribe()
  }

  addEmoji (event, e: Emoji) {
    event.preventDefault()
    this.messageInput.nativeElement.value += `${e.char} `
    this.messageInput.nativeElement.focus()
    this.emojiP.close()
  }

  // selectBoard(boardId) {
  // const bs1 = this.boardsStats.find(x => x.id === boardId)
  //   if (!bs1) {
  //     bs1 = {
  //       id: boardId,
  //       lastread: 0,
  //       unread: 0
  //     }
  //     this.boardsStats.push(bs1)
  //   }
  //   bs1.unread = 0
  //   bs1.lastread = Date.now()
  //   this.selectedBoard = boardId
  // }

  async pinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: true
    })
  }

  async unpinBoard () {
    await this.boardsRepo.update(this.selected, {
      pinned: false
    })
  }

  async archiveBoard () {
    // todo
  }

  async unarchiveBoard () {
    // todo
  }

  async deleteBoard () {
    if (!confirm('Are you sure? All message will be deleted')) return
    await this.boardsRepo.remove(this.selected)

    const messages = await this.messagesRepo.all({ group: this.selected })
    const ps = messages.map(m => this.messagesRepo.remove(m._id))
    await Promise.all(ps)

    await this.router.navigateByUrl('/boards')
  }

  async send () {
    if (!this.messageInput.nativeElement.value) { return }

    const data = {
      text: this.messageInput.nativeElement.value,
      sender: this.nickname,
      status: 'SEND',
      type: 'MESSAGE'
    }

    const message = await this.messagesRepo.add(data, this.selected)

    this.messageInput.nativeElement.value = null
    const urls = data.text.match(urlRegex)
    if (urls && this.configService.workspace.server?.type) {
      const params = new HttpParams().set('q', urls[0])
      const res = await this.http
        .get<{ data: OgMetadata }>(`${this.configService.workspace.server.host}/og`, { params })
        .toPromise()
      message.metadata = res.data
      await this.messagesRepo.update(message._id, message)
    }
  }

  async attach () {
    this.fileupload.nativeElement.click()
  }

  async upload (file: File) {
    const data: Partial<Message> = {
      text: null,
      sender: this.nickname,
      status: 'SEND',
      type: 'MESSAGE',
      file: file.name
    }
    const msg = await this.messagesRepo.add(data, this.selected)
    await this.messagesRepo.upload(msg._id, file)
  }

  async download (msg: Message) {
    const attachment = await this.messagesRepo.getAttachment(msg._id, msg.file)
    if (!attachment) return
    const blob = await attachment.getData()
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = window.URL.createObjectURL(blob)
    a.download = msg.file
    a.click()
    window.URL.revokeObjectURL(a.href)

    // window['saveAs'](blob, msg.file)
  }

  getImage (blob: Blob, type: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => {
          const result = reader.result as string
          const base64 = result.split(',')[1]
          const src = 'data:' + type + ';base64,' + base64
          resolve(src)
        }
        reader.readAsDataURL(blob)
      } catch (err) {
        reject()
      }
    })
  }

  async delete () {
    if (!confirm('Are you sure?')) return
    await this.boardsRepo.remove(this.selected)
    await this.router.navigate(['/boards'])
  }

  async toggleMark (id: string) {
    await this.boardsRepo.mark(id)
  }

  scrollToBottom (): void {
    if (this.messageList) {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight
    }
  }

  focusInput (): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus()
    }
  }

  giphySearch$

  async giphyAdd (event, giphy) {
    event.preventDefault()
    const data: Partial<Message> = {
      sender: this.nickname,
      status: 'SEND',
      type: 'MESSAGE',
      image: {
        alt: giphy.title,
        url: giphy.images.original.url,
        width: giphy.images.original.width,
        height: giphy.images.original.height
      }
    }
    await this.messagesRepo.add(data, this.selected)
    this.messageInput.nativeElement.focus()
    this.giphyP.close()
  }

  giphySearch (event) {
    if (!this.giphySearch$) {
      this.giphySearch$ = new Observable()
        .pipe(debounceTime(300)) // wait 300ms after the last event before emitting last event
        .pipe(distinctUntilChanged()) // only emit if value is different from previous value
        .subscribe(async (q) => {
          const apiKey = 'bDXpdRko9snSlf2EfHSWcB7gZ8XsYVMz'
          const resp = await this.http.get<any>(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=0&rating=R&lang=en`).toPromise()
          this.zone.run(() => {
            this.giphyResults = resp.data
          })
        })
    }
    this.giphySearch$.next(event.target.value)
  }
}

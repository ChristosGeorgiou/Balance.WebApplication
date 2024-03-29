import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-remote-page',
  template: '<markdown [src]="url"></markdown>',
  styleUrls: ['./remote-page.component.scss']
})
export class RemotePageComponent implements OnInit {

  @Input() page: string

  url: string

  ngOnInit () {
    this.url = `/assets/docs/${this.page}.md`
  }

}

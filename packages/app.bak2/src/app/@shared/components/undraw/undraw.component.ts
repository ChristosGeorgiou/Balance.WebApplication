import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-undraw',
  templateUrl: './undraw.component.html',
  styleUrls: ['./undraw.component.scss']
})
export class UndrawComponent implements OnInit {

  @Input() image: string
  url: string

  constructor () { }

  ngOnInit (): void {
    this.url = `/assets/images/${this.image}.svg`
  }

}

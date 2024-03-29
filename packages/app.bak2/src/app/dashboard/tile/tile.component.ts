import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() label: string
  @Input() icon: string = 'fas fa-balance-scale-right'
  @Input() value: any = 0
  @Input() theme: string

  constructor() {
    // todo
  }

  ngOnInit() {
    // todo
  }

}

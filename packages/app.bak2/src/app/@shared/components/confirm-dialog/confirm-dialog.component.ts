import { Component } from '@angular/core'
import { BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  constructor (
    public activeModal: BsModalService
  ) {}
}

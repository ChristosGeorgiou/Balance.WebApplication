import { Component } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials

  get activeModal () {
    return this.modal
  }

  constructor (
    private modal: BsModalRef
  ) { }

  submit (username, password) {
    this.credentials = { username, password }
    this.modal.hide()
  }

}

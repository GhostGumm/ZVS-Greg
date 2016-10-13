import { Component, OnInit, Input } from '@angular/core'
import { User } from '../../../services/'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: User[]

  constructor() {
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users
    })
  }
}

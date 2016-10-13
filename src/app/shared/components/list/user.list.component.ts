import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() users: any[] // User[]

  constructor() {
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users
    })
    // this.users.forEach((user) => user.message = 'coucou')
  }
}

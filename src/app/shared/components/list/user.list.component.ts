import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input } from '@angular/core'
// import { User } from '../../../services/'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() users: any[]
  subscriptions: Array<Subscription> = []

  constructor() {
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users
    })
  }
  ngAfterViewInit() {
    console.debug('UserListComponent::ngAfterViewInit')
  }
  ngOnChanges(event) {
    console.debug('UserListComponent::ngOnChanges', {
      users: this.users,
      event
    })
    if (event.users.currentValue) {
      for (let user of this.users) {
        console.debug('', user)
        user.message = 'coucou'
      }
    }
  }
  ngOnDestroy() {
    console.debug('UserListComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

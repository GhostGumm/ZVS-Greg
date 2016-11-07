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
  @Input() link: string
  subscriptions: Array<Subscription> = []

  constructor() {
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users,
      link:this.link
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
    // Mock Purpose
    if (event.users.currentValue) {
      for (let user of this.users) {
        user.message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error temporibus quaerat repellendus incidunt recusandae aut quia ullam reprehenderit iure.'
        user.link = this.link ? `${this.link}${user.id}` : ''
      }
    }
    //
  }
  ngOnDestroy() {
    console.debug('UserListComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, ChangeDetectionStrategy } from '@angular/core'
// import { User } from '../../../services/'
import { OrderBy } from '../../../utils/'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() users: any[]
  @Input() link: string
  @Input() lastMessage: boolean = false
  @Input() zpTitle: string
  
  subscriptions: Array<Subscription> = []
  options: any = {
    icons: {
      expand: 'add',
      reduce: 'remove'
    },
    limit: 5
  }
  isExpanded: boolean = false

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
      OrderBy(this.users, 'online')
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

  toggleList() {
    this.isExpanded = !this.isExpanded
    this.isExpanded ? this.options.limit = -1 : this.options.limit = 5
  }
}

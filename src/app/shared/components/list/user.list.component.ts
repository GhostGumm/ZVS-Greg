import {
  Component, AfterViewInit, OnInit, OnDestroy, OnChanges, Input,
  Output, EventEmitter, ContentChild, TemplateRef, trigger
} from '@angular/core'

import { UserInterface } from '../../../services/user'
import { OrderBy, Animations } from '../../../utils/'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
  animations: [
    trigger('listAnimation', Animations.fadeInHeight),
    trigger('loadingAnimation', Animations.fadeIn)
  ]

})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef) templateUserAction
  @Input() users: UserInterface[]
  @Input() link: string
  @Input() lastMessage: boolean = false
  @Input() loading: boolean
  @Output() userClickedEmitter = new EventEmitter()

  subscriptions: Array<Subscription> = []
  isExpanded: boolean = false

  constructor() {
    console.debug('UserListComponent::constructor', this)
  }

    // Custom Track By
  trackById(index: number, user: UserInterface) {
    return user.id
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users,
      link:this.link
    })
  }
  ngAfterViewInit() {
    console.debug('UserListComponent::ngAfterViewInit', { loading: this.loading })
  }
  ngOnChanges(event) {
    // Mock Purpose
    if (event.users.currentValue) {
      OrderBy(this.users, 'online')
      for (let user of this.users) {
        user.metadata = Object.assign(user.metadata, {
          link: this.link ? `${this.link}${user.id}` : ''
        })
      }
    }
    //
    console.debug('UserListComponent::ngOnChanges', {
      users: this.users,
      event,
      loading: this.loading
    })
  }
  ngOnDestroy() {
    console.debug('UserListComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onUserClicked(user) {
    this.userClickedEmitter.emit({ value: user })
  }
}

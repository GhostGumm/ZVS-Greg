import {
  Component, AfterViewInit, OnInit, OnDestroy, OnChanges, Input,
  Output, EventEmitter, ContentChild, TemplateRef, trigger
} from '@angular/core'

import { UserInterface } from '../../../services/user'
import { OrderBy } from '../../../utils/'
import { fadeIn, fadeInHeight } from '../../../utils/utils.animation'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listAnimation', fadeInHeight),
    trigger('loadingAnimation', fadeIn)
  ]

})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private static ComponentInstance: number = 0
  @ContentChild(TemplateRef) templateUserAction
  @Input() users: UserInterface[]
  @Input() link: string
  @Input() lastMessage: boolean = false
  @Input() unreadMessage: boolean = false
  @Input() loading: boolean
  @Input() withShadow: boolean = false
  @Output() userClickedEmitter = new EventEmitter()

  subscriptions: Array<Subscription> = []
  isExpanded: boolean = false

  constructor() {
    UserListComponent.ComponentInstance++
    console.debug('UserListComponent::constructor', {
      instance: UserListComponent.ComponentInstance
    })
  }

    // Custom Track By
  trackById(index: number, user: UserInterface) {
    return user.id
  }

  ngOnInit() {
    console.debug('UserListComponent::ngOnInit', {
      users: this.users,
      link: this.link
    })
  }
  ngAfterViewInit() {
    console.debug('UserListComponent::ngAfterViewInit', { loading: this.loading })
  }
  ngOnChanges(event) {
    console.debug('UserListComponent::ngOnChanges', {
      users: this.users,
      event,
      loading: this.loading
    })
    // Mock Purpose
    if (event.users.currentValue) {
      OrderBy(this.users, 'online')
    }
    //
  }
  ngOnDestroy() {
    console.debug('UserListComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  onUserClicked(user) {
    this.userClickedEmitter.emit({ value: user })
  }
}

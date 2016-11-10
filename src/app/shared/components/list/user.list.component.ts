
import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, ContentChild, TemplateRef, trigger, ChangeDetectionStrategy } from '@angular/core'
import { UserInterface } from '../../../services/'
import { OrderBy, Animations } from '../../../utils/'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'zp-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
  animations: [
    trigger('loadingAnimation', Animations.fadeIn())
  ]
  
})
export class UserListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ContentChild(TemplateRef) templateUserAction;
  @Input() users: UserInterface[]
  @Input() link: string
  @Input() lastMessage: boolean = false
  
  subscriptions: Array<Subscription> = []
  loading: boolean = true
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
        user.metadata = {
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error temporibus quaerat repellendus incidunt recusandae aut quia ullam reprehenderit iure.',
          link: this.link ? `${this.link}${user.id}` : ''
        }
      }
      setTimeout(() => {
        this.loading = false
      },0)
    }
    //
  }
  ngOnDestroy() {
    console.debug('UserListComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

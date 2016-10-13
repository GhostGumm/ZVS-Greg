import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { ApiUserService, User } from '../../../services/'

/** 
 * Main navigation component
 */
@Component({
  selector: 'zp-navigation',
  styles: [`
    :host {
      display: block;
      width: 360px;
    }
    .zp-nav-close{
      position: absolute;
      top: 0;
      right: 0;
    }
  `],
  templateUrl: './navigation.component.html',
  providers: [ ApiUserService ]
})
export class NavigationComponent implements OnDestroy, OnInit {
  @Input() navigation: any // md-sidenav reference
  users: any[]
  user: any = {
    firstname: 'John',
    lastname: 'Doe',
    mail: 'john.doe@yopmail.com',
    avatar: './assets/zetapush_logo.png'
  }

  subscriptions: Array<Subscription> = []

  constructor(
    private router: Router,
    private userService: ApiUserService
  ) {
    /**
     * Route state listener
     * NavigationStart -> RoutesRecognized -> NavigationEnd
     */
    this.subscriptions.push(router.events.subscribe((event) => {
      console.debug('NavigationComponent::routeChange', { event })
      if (event.constructor.name === 'NavigationEnd') {
        this.navigation.close()
      }
    }))
  }

  ngOnInit() {
    console.debug('NavigationComponent::ngOnInit', {
      navigation: this.navigation
    })
    this.getUsers()
  }
  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  getUsers() {
    this.userService.getAllUsers().then(users => {
      console.debug('NavigationComponent::getUsers', { users })
      this.users = users
    })
  }
}

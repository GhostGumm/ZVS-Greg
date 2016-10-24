import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { ApiUserService, User } from '../../../services/'

/** 
 * Main navigation component
 */
@Component({
  selector: 'zp-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  providers: [ ApiUserService ]
})
export class NavigationComponent implements OnDestroy, OnInit {
  @Input() navigation: any // md-sidenav reference
  users: User[]
  user: any = {
    firstname: 'John',
    lastname: 'Doe',
    mail: 'john.doe@yopmail.com',
    avatar: './assets/zetapush_logo.png'
  }
  routes: any[] = [
    {
      name: 'Stats',
      link: ['/dashboard', 'stats']
    },
    {
      name: 'Context',
      link: ['context', 1]
    }
  ]
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
    /**
     * Md-Sidenav state listeners
     */
    this.subscriptions.push(this.navigation.onOpen.subscribe(() => {
      console.debug('NavigationComponent.navigation::onOpen')
      this.refreshStats()
    }))
    this.subscriptions.push(this.navigation.onClose.subscribe(() => {
      console.debug('NavigationComponent.navigation::onClose')
      this.refreshStats()
    }))
    /**
     * Fetch all navigation data
     */
    this.getNavigationItems()
  }
  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  /**
   * ToDo : move this to stats components
   */
  refreshStats() {
    const chartists = document.querySelectorAll('x-chartist')
    Array.prototype.forEach.call(chartists, (chart) => {
      chart.__chartist__.update()
    })
  }

  getNavigationItems() {
    this.getUsers()
  }

  /**
   * Get all global users list
   */
  getUsers() {
    this.userService.getAllUsers().then(users => {
      console.debug('NavigationComponent::getUsers', { users })
      this.users = users
    })
  }
}

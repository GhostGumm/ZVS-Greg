import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { ApiUserService, UserInterface, UserClass } from '../../../services/'
import { ApiZetalk } from '../../../zetapush/api'

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
  @Input() user: UserInterface

  users: Array<UserInterface> = []
  routes: any[] = [
    {
      name: 'Stats',
      icon: 'timeline',
      link: ['dashboard', 'stats']
    },
    {
      name: 'Context',
      icon: 'view_carousel',
      link: ['context', 1]
    }
  ]
  lastRoute: string
  subscriptions: Array<Subscription> = []

  constructor(
    private router: Router,
    private userService: ApiUserService,
    private api: ApiZetalk
  ) {
    /**
     * Route state listener
     */
    this.subscriptions.push(router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        console.debug('NavigationComponent::routeChange', { 
          state: event.constructor.name,
          url: event.url,
          lastRoute: this.lastRoute
        })
        // Close navigation if route changed
        if (this.lastRoute !== event.url) {
          this.navigation.close()
        }
        this.lastRoute = event.url
      }
    }))

    window['ApiZetalk'] = api
  }

  ngOnInit() {
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

  /**
   * Fetch all navigation data
   */
  getNavigationItems() {
    this.getUsers()
  }
  
  onNavigationLoaded() {
    // Wired timeout needed to open nav on start
    setTimeout(() => {
      this.navigation.open()
    }, 100)
  }

  /**
   * Get all global users list
   */
  getUsers() {
    this.userService.getAllUsers().then(users => {
      console.debug('NavigationComponent::getUsers', { users })
      for (let user of users) {
        this.users.push(new UserClass(user))
      }
    })
    // this.onNavigationLoaded()
  }
}

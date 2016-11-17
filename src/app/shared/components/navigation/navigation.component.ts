import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { ConversationService, UserService, UserInterface, UserClass } from '../../../services/'

/**
 * Main navigation component
 */
@Component({
  selector: 'zp-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  providers: [ UserService ]
})
export class NavigationComponent implements OnDestroy, OnInit {
  @Input() navigation: any // md-sidenav reference
  @Input() user: UserInterface
  @Output() logout = new EventEmitter()

  users: Array<UserInterface> = []
  contacts: Array<any> = []
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
    private conversationService: ConversationService,
    private userService: UserService
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
    /**
     * Handle create one to one conversation
     */
    this.subscriptions.push(conversationService.onCreateOneToOneConversation.subscribe(() => this.getNavigationItems()))
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
      this.users = users
    })
    // this.onNavigationLoaded()
  }

  getContact() {
    this.userService.getContact().then(contacts => {
      this.contacts = contacts
    })
  }

  onLogout() {
    this.logout.emit()
  }

}

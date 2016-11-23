import { Component, Input, OnDestroy, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { ConversationService } from '../../../services/conversation'
import { UserService, UserInterface } from '../../../services/user'

/**
 * Main navigation component
 */
@Component({
  selector: 'zp-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  providers: [ UserService ]
})
export class NavigationComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() navigation: any // md-sidenav reference
  @Input() user: UserInterface
  @Input() isMobile: boolean
  @Output() logout = new EventEmitter()

  loading: boolean = true
  contacts: Array<UserInterface> = []
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
  intro: any

  constructor(
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService,
    private changeRef: ChangeDetectorRef
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
          // this.navigation.close()
          this.closeIntro()
        }
        this.lastRoute = event.url
      }
    }))
    /**
     * Handle create one to one conversation
     */
    this.subscriptions.push(conversationService.onCreateOneToOneConversation.subscribe(() => this.getContact()))
  }

  ngOnInit() {
    /**
     * Md-Sidenav state listeners
     */
    this.subscriptions.push(this.navigation.onOpen.subscribe(() => {
      console.debug('NavigationComponent.navigation::onOpen')
      this.refreshLayout()
    }))  

    this.subscriptions.push(this.navigation.onCloseStart.subscribe(() => {
      console.debug('NavigationComponent.navigation::onCloseStart')
      this.closeIntro()
    }))
    this.subscriptions.push(this.navigation.onClose.subscribe(() => {
      console.debug('NavigationComponent.navigation::onClose')
      this.refreshLayout()
    }))
    
    this.getContact()
  }

  ngAfterViewInit() {
    if (!this.isMobile) {
      this.initIntro()
    }
  }

  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    this.closeIntro()
  }

  initIntro() {
    this.intro = window.introJs()   
    setTimeout(() => {
      this.navigation.open().then(() => {
        this.startIntro()
      })
    }, 250)
  }

  startIntro() {
    if (this.intro) {
      // this.intro.addHints()
    }
  }

  closeIntro() {
    if (this.intro) {
      this.intro.hideHints()
    }
  }

  refreshLayout() {
    this.refreshStats()
    this.refreshIntro()
  }
  refreshIntro() {
    if (this.intro) {
      this.intro.refresh()
    }
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

  getContact() {
    this.userService.getContact().then(contacts => {
      this.contacts = contacts
      this.loading = false
      this.changeRef.detectChanges()
    })
  }

  onLogout() {
    this.logout.emit()
  }

}

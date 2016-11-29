import { Component, Input, OnDestroy, OnInit, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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

  public loading: boolean = true
  private contacts: Array<UserInterface> = []
  public routes: any[] = [
    {
      name: 'Home',
      icon: 'home',
      link: ['home']
    },
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
  private subscriptions: Array<Subscription> = []
  private $params: any
  private lastRoute: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private userService: UserService,
    private changeRef: ChangeDetectorRef
  ) {
    /**
     * Route state listener
     */
    this.addRouteListener()
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
    }))
    this.subscriptions.push(this.navigation.onClose.subscribe(() => {
      console.debug('NavigationComponent.navigation::onClose')
      this.refreshLayout()
    }))

    this.getContact()
  }

  ngAfterViewInit() {}

  refreshLayout() {
    this.refreshStats()
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

  onContactClicked(event) {
    const user = event.value
    console.debug('NavigationComponent::onContactClicked', { user })
    // this.router.navigate(['/authenticated/conversation' , user.id])
    // this.router.navigateByUrl(`/authenticated/conversation/${user.id}`)
    /**
     * Angular 2 router weird behavior
     * router.navigate lead to detectChange break
     * native action don't obviously..
     * Related : https://goo.gl/BKCRhN
     */
    window.location.hash = `#/authenticated/conversation/${user.id}`
  }

  onLogout() {
    this.logout.emit()
  }

  addRouteListener() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      console.debug('NavigationComponent::paramsChanged', { params })
      this.$params = params
    }))
    this.subscriptions.push(this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationStart') {
        console.debug('NavigationComponent::routeChangeStart', { event })
        if (this.lastRoute !== event.url) {
          this.routeChanged()
        }
        this.lastRoute = event.url
      }
    }))
  }
  routeChanged() {
    if (this.isMobile) {
      this.navigation.close()
    }
  }

  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

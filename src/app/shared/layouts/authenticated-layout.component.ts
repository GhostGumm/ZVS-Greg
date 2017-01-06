import {
  Component, ViewChild, HostListener, OnInit, OnDestroy,
  Input, trigger, AfterViewInit, HostBinding
} from '@angular/core'

import { Router } from '@angular/router'

import { Subscription } from 'rxjs/Subscription'

import { fadeIn, slideUpDown } from '../../utils/utils.animation'

import { UserService, UserClass, UserInterface } from '../../services/user'
import { NotificationService } from '../../services/notification'
import { ZetaPushConnection } from '../../zetapush'

@Component({
  animations: [
    trigger('slideUpDown', slideUpDown),
    trigger('routeAnimation', fadeIn)
  ],
  selector: 'zp-authenticated-layout',
  styleUrls: ['./authenticated-layout.component.scss'],
  templateUrl: './authenticated-layout.component.html'
})
export class AuthenticatedLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navigation') navigation

  @Input() toolbarIsVisible: boolean = false
  @Input() navigationOpened: boolean = false

  private isMobile: boolean
  private subscriptions: Array<Subscription> = []
  public user: UserInterface
  private $url: any

  constructor(
    private connection: ZetaPushConnection,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.user = new UserClass({
      id: '0',
      login: 'anonymous',
      firstname: '',
      lastname: '',
      avatar: './assets/zetalk_logo.png',
      online: false
    })
  }

  @HostBinding('@routeAnimation')
  get routeAnimation() {
    return true
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateWindowSize(event.target.innerWidth)
  }

  ngOnInit() {
    this.getUserProfile()
    this.addNavListener()
    this.addRouterListener()
  }

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    this.updateWindowSize(window.innerWidth)
    console.debug('AuthenticatedLayoutComponent::ngAfterViewInit')
  }

  ngOnDestroy() {
    console.debug('AuthenticatedLayoutComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  getUserProfile() {
    this.userService.getUser().then((user: UserInterface) => {
      console.debug('AuthenticatedLayoutComponent::onGetUser', user)
      this.user = user
      this.notificationService.toastOnConnection(user)
    })
  }

  updateWindowSize(width) {
    this.isMobile = width < 800 ? true : false
    if (this.isMobile) {
      this.navigation.close()
    } else {
      this.navigation.open()
    }
  }

  addNavListener() {
    this.subscriptions.push(this.navigation.onOpenStart.subscribe(() => {
      this.navigationOpened = true
    }))
    this.subscriptions.push(this.navigation.onCloseStart.subscribe(() => {
      this.navigationOpened = false
    }))
  }

  addRouterListener() {
    this.subscriptions.push(this.router.events.subscribe((events) => {
      const url = events.url.split('/')
      this.$url = url.slice(2, url.length)
      console.debug('AuthenticatedLayoutComponent::routerEvents', { url: this.$url })
    }))
  }

  goTo(index) {
    const url = [...this.$url].slice(0, index + 1).join('/')
    this.router.navigate([url])
  }

  onLogout() {
    console.debug('AuthenticatedLayoutComponent::onLogout')
    this.connection.disconnect()
      .then(() => this.connection.connect({}))
      .then(() => this.router.navigate(['/login']))
  }
}

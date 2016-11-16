import {
  Component, ViewContainerRef, ViewChild, HostListener, OnInit, OnDestroy,
  Input, trigger, AfterViewInit, HostBinding
} from '@angular/core'
import { Router } from '@angular/router'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'

import { Animations } from '../../utils/'
import { UserService, UserClass, UserInterface } from '../../services/'
import { ZetaPushConnection } from '../../zetapush'

@Component({
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ duration: '250ms' })),
    trigger('profileAnimation', Animations.slideUpDown()),
    trigger('routeAnimation', Animations.fadeIn())
  ],
  providers: [ MdSnackBar ],
  selector: 'zp-authenticated-layout',
  styleUrls: ['./authenticated-layout.component.scss'],
  templateUrl: './authenticated-layout.component.html'
})
export class AuthenticatedLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navigation') navigation;

  @Input() toolbarIsVisible: boolean = false
  @Input() navigationOpened: boolean = false

  isMobile: boolean
  snackBar: any = MdSnackBar
  viewContainerRef: any = ViewContainerRef
  subscriptions: Array<Subscription> = []
  user: UserInterface

  constructor(
    private connecion: ZetaPushConnection,
    private router: Router,
    private userService: UserService
  ) {
    // TODO FIXME Need an non empty object
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
    this.updateWindowSize(window.innerWidth)
    this.subscriptions.push(this.navigation.onOpenStart.subscribe(() => {
      this.navigationOpened = true
    }))
    this.subscriptions.push(this.navigation.onCloseStart.subscribe(() => {
      this.navigationOpened = false
    }))
    this.userService.getUser().then(user => {
      console.debug('AuthenticatedLayoutComponent::onGetUser', user)
      this.user = user
    })
  }

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    console.debug('AuthenticatedLayoutComponent::ngAfterViewInit')
  }

  ngOnDestroy() {
    console.debug('AuthenticatedLayoutComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  updateWindowSize(width) {
    this.isMobile = width < 800 ? true : false
    console.debug('AuthenticatedLayoutComponent::updateWindowSize', {
      width,
      isMobile: this.isMobile
    })
  }

  toast() {
    const config = new MdSnackBarConfig(this.viewContainerRef)
    console.debug('AuthenticatedLayoutComponent::toast', {
      snack: this.snackBar,
      config
    })
    this.snackBar.open('It didn\'t quite work!', 'Try Again', config)
  }

  onLogout() {
    console.debug('AuthenticatedLayoutComponent::onLogout')
    this.connecion.disconnect().then(() => {
      this.router.navigate(['/login'])
    })
  }
}

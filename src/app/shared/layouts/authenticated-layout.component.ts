import { Component, ViewContainerRef, ViewChild, ElementRef, HostListener, OnInit, OnDestroy, Input, Output, trigger, AfterViewInit, HostBinding } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'
import { Animations } from '../../utils/'
import { UserInterface } from '../../services/'

@Component({
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ duration:'250ms' })),
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

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateWindowSize(event.target.innerWidth)
  }

  isMobile: boolean
  snackBar: any = MdSnackBar
  viewContainerRef: any = ViewContainerRef
  subscriptions: Array<Subscription> = []
  user: UserInterface = {
    id:'1',
    login: 'john.doe@yopmail.com',
    firstname: 'John',
    lastname: 'Doe',
    avatar: './assets/zetalk_logo.png',
    online:true
  }

  ngOnInit() {
    this.updateWindowSize(window.innerWidth)
    this.subscriptions.push(this.navigation.onOpenStart.subscribe(() => {
      this.navigationOpened = true
    }))
    this.subscriptions.push(this.navigation.onCloseStart.subscribe(() => {
      this.navigationOpened = false
    }))
  }

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    console.debug('AuthenticatedLayoutComponent::ngAfterViewInit', this.navigation)
  }

  ngOnDestroy() {
    console.debug('AuthenticatedLayoutComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  updateWindowSize(width) {
    this.isMobile = width<800 ? true : false
    console.debug('AuthenticatedLayoutComponent::updateWindowSize',{
      width,
      isMobile:this.isMobile
    })
  }

  toast() {
    let config = new MdSnackBarConfig(this.viewContainerRef)
    console.debug('AuthenticatedLayoutComponent::toast', {
      snack: this.snackBar,
      config
    })
    this.snackBar.open('It didn\'t quite work!', 'Try Again', config)
  }
}

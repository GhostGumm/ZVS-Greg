import { Component, ViewContainerRef, ViewChild, ElementRef, OnInit, OnDestroy, Input, Output, trigger, AfterViewInit, HostBinding } from '@angular/core'
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

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  ngOnInit() {
    this.subscriptions.push(this.navigation.onOpenStart.subscribe(() => {
      this.navigationOpened = true
    }))
    this.subscriptions.push(this.navigation.onCloseStart.subscribe(() => {
      this.navigationOpened = false
    }))
  }

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    console.debug('DashboardViewComponent::ngAfterViewInit', this.navigation)
  }

  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  toast() {
    let config = new MdSnackBarConfig(this.viewContainerRef)
    console.debug('DashboardViewComponent::toast', {
      snack: this.snackBar,
      config
    })
    this.snackBar.open('It didn\'t quite work!', 'Try Again', config)
  }
}

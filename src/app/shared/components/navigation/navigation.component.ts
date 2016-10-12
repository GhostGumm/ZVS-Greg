import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

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
  `],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnDestroy, OnInit {
  @Input() navigation: any // md-sidenav reference

  user: any = {
    firstname: 'John',
    lastname: 'Doe',
    mail: 'john.doe@yopmail.com',
    avatar: './assets/zetapush_logo.png'
  }

  subscriptions: Array<any> = []

  constructor(
    private router: Router
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

  ngOnDestroy() {
    console.debug('NavigationComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  ngOnInit() {
    console.debug('NavigationComponent::ngOnInit', {
      navigation: this.navigation
    })
  }
}

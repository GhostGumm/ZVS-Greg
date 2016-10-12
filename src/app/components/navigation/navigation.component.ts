import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

/** 
 * Main navigation component
 */ 
@Component({
  selector: 'zp-navigation',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
  @Input() navigation: any // md-sidenav reference

  user: any = {
    firstname: 'raf',
    lastname: 'millies',
    mail: 'raf@yopmail.com',
    avatar: './assets/zetapush_logo.png'
  }

  constructor(
    private router: Router
  ) {
    /**
     * Route state listener
     * NavigationStart -> RoutesRecognized -> NavigationEnd
     */
    router.events.subscribe((event) => {
      console.debug('NavigationComponent::routeChange', { event })
      if (event.constructor.name === 'NavigationEnd') {
        this.navigation.close()
      }
    })
  }

  ngOnInit() {
    console.debug('NavigationComponent::ngOnInit', {
      navigation: this.navigation
    })
  }
}

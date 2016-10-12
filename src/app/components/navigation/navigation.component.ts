import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'zp-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Input() navigation: any // md-sidenav reference

  user: any = {
    fisrtname: 'raf',
    lastname: 'millies',
    mail: 'raf@yopmail.com'
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

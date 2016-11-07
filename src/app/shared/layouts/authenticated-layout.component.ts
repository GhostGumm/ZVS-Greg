import { Component, ViewContainerRef, Input, trigger, AfterViewInit, HostBinding } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Animations } from '../../utils/'

@Component({
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ duration: '250ms' })),
    trigger('routeAnimation', Animations.fadeInOutView())
  ],
  providers: [ MdSnackBar ],
  selector: 'zp-authenticated-layout',
  styleUrls: ['./authenticated-layout.component.scss'],
  templateUrl: './authenticated-layout.component.html'
})
export class AuthenticatedLayoutComponent implements AfterViewInit {
  snackBar: any = MdSnackBar
  viewContainerRef: any = ViewContainerRef

  @Input() toolbarIsVisible: boolean = false

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    console.debug('DashboardViewComponent::ngAfterViewInit')
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

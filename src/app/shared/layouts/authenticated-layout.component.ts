import { Component, ViewContainerRef, Input, trigger, AfterViewInit, HostBinding } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Animations } from '../../utils/utils.animation'

@Component({
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ delay: '250ms' })),
    trigger('routeAnimation', Animations.fadeInOutView())
  ],
  providers: [ MdSnackBar ],
  selector: 'zp-authenicated-layout',
  styles: [`
    :host {
      height: 100%;
    }
    .zp-content {
      position: relative;
      display: block;
    }
  `],
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
    console.debug('DashboardViewComponent::ngAfterViewInit', {
      toolbarIsVisible: this.toolbarIsVisible
    })
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

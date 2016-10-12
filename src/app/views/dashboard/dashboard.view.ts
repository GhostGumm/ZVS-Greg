import { Component, ViewContainerRef, Input, trigger, AfterViewInit, HostBinding } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Animations } from '../../utils/utils.animation'

@Component({
  selector: 'zp-dashboard-view',
  templateUrl: './dashboard.view.html',
  providers: [ MdSnackBar ],
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ delay: '250ms' })),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})
export class DashboardViewComponent implements AfterViewInit {
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

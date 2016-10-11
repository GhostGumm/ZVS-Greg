import { Component, ViewContainerRef, Input, trigger, AfterViewInit } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Animations } from '../../utils/utils.animation'

@Component({
  selector: 'zp-dashboard',
  templateUrl: './dashboard.view.html',
  //styleUrls: ['./dashboard.css'],
  providers: [MdSnackBar],
  host: {
    '[@routeAnimation]': "true"
  },
  animations: [
    trigger('toolbarAnimation', Animations.slideUpDown({ delay:'250ms' })),
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})

export class DashboardView implements AfterViewInit{
  @Input() toolbarIsVisible : boolean = false
  
  snackBar : any = MdSnackBar
  viewContainerRef: any = ViewContainerRef

  ngAfterViewInit() {
    this.toolbarIsVisible = true
    console.debug('DashboardView::ngAfterViewInit', { toolbarIsVisible:this.toolbarIsVisible })  
  }

  toast() {
    let config = new MdSnackBarConfig(this.viewContainerRef)
    console.debug('DashboardView::toast',{ snack:this.snackBar, config })
    this.snackBar.open('It didn\'t quite work!', 'Try Again', config)
  }
}

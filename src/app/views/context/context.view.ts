import { Component, HostBinding, AfterViewInit, OnChanges, Input, trigger } from '@angular/core'
import { Router } from '@angular/router'
import { Animations } from '../../utils/utils.animation'

@Component({
  selector: 'zp-context',
  templateUrl: './context.view.html',
  providers: [],
  host: {
    '[@routeAnimation]': "true"
  },
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})

export class ContextView {
  constructor(){}
}

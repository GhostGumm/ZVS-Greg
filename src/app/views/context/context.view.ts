import { Component, HostBinding, AfterViewInit, OnChanges, Input, trigger } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
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
  private $params:any

  constructor(private route: ActivatedRoute){
    route.params.subscribe((params) => {
      this.$params = params
    })
  }

  ngOnInit() {
    console.log(this.$params)
  }
}

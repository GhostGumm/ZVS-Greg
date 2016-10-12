import { Component, HostBinding, OnInit, trigger } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

@Component({
  selector: 'zp-context-view',
  templateUrl: './context-view.component.html',
  providers: [],
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView())
  ]
})
export class ContextViewComponent implements OnInit {
  private $params: any

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(private route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.$params = params
    })
  }

  ngOnInit() {
    console.log(this.$params)
  }
}

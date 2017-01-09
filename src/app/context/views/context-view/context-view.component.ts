import { Component, HostBinding, OnInit, trigger } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { fadeInOutView } from '../../../utils/utils.animation'

@Component({
  selector: 'zp-context-view',
  templateUrl: './context-view.component.html',
  providers: [],
  animations: [
    trigger('routeAnimation', fadeInOutView)
  ]
})
export class ContextViewComponent implements OnInit {
  private $params: any

  private cards: any = [
    {
      title: 'Users',
      content: '15',
      hint: 'Check new user here'
    },
    {
      title: 'Contacts',
      content: '8',
      hint: 'Check contact here'
    },
    {
      title: 'Context',
      content: '3',
      hint: 'Check context here'
    }
  ]

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

import { Component, HostBinding, Input, OnInit, trigger } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

import { MessagesComponent, VideoComponent } from '../../components'

@Component({

  selector: 'zp-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls:['./conversation-view.component.scss'],
  providers: [ MessagesComponent, VideoComponent ],
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView()),
    trigger('messagesAnimation', Animations.swipeOutDownView()),
    trigger('videoAnimation', Animations.swipeOutDownView())
  ]
})
export class ConversationViewComponent implements OnInit {
  private $params: any
  @Input() messagesIsVisible: boolean = false
  @Input() videoIsVisible: boolean = false

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }
  

  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe((params) => {
      this.$params = params
      console.debug('ConversationViewComponent::paramsChanged', {
        params: this.$params
      })
      if (this.$params.mode == 'video') {
        this.messagesIsVisible = false
        this.videoIsVisible = true
      }
      else {
        this.messagesIsVisible = true
        this.videoIsVisible = false
      }
    })
  }

  ngOnInit() {
    console.log(this.$params)
  }

  switchView(mode) {
    const id = this.$params.id
    this.router.navigate(['authenticated/conversation', id, mode])
    console.debug('ConversationViewComponent::switchView', {
      mode,
      params: this.$params
    })
  }
}

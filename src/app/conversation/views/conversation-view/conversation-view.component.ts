import { Component, HostBinding, Input, OnInit, AfterViewInit, AfterContentInit, trigger } from '@angular/core'
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
export class ConversationViewComponent implements OnInit, AfterViewInit, AfterContentInit {
  private $params: any
  @Input() messagesIsVisible: string
  @Input() videoIsVisible: string

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.messagesIsVisible = 'inactive'
    this.videoIsVisible = 'inactive'
    this.addRouteListener()
  }

  ngOnInit() {
    console.log('ConversationViewComponent::ngOnInit', { 
      params: this.$params
    })
  }

  ngAfterViewInit() {
    console.log('ConversationViewComponent::ngAfterViewInit', { 
      params: this.$params
    })
  }

  ngAfterContentInit() {
    console.log('ConversationViewComponent::ngAfterContentInit', { 
      params: this.$params
    })
  }

  switchView(mode) {
    const id = this.$params.id
    this.router.navigate(['authenticated/conversation', mode, id])
    console.debug('ConversationViewComponent::switchView', {
      mode,
      params: this.$params
    })
  }

  addRouteListener() {
    this.route.params.subscribe((params) => {
      let oldId = this.$params ? this.$params.id : params['id']
      
      if (params['id'] !== oldId){
        /**
         * TODO : reload component on param changed
         */
        return
      }

      if (params['mode'] == 'messages') {
        this.messagesIsVisible = 'active'
        this.videoIsVisible = 'inactive'
      }
      else {
        this.messagesIsVisible = 'inactive'
        this.videoIsVisible = 'active'
      }
      this.$params = params
      console.debug('ConversationViewComponent::paramsChanged', {
        id:params['id'],
        oldId,
        params,
        messagesIsVisible: this.messagesIsVisible,
        videoIsVisible: this.videoIsVisible
      })
    })
  }
}

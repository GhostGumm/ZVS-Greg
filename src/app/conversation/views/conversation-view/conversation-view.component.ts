import { ApiUserService, User } from './../../../services/';
import { Component, HostBinding, Input, OnInit, AfterViewInit, AfterContentInit, trigger, ChangeDetectionStrategy } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Animations } from '../../../utils/utils.animation'

import { MessagesComponent, VideoComponent } from '../../components'

@Component({
  selector: 'zp-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls:['./conversation-view.component.scss'],
  providers: [ MessagesComponent, VideoComponent ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView()),
    trigger('messagesAnimation', Animations.swipeOutDownView()),
    trigger('videoAnimation', Animations.swipeOutDownView()),
    trigger('audioAnimation', Animations.swipeOutDownView())
  ]
})
export class ConversationViewComponent implements OnInit, AfterViewInit, AfterContentInit {
  private $params: any
  private mode: string
  private users: User[]
  @Input() messagesIsVisible: boolean
  @Input() videoIsVisible: boolean
  @Input() audioIsVisible: boolean
  

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private userService: ApiUserService) {
    this.messagesIsVisible = true
    this.videoIsVisible = false
    this.audioIsVisible = false
    this.addRouteListener()
  }

  ngOnInit() {
    console.log('ConversationViewComponent::ngOnInit', { 
      params: this.$params
    })
  }

  ngAfterContentInit() {
    console.log('ConversationViewComponent::ngAfterContentInit', { 
      params: this.$params
    })
  }

  ngAfterViewInit() {
    console.log('ConversationViewComponent::ngAfterViewInit', { 
      params: this.$params
    })
    // Mock purpose
    this.userService.getAllUsers().then((users) => {
      this.users = users.slice(0,5)
    })
  }

  openView(mode) {
    const id = this.$params.id
    this.mode = mode
    //this.router.navigate(['authenticated/conversation', mode, id])

    switch(mode) {
    case 'video':
      this.videoIsVisible = !this.videoIsVisible
      this.audioIsVisible = false
      break
    case 'audio':
      this.audioIsVisible = !this.audioIsVisible
      this.videoIsVisible = false
      break
    }

    console.debug('ConversationViewComponent::openView', {
      id,
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

      this.$params = params
      console.debug('ConversationViewComponent::paramsChanged')
    })
  }
}

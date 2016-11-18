import { Component, HostBinding, Input, OnInit, AfterViewInit, AfterContentInit, trigger } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Animations } from '../../../utils/utils.animation'

import { ConversationService, ConversationViewInterface } from '../../../services/conversation'
import { UserService } from '../../../services/user'

@Component({
  selector: 'zp-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss'],
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView()),
    trigger('loadingAnimation', Animations.fadeIn()),
    trigger('messagesAnimation', Animations.swipeOutDownView()),
    trigger('videoAnimation', Animations.swipeOutDownView()),
    trigger('audioAnimation', Animations.swipeOutDownView())
  ]
})
export class ConversationViewComponent implements OnInit, AfterViewInit, AfterContentInit {
  private loading: boolean = false
  private $params: any
  private mode: string
  private conversation: ConversationViewInterface
  private owner: string

  @Input() messagesIsVisible: boolean = true
  @Input() videoIsVisible: boolean = false
  @Input() audioIsVisible: boolean = false

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService
  ) {
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
  }

  getConversation(interlocutor) {
    console.log('ConversationViewComponent::getConversation', interlocutor)
    this.loading = true

    this.conversationService.getOneToOneConversation(interlocutor).then((result) => {
      this.conversation = result
      this.loading = false
      console.log('ConversationViewComponent::getConversation:success', {
        conversation:this.conversation
      })
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
      console.debug('ConversationViewComponent::params', params)
      this.getConversation(params['id'])
      this.$params = params
    })
  }
}

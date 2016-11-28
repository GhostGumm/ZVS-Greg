import {
  Component, HostBinding, OnInit, OnDestroy, AfterViewInit, AfterContentInit,
  trigger, NgZone, ChangeDetectorRef
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { Animations } from '../../../utils/utils.animation'

import { ConversationService, ConversationViewInterface } from '../../../services/conversation'
import { UserService } from '../../../services/user'

@Component({
  selector: 'zp-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss'],
  animations: [
    trigger('routeAnimation', Animations.fadeInOutView),
    trigger('loadingAnimation', Animations.fadeIn),
    trigger('messagesAnimation', Animations.swipeOutDownView),
    trigger('videoAnimation', Animations.swipeOutDownView),
    trigger('audioAnimation', Animations.swipeOutDownView)
  ]
})
export class ConversationViewComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  private $params: any
  private mode: string
  private subscriptions: Array<Subscription> = []

  private conversation: ConversationViewInterface
  private loading: boolean
  private videoIsVisible: boolean = false
  private audioIsVisible: boolean = false

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private conversationService: ConversationService,
    private userService: UserService,
    private changeRef: ChangeDetectorRef
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
      // this.changeRef.detectChanges()
      console.log('ConversationViewComponent::getConversation:success', {
        conversation: this.conversation
      })
    })
  }

  openView(mode) {
    const id = this.$params.id
    this.mode = mode
    // this.router.navigate(['authenticated/conversation', mode, id])

    switch (mode) {
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
    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.zone.run(() => {
        console.debug('ConversationViewComponent::params', params)
        this.getConversation(params['id'])
        this.$params = params
      })
    }))
  }

  ngOnDestroy() {
    console.debug('ConversationViewComponent::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

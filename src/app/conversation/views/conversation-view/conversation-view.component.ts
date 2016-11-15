import {
  UserService, UserInterface, UserClass,
  MessageInterface, MessageClass
} from './../../../services/';

import { Component, HostBinding, Input, OnInit, AfterViewInit, AfterContentInit, trigger, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
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
    trigger('videoAnimation', Animations.swipeOutDownView()),
    trigger('audioAnimation', Animations.swipeOutDownView())
  ]
})
export class ConversationViewComponent implements OnInit, AfterViewInit, AfterContentInit {
  private $params: any
  private mode: string
  private users: UserInterface[] = []
  private messages: MessageInterface[] = []
  @Input() messagesIsVisible: boolean
  @Input() videoIsVisible: boolean
  @Input() audioIsVisible: boolean
  

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private userService: UserService
  ){
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
    this.getConversationDetails(this.$params.id)
  }

  getConversationDetails(id) {    
    
    // Mock purpose 
    const getMessages = () => {
      let messages = 20
      let messages_tmp: MessageInterface[] = []
      for (let i = 0; i <= messages; i++) {
        const author = this.users[0].id
        messages_tmp.push(new MessageClass({
          id:`${i}`,
          author,
          metadata:{},
          isHovered:false,
          type:'text',
          value:'http://google.fr regarde ça raphael @toto',
          raw:'http://google.fr regarde ça raphael @toto',
          date:Date.now(),
          user: this.users.find(u => u.id == author)
        }))
      }
      this.messages = messages_tmp
      console.debug('ConversationViewComponent::onGetConversationDetails', {
        messages: this.messages,
        users: this.users
      })
    }

    const getUsers = () => {
      this.userService.getAllUsers().then((users) => {
        let users_tmp: UserInterface[] = []
        for (let user of users) {
          users_tmp.push(new UserClass(user))
        }
        this.users = users_tmp.slice(0,5)
        getMessages()
      })
    }

    getUsers()
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
      console.debug('ConversationViewComponent::paramsChanged', { 
        id: params['id'],
        oldId
       })      
      this.$params = params
      if (params['id'] !== oldId){
        /**
         * TODO : reload component on param changed
         */
        this.getConversationDetails(this.$params.id)
      }
    })
  }
}

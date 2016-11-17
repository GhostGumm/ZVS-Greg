import { Injectable, OnDestroy } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { ApiConversation } from '../../../zetapush/api'

import {
  UserClass, UserInterface,
  MessageClass, MessageInterface
} from './../../../services/';

export interface Conversation {
  details: any
  group: any
  messages: Array<any>
  unread
}
export interface ConversationViewModel {
  users: Array<UserInterface>
  messages: Array<MessageInterface>
}

@Injectable()
export class ConversationService implements OnDestroy {

  subscriptions: Array<Subscription> = []

  public onCreateOneToOneConversation: Observable<Conversation>
  public onGetOneToOneConversation: Observable<Conversation>
  public onAddConversationMarkup: Observable<Conversation>

  constructor(
    private api: ApiConversation,
    private http: Http
  ) {
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation.map(map)
    this.onGetOneToOneConversation = api.onGetOneToOneConversation.map(map)
    this.onAddConversationMarkup = api.onAddConversationMarkup.map(map)
  }

  createOneToOneConversation(interlocutor) : Promise<Conversation> {
    return this.api.createOneToOneConversation({ interlocutor })
  }

  getOneToOneConversation(interlocutor) : Promise<ConversationViewModel> {
   return this.api.getOneToOneConversation({ interlocutor }).then((conversation) => {
     console.debug('ConversationService::getOneToOneConversation', { conversation })
      let result:ConversationViewModel = {
        users:[],
        messages:[]
      }
      let { messages, group:{ members } } = conversation
      result.users = members.map((user) => {
        return new UserClass(user)
      })

      result.messages = messages.map((message) => {
        return new MessageClass({
          id: message.guid,
          author: message.data.author,
          metadata: {},
          isHovered: false,
          type: 'text',
          value: 'http://google.fr regarde ça raphael @toto',
          raw: 'http://google.fr regarde ça raphael @toto',
          date: Date.now(),
          user: result.users.find(u => u.id === message.data.author)
        })
      })
      return result
   })
  }

  addConversationMarkup(id, owner, value) : Promise<Conversation> {
    return wrap(this.api.addConversationMarkup({ id, owner, value }))
  }

  ngOnDestroy() {
    console.debug('ConversationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  addConversationAttachment({ id, owner, attachment }): Promise<any> {
    this.api.uploadConversationAttachment({ id, owner })
        .then(() => ({}))
    return new Promise((resolve, reject) => {

    })
  }
}

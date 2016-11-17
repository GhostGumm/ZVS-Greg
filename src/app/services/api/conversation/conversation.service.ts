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
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation
    this.onGetOneToOneConversation = api.onGetOneToOneConversation
    this.onAddConversationMarkup = api.onAddConversationMarkup
  }

  ngOnDestroy() {
    console.debug('ConversationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
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


  addConversationAttachment({ id, owner, attachment }): Promise<any> {
    return this.api.uploadConversationAttachment({ id, owner })
        .then(({ guid, httpMethod, url }) => this.upload({ attachment, guid, httpMethod, url }))
        .then((value) => this.api.addConversationAttachment({ id, owner, value }))
  }

  private upload({ attachment, guid, httpMethod, url }): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.request(url, {
        method: httpMethod,
        body: attachment
      })
      .map(response => response.json())
      .subscribe(() => resolve(guid), reject)
    })
  }
}

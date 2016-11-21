import { Injectable, OnDestroy } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'
import * as Rx from 'rxjs'

import { ApiConversation } from '../../zetapush/api'

import { ConversationInterface, ConversationViewInterface } from './conversation.interface'

import { MessageClass, MessageInterface, MessageService } from '../message'
import { UserClass } from '../user'

@Injectable()
export class ConversationService implements OnDestroy {

  subscriptions: Array<Subscription> = []

  public onAddConversationAttachment: Observable<any>
  public onAddConversationMarkup: Observable<any>
  public onCreateOneToOneConversation: Observable<ConversationInterface>
  public onGetOneToOneConversation: Observable<ConversationInterface>

  constructor(
    private api: ApiConversation,
    private http: Http,
    private messageService: MessageService
  ) {
    this.onAddConversationAttachment = api.onAddConversationAttachment
    this.onAddConversationMarkup = api.onAddConversationMarkup
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation
    this.onGetOneToOneConversation = api.onGetOneToOneConversation
  }

  onAddConversationMessage(id) {
    return Rx.Observable.merge(
      this.onAddConversationAttachment,
      this.onAddConversationMarkup
    ).filter(({ result }) => {
      return result.id === id
    })
  }

  ngOnDestroy() {
    console.debug('ConversationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  createOneToOneConversation(interlocutor): Promise<ConversationInterface> {
    return this.api.createOneToOneConversation({ interlocutor })
  }

  getOneToOneConversation(interlocutor): Promise<ConversationViewInterface> {
    return this.api.getOneToOneConversation({ interlocutor }).then((conversation) => {
      const { messages, group: { members }, details: { id, owner } } = conversation
      const result: ConversationViewInterface = {
        id,
        owner,
        users: [],
        messages: []
      }

      result.users = members.map((user) => {
        const { userKey, firstname, lastname, email, login } = user
        return new UserClass({
          id: userKey,
          login,
          firstname,
          lastname,
          email
        })
      })

      // Reverse messages list
      for (let i = messages.length - 1; i >= 0; i--) {
        let message
        const type = messages[i].data.type

        switch (type) {
        case MessageClass.TYPE_MARKUP:
          message = this.messageService.processMarkup({
            message: messages[i],
            users: result.users
          })
          break
        case MessageClass.TYPE_ATTACHMENT:
          message = this.messageService.processAttachment({
            message: messages[i],
            users: result.users
          })
          break
        }
        result.messages.push(message)
      }
      console.debug('ConversationService::getOneToOneConversation', { conversation, result })
      return result
    })
  }

  addConversationMarkup(id, owner, value): Promise<MessageInterface> {
    return this.api.addConversationMarkup({ id, owner, value }).then((result) => {
      return result
    })
  }

  addConversationAttachment({ id, owner, attachment }): Promise<any> {
    return this.api.uploadConversationAttachment({ id, owner })
        .then(({ guid, httpMethod, url }) => this.upload({ attachment, guid, httpMethod, url }))
        .then((value) => {
          console.debug('ConversationService::addConversationAttachment', { id, owner, value })
          this.api.addConversationAttachment({ id, owner, value })
        })
  }

  private upload({ attachment, guid, httpMethod, url }): Promise<string> {
    console.debug('ConversationService::upload', { attachment, guid, httpMethod, url })
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  resolve(guid)
              } else {
                  reject()
              }
          }
      }
      xhr.open('POST', url, true)
      xhr.send(attachment._file)
    })
  }
}

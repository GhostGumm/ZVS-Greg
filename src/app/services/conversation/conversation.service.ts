import { Injectable, OnDestroy } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { ApiConversation } from '../../zetapush/api'
import { ZetaPushClient } from '../../zetapush'

import { ConversationInterface, ConversationViewInterface } from './conversation.interface'

import { MessageClass, MessageInterface, MessageService } from '../message'
import { UserClass } from '../user'

@Injectable()
export class ConversationService implements OnDestroy {

  subscriptions: Array<Subscription> = []

  public onCreateOneToOneConversation: Observable<ConversationInterface>
  public onGetOneToOneConversation: Observable<ConversationInterface>
  public onAddConversationMarkup: Observable<any>
  public onAddConversationAttachment: Observable<any>
  private userKey = this.zpClient.getUserId()

  constructor(
    private zpClient: ZetaPushClient,
    private api: ApiConversation,
    private http: Http,
    private messageService: MessageService
  ) {
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation
    this.onGetOneToOneConversation = api.onGetOneToOneConversation
    this.onAddConversationMarkup = api.onAddConversationMarkup
    this.onAddConversationAttachment = api.onAddConversationAttachment
  }

  ngOnDestroy() {
    console.debug('ConversationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  createOneToOneConversation(interlocutor) : Promise<ConversationInterface> {
    return this.api.createOneToOneConversation({ interlocutor })
  }

  getOneToOneConversation(interlocutor) : Promise<ConversationViewInterface> {
    return this.api.getOneToOneConversation({ interlocutor }).then((conversation) => {
      const { messages, group:{ members }, details:{ id, owner } } = conversation
      const result: ConversationViewInterface = {
        id,
        owner,
        users:[],
        messages:[]
      }

      result.users = members.map((user) => {
        const { userKey, firstname, lastname, email, login } = user
        return new UserClass({
          id:userKey,
          login,
          firstname,
          lastname,
          email
        })
      })

      for (var i = messages.length - 1; i >= 0; i--) {
        let message
        const type = messages[i].data.type
        switch(type) {
        case 'markup':
          message = this.messageService.processMessage({
            message: messages[i],
            users: result.users
          })
          break
        case 'attachment':
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

  addConversationMarkup(id, owner, value) : Promise<MessageInterface> {
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
      // this.http.request(url, {
      //   method: httpMethod,
      //   body: attachment
      // })
      // .map(response => response.json())
      // .subscribe(() => resolve(guid), reject)
      var formData: any = new FormData()
      var xhr = new XMLHttpRequest()

      xhr.onreadystatechange = () => {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  resolve(guid)
              } else {
                  reject()
              }
          }
      }
      xhr.open("POST", url, true)
      xhr.send(attachment._file)
    })
  }
}

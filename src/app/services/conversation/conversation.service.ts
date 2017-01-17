import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/merge'

import { ApiConversation } from '../../zetapush/api'

import { ConversationInterface, ConversationViewInterface, ConversationPagination } from './conversation.interface'

import { MessageClass, MessageInterface, MessageService } from '../message'
import { UserClass } from '../user'

@Injectable()
export class ConversationService implements OnInit, OnDestroy {

  public subscriptions: Array<Subscription> = []
  public percent: any

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
    // To Improve
    this.percent = new Subject()
  }

  ngOnInit() {
  }

  onAddConversationMessage(id) {
    return Observable.merge(
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

  getOneToOneConversation(interlocutor: Array<string>, pagination: ConversationPagination): Promise<ConversationViewInterface> {
    return this.api.getOneToOneConversation({ interlocutor, pagination }).then((conversation) => {
      const { page, messages, group: { members }, details: { id, owner } } = conversation
      const result: ConversationViewInterface = {
        id,
        owner,
        users: [],
        messages: [],
        pagination: page
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

      // Reset messageService files
      this.messageService.resetServices()

      // Reverse and process message by type
      for (let i = messages.length - 1; i >= 0; i--) {
        let message = this.parseConversationMessage(messages[i], result.users)
        result.messages.push(message)
      }

      this.messageService.indexByAuthor(result.messages)

      console.debug('ConversationService::getOneToOneConversation', {
        conversation,
        result,
        files: this.messageService.getFiles()
      })

      return result
    })
  }

  getConversationMessages(conversation): Promise<any> {
    const { id, owner, pagination, users  } = conversation
    pagination.pageNumber++
    console.debug('ConversationService::getConversationMessages', { pagination })
    return this.api.getConversationMessages({ id, owner, pagination }).then((result) => {
      const { messages, page } = result
      pagination.hasNext = page.hasNext

      for (let i = 0; i < messages.length; i++) {
        let message = this.parseConversationMessage(messages[i], users, false)
        conversation.messages.unshift(message)
      }

      this.messageService.indexByAuthor(conversation.messages)
      return result
    })
  }

  parseConversationMessage(message, users, isNew = true) {
    let processedMessage
    const type = message.data.type

    switch (type) {
    case MessageClass.TYPE_MARKUP:
      processedMessage = this.messageService.processMarkup({
        message: message,
        users: users,
        isNew
      })
      break
    case MessageClass.TYPE_ATTACHMENT:
      processedMessage = this.messageService.processAttachment({
        message: message,
        users: users,
        isNew
      })
      break
    }
    return processedMessage
  }

  addConversationMarkup(id, owner, value): Promise<MessageInterface> {
    return this.api.addConversationMarkup({ id, owner, value }).then((result) => {
      return result
    })
  }

  addConversationAttachment({ id, owner, attachment }): Promise<any> {
    return this.api.uploadConversationAttachment({ id, owner })
      .then(({ guid, httpMethod, url }) => this.upload({ attachment, guid, httpMethod, url }))
      .then((guid) => {
        console.debug('ConversationService::addConversationAttachment', { id, owner, guid })
        const name = attachment._file.name
        this.api.addConversationAttachment({ id, owner, guid, name })
      })
  }

  private upload({ attachment, guid, httpMethod, url }): Promise<string> {
    console.debug('ConversationService::upload', { attachment, guid, httpMethod, url })
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(httpMethod, url, true)
      // xhr.responseType = 'arraybuffer'
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(guid)
          } else {
            reject()
          }
          this.percent.next(0)
        }
      }
      xhr.upload.onprogress = (event: any) => {
        if (event.lengthComputable) {
          this.percent.next(Math.round((event.loaded / event.total) * 100))
        }
      }
      xhr.send(attachment._file)
    })
  }
}

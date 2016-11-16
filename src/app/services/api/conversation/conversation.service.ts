import { Injectable, OnDestroy } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { ApiConversation } from '../../../zetapush/api'

export interface Conversation {
  details: any
  group: any
  messages: Array<any>
  unread
}

@Injectable()
export class ConversationService implements OnDestroy {

  subscriptions: Array<Subscription> = []

  public onCreateOneToOneConversation: Observable<Conversation>
  public onGetOneToOneConversation: Observable<Conversation>

  constructor(
    private api: ApiConversation,
    private http: Http
  ) {
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation
    this.onGetOneToOneConversation = api.onGetOneToOneConversation
  }

  createOneToOneConversation(interlocutor) : Promise<Conversation> {
    return this.api.createOneToOneConversation({ interlocutor })
  }

  getOneToOneConversation(interlocutor) : Promise<Conversation> {
    return this.api.getOneToOneConversation({ interlocutor })
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

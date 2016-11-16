import { Injectable, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { ApiConversation } from '../../../zetapush/api'

export interface Conversation {
  details: any
  group: any
  messages: Array<any>
  unread
}

const map = (conversation) => {
  console.log('Conversation.map', conversation)
  return conversation as Conversation
}
const wrap = (promise: Promise<any>) : Promise<Conversation> => promise.then(map)

@Injectable()
export class ConversationService implements OnDestroy {

  subscriptions: Array<Subscription> = []

  public onCreateOneToOneConversation: Observable<Conversation>
  public onGetOneToOneConversation: Observable<Conversation>

  constructor(
    private api: ApiConversation
  ) {
    this.onCreateOneToOneConversation = api.onCreateOneToOneConversation.map(map)
    this.onGetOneToOneConversation = api.onGetOneToOneConversation.map(map)
  }

  createOneToOneConversation(interlocutor) : Promise<Conversation> {
    return wrap(this.api.createOneToOneConversation({ interlocutor }))
  }

  getOneToOneConversation(interlocutor) : Promise<Conversation> {
    return wrap(this.api.getOneToOneConversation({ interlocutor }))
  }

  ngOnDestroy() {
    console.debug('ConversationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

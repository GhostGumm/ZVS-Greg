import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserClass, UserInterface } from '../user'
import { MessageClass } from '../message'
import { ApiUser, ApiZetalk } from '../../zetapush/api'

@Injectable()
export class UserService implements OnDestroy {
  subscriptions: Array<Subscription> = []

  constructor(
    private apiUser: ApiUser,
    private apiZetalk: ApiZetalk
  ) {}

  ngOnDestroy() {
    console.debug('UserService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  getUser(): Promise<UserInterface> {
    return this.apiUser.getUser().then(({ user }) => new UserClass({
      id: user.userKey,
      login: user.login,
      firstname: user.firstname,
      lastname: user.lastname,
      avatar: './assets/zetalk_logo.png',
      online: true
    }))
  }

  getPotentialContact(): Promise<UserInterface[]> {
    return this.apiZetalk.listPotentialContact().then(this.transformContactsToUserList)
  }

  getContact(): Promise<UserInterface[]> {
    return this.apiZetalk.listContact().then(({contacts}) => {
      return this.transformContactsToUserList({contacts})
    })
  }

  transformContactsToUserList({ contacts }) {
    return contacts.map(contact => new UserClass({
      id: contact.user.userKey,
      firstname: contact.user.firstname,
      lastname: contact.user.lastname,
      login: contact.user.login,
      online: true,
      metadata: {
        message: contact.conversations
          .filter(({ details }) => details.name === 'I18N.ONE_TO_ONE_CONVERSATION')
          .reduce((value, { messages }) => {
            const [ message = { data: { type: MessageClass.TYPE_MARKUP, value: '' } } ] = messages
            // TODO: Choisir une implémentation I18N
            return MessageClass.TYPE_MARKUP === message.data.type ? message.data.value  : `Pièce jointe (${message.data.value})`
          }, '')
      }
    }))
  }
}

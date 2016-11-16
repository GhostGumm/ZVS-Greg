import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserClass, UserInterface } from './user.interface'
import { USERS } from './user.mock'

import { ApiZetalk } from '../../../zetapush/api'

@Injectable()
export class UserService implements OnDestroy {
  subscriptions: Array<Subscription> = []

  constructor(
    private api: ApiZetalk
  ) {

    window['ApiZetalk'] = api
  }

  ngOnDestroy() {
    console.debug('UserService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  /**
   * Return global users list
   */
  getAllUsers(): Promise<UserInterface[]> {
    return this.getContact()
  }

  getContact(): Promise<UserInterface[]> {
    return this.api.listContact().then(({ contacts }) => contacts.map(contact => {
      console.debug('UserService::getContact', contacts)
      return new UserClass({
        id: contact.user.userKey,
        firstname: contact.user.firstname,
        lastname: contact.user.lastname,
        login: contact.user.login,
        online: true,
        metadata: {
          message: contact.conversations
            .filter(({ details }) => details.name === 'I18N.ONE_TO_ONE_CONVERSATION')
            .reduce((value, { messages }) => {
              const [ message = { data: { value: '' } } ] = messages
              return message.data.value
            }, '')
        }
      })
    }))
  }
}

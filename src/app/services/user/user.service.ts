import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserClass, UserInterface } from '../user'
import { ApiUser, ApiZetalk } from '../../zetapush/api'

const transformContactsToUserList = ({ contacts }) => contacts.map(contact => new UserClass({
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
}))

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

  /**
   * Return global users list
   */
  getAllUsers(): Promise<UserInterface[]> {
    return this.getContact()
  }

  getPotentialContact(): Promise<UserInterface[]> {
    return this.apiZetalk.listPotentialContact().then(transformContactsToUserList)
  }

  getContact(): Promise<UserInterface[]> {
    return this.apiZetalk.listContact().then(transformContactsToUserList)
  }
}

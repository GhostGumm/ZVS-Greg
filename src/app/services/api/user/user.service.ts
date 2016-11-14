import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { UserInterface } from './user.interface'
import { USERS } from './user.mock'

@Injectable()
export class UserService implements OnDestroy {
  subscriptions: Array<Subscription> = []

  constructor() {
  }
  ngOnDestroy() {
    console.debug('UserService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  /**
   * Return global users list
   */
  getAllUsers(): Promise<any[]> {
    return Promise.resolve(USERS)
  }
}

import { Injectable, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { User } from './user.interface'
import { USERS } from './user.mock'

@Injectable()
export class ApiUserService implements OnDestroy {
  subscriptions: Array<Subscription> = []

  constructor() {
  }
  ngOnDestroy() {
    console.debug('ApiUserService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  /**
   * Return global users list
   */
  getAllUsers(): Promise<any[]> {
    return Promise.resolve(USERS)
  }
}

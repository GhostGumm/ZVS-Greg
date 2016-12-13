import { Injectable, OnDestroy } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig, MdSnackBarRef } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'

import { NotificationCallComponent } from './call/notification.call'
import { NOTIFICATION_CALL_DURATION } from './notification.interface'

@Injectable()
export class NotificationService implements OnDestroy {

  private toastConfig: MdSnackBarConfig
  subscriptions: Array<Subscription> = []

  constructor(
    private snackBar: MdSnackBar
  ) {
  }

  toast({ title, action = null, duration = 2000 }) {
    const config = new MdSnackBarConfig()
    config.duration = duration

    this.snackBar.open(title, action, this.toastConfig)

    console.debug('NotificationService::toast', { title, action, config })
  }

  toastCall() {
    const config = new MdSnackBarConfig()
    config.duration = NOTIFICATION_CALL_DURATION
    this.snackBar.openFromComponent(NotificationCallComponent, config)
  }

  ngOnDestroy() {
    console.debug('NotificationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

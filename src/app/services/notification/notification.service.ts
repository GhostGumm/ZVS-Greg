import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Subscription } from 'rxjs/Subscription'

import { NotificationCallComponent } from './call/notification.call'
import { NOTIFICATION_CALL_DURATION, NOTIFICATION_WELCOME_DURATION } from './notification.interface'

@Injectable()
export class NotificationService implements OnInit, OnDestroy {

  private toastConfig: MdSnackBarConfig
  private subscriptions: Array<Subscription> = []

  constructor(
    private snackBar: MdSnackBar
  ) {
  }

  ngOnInit() {
    if (this.nativeNotificationGranted() === false) {
      window.Notification.requestPermission()
    }
  }

  nativeNotificationGranted() {
    return window.Notification && window.Notification.permission === 'granted' ? true : false
  }

  newNativeNotification(title, action, duration) {
    if (this.nativeNotificationGranted() === true) {
      const native = new window.Notification(title, { body: action })
      native.onshow = () => {
        setTimeout(native.close.bind(native), duration)
      }
    }
  }

  toast({ title, action = '', duration = 2000 }) {
    // this.newNativeNotification(title, action, duration)
    this.snackBar.open(title, action, {
      duration
    })
    console.debug('NotificationService::toast', { title, action })
  }

  toastOnConnection(user) {
    this.toast({
      title: `Welcome ${user.firstname}`,
      duration: NOTIFICATION_WELCOME_DURATION
    })
  }

  toastOnCall() {
    const config = new MdSnackBarConfig()
    config.duration = NOTIFICATION_CALL_DURATION
    const ref = this.snackBar.openFromComponent(NotificationCallComponent, config)
    NotificationCallComponent.toastRef = ref
  }

  ngOnDestroy() {
    console.debug('NotificationService::ngOnDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

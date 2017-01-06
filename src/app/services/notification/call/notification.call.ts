import { Component, OnInit, OnDestroy } from '@angular/core'
import { MdSnackBarRef } from '@angular/material'
import {Subscription} from 'rxjs/Subscription'
import {IntervalObservable} from 'rxjs/observable/IntervalObservable'
import { NOTIFICATION_CALL_DURATION } from '../notification.interface'

@Component({
  selector: 'zp-notification-call',
  styleUrls: ['./notification.call.scss'],
  templateUrl: './notification.call.html'
})
export class NotificationCallComponent implements OnInit, OnDestroy {

  public static toastRef: any

  private subscriptions: Array<Subscription> = []
  private duration: number = NOTIFICATION_CALL_DURATION
  private progress: number = 0
  private intervalTime: number = 32

  constructor(
  ) {
    console.debug('NotificationCallComponent::constructor')
  }

  ngOnInit() {
    console.debug('NotificationCallComponent::onInit')
    const intervalObserver = IntervalObservable.create(this.intervalTime).subscribe(() => {
      this.duration -= this.intervalTime
      this.progress = (this.duration / NOTIFICATION_CALL_DURATION) * 100
      if (this.progress <= 0) {
        intervalObserver.unsubscribe()
      }
    })
    this.subscriptions.push(intervalObserver)
  }

  takeCall() {
    console.debug('NotificationCallComponent::takeCall')
    NotificationCallComponent.toastRef.dismiss()
  }

  denyCall() {
    console.debug('NotificationCallComponent::denyCall')
    NotificationCallComponent.toastRef.dismiss()
  }

  ngOnDestroy() {
    console.debug('NotificationCallComponent::onDestroy')
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

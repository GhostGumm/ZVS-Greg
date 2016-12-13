import { Component } from '@angular/core'
import { NOTIFICATION_CALL_DURATION } from '../notification.interface'

@Component({
  selector: 'zp-notification-call',
  styleUrls: ['./notification.call.scss'],
  templateUrl: './notification.call.html'
})
export class NotificationCallComponent {

  constructor() {
    console.log(NOTIFICATION_CALL_DURATION)
  }
}

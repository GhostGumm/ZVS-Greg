import { Observable } from 'rxjs/Observable'
import { services } from 'zetapush-js'

export class MessagingService extends services.Messaging {
  /**
   * FIX behavior due to https://github.com/Microsoft/TypeScript/issues/12059
   */
  static get DEFAULT_DEPLOYMENT_ID(): string {
    return services.Messaging.DEFAULT_DEPLOYMENT_ID
  }
  public onNotification: Observable<any>
  notification() {}
}

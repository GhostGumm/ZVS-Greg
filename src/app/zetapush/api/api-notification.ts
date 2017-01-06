import { Observable } from 'rxjs/Observable'
import { Api } from './api'

export class ApiNotification extends Api {
  public onListUserNotification: Observable<any>
  listUserNotification({ page }: { page?: any } = {}) {
    return this.$publish('listUserNotification', { page })
  }
}

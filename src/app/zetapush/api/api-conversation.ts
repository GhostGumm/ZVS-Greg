import { Observable } from 'rxjs/Observable'
import { Api } from './api'

export class ApiConversation extends Api {
  public onAddConversationAttachment: Observable<any>;
  addConversationAttachment({ id, owner, value }) {
    return this.$publish('addConversationAttachment', { id, owner, value })
  }
  public onAddConversationMarkup: Observable<any>;
  addConversationMarkup({ id, owner, value }) {
    return this.$publish('addConversationMarkup', { id, owner, value })
  }
  public onCreateOneToOneConversation: Observable<any>;
  createOneToOneConversation({ interlocutor }) {
    return this.$publish('createOneToOneConversation', { interlocutor })
  }
  public onGetConversation: Observable<any>;
  getConversation({ id, owner }) {
    return this.$publish('getConversation', { id, owner })
  }
  public onGetOneToOneConversation: Observable<any>
  getOneToOneConversation({ interlocutor }) {
    return this.$publish('getOneToOneConversation', { interlocutor })
  }
  public onListConversationByMember: Observable<any>;
  listConversationByMember({ userKey }) {
    return this.$publish('listConversationByMember', { userKey })
  }
  public onListConversation: Observable<any>;
  listConversation() {
    return this.$publish('listConversation', { })
  }
}

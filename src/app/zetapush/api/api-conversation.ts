import { Observable } from 'rxjs/Observable'
import { Api } from './api'

export class ApiConversation extends Api {
  public onAddConversationAttachment: Observable<any>
  public onAddConversationMarkup: Observable<any>
  public onCreateOneToOneConversation: Observable<any>
  public onGetConversation: Observable<any>
  public onGetOneToOneConversation: Observable<any>
  public onListConversationByMember: Observable<any>
  public onListConversation: Observable<any>
  public onUploadConversationAttachment: Observable<any>
  addConversationAttachment({ id, owner, guid }) {
    return this.$publish('addConversationAttachment', { id, owner, guid })
  }
  addConversationMarkup({ id, owner, value }) {
    return this.$publish('addConversationMarkup', { id, owner, value })
  }
  createOneToOneConversation({ interlocutor }) {
    return this.$publish('createOneToOneConversation', { interlocutor })
  }
  getConversation({ id, owner }) {
    return this.$publish('getConversation', { id, owner })
  }
  getOneToOneConversation({ interlocutor }) {
    return this.$publish('getOneToOneConversation', { interlocutor })
  }
  listConversationByMember({ userKey }) {
    return this.$publish('listConversationByMember', { userKey })
  }
  listConversation() {
    return this.$publish('listConversation', { })
  }
  uploadConversationAttachment({ id, owner }) {
    return this.$publish('uploadConversationAttachment', { id, owner })
  }
}

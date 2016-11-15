import { Observable } from 'rxjs/Observable'
import { Api } from './api'

export class ApiConversation extends Api {
  addConversationAttachment({ id, owner, value }) {
    return this.$publish('addConversationAttachment', { id, owner, value })
  }
  addConversationMarkup({ id, owner, value }) {
    return this.$publish('addConversationMarkup', { id, owner, value })
  }
  public onCreateOneToOneConversation: Observable<any>;
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
}

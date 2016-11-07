import { Api } from './api'

export class ApiConversation extends Api {
  createPublicConversation({ name }) {
    return this.$publish('createPublicConversation', { name })
  }
  createPrivateConversation({ name }) {
    return this.$publish('createPrivateConversation', { name })
  }
  createDirectConversation({ name, interlocutors = [] }) {
    return this.$publish('createDirectConversation', { name, interlocutors })
  }
  addUserInPublicConversation({ user, conversation }) {
    return this.$publish('addUserInPublicConversation', { user, conversation })
  }
  addUserInConversation({ user, conversation }) {
    return this.$publish('addUserInConversation', { user, conversation })
  }
  addMessageInConversation({ message, owner, conversation }) {
    return this.$publish('addMessageInConversation', { message, owner, conversation })
  }
  addMessageIncoming({ id, owner, message }) {
    return this.$publish('addMessageIncoming', { id, owner, message })
  }
  addAttachmentInConversation({ guid, owner, conversation, metadata = {}, tags = [] }) {
    return this.$publish('addAttachmentInConversation', { guid, owner, conversation, metadata, tags })
  }
  uploadAttachmentInConversation({ conversation, owner }) {
    return this.$publish('uploadAttachmentInConversation', { conversation, owner })
  }
  removeUserFromConversation({ user, conversation }) {
    return this.$publish('removeUserFromConversation', { user, conversation })
  }
  removeUserFromPublicConversation({ user, conversation }) {
    return this.$publish('removeUserFromPublicConversation', { user, conversation })
  }
  getAttachment({ path, owner }) {
    return this.$publish('getAttachment', { path, owner })
  }
  getConversationPresences({ id, owner }) {
    return this.$publish('getConversationPresences', { id, owner })
  }
  getConversationUnreadMessages({ id }) {
    return this.$publish('getConversationUnreadMessages', { id })
  }
  markConversationAsRead({ id }) {
    return this.$publish('markConversationAsRead', { id })
  }
  getAllPublicConversations() {
    return this.$publish('getAllPublicConversations', {})
  }
  getAllPrivateConversations() {
    return this.$publish('getAllPrivateConversations', {})
  }
  getPublicConversationInfos({ id }) {
    return this.$publish('getPublicConversationInfos', { id })
  }
  getUserConversationInfos() {
    return this.$publish('getUserConversationInfos', {})
  }
  getConversationInfos({ id, owner, page }) {
    return this.$publish('getConversationInfos', { id, owner, page })
  }
  getBasicConversationInfos({ id, owner }) {
    return this.$publish('getBasicConversationInfos', { id, owner })
  }
  getConversationMessages({ id, owner, page }) {
    return this.$publish('getConversationMessages', { id, owner, page })
  }
  deleteMessageInConversation({ id, guid, owner }) {
    return this.$publish('deleteMessageInConversation', { id, guid, owner })
  }
  deleteAllMessagesInConversation({ id, owner }) {
    return this.$publish('deleteAllMessagesInConversation', { id, owner })
  }
  inviteUserToConversation({ user, id }) {
    return this.$publish('inviteUserToConversation', { user, id })
  }
  acceptInvitationToConversation({ id }) {
    return this.$publish('acceptInvitationToConversation', { id })
  }
  getUserInvitations() {
    return this.$publish('getUserInvitations', {})
  }
}

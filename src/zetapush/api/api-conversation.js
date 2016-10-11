import { Api } from './api'

/**
 * @todo Should be auto generated
 * @extends Api
 */
export class ApiConversation extends Api {
  createPublicConversation({ name }) {
    this.$publish('createPublicConversation', { name })
  }
  createPrivateConversation({ name }) {
    this.$publish('createPrivateConversation', { name })
  }
  createDirectConversation({ name, interlocutors = [] }) {
    this.$publish('createDirectConversation', { name, interlocutors })
  }
  addUserInPublicConversation({ user, conversation }) {
    this.$publish('addUserInPublicConversation', { user, conversation })
  }
  addUserInConversation({ user, conversation }) {
    this.$publish('addUserInConversation', { user, conversation })
  }
  addMessageInConversation({ message, owner, conversation }) {
    this.$publish('addMessageInConversation', { message, owner, conversation })
  }
  addMessageIncoming({ id, owner, message }) {
    this.$publish('addMessageIncoming', { id, owner, message })    
  }
  addAttachmentInConversation({ guid, owner, conversation, metadata = {}, tags = [] }) {
    this.$publish('addAttachmentInConversation', { guid, owner, conversation, metadata, tags })
  }
  uploadAttachmentInConversation({ conversation, owner }) {
    this.$publish('uploadAttachmentInConversation', { conversation, owner })
  }
  removeUserFromConversation({ user, conversation }) {
    this.$publish('removeUserFromConversation', { user, conversation })
  }
  removeUserFromPublicConversation({ user, conversation }) {
    this.$publish('removeUserFromPublicConversation', { user, conversation })
  }
  getAttachment({ path, owner }) {
    this.$publish('getAttachment', { path, owner })
  }
  getConversationPresences({ id, owner }) {
    this.$publish('getConversationPresences', { id, owner })
  }
  getConversationUnreadMessages({ id }) {
    this.$publish('getConversationUnreadMessages', { id })    
  }
  markConversationAsRead({ id }) {
    this.$publish('markConversationAsRead', { id })
  }
  getAllPublicConversations() {
    this.$publish('getAllPublicConversations', {})
  }
  getAllPrivateConversations() {
    this.$publish('getAllPrivateConversations', {})
  }
  getPublicConversationInfos({ id }) {
    this.$publish('getPublicConversationInfos', { id })
  }
  getUserConversationInfos() {
    this.$publish('getUserConversationInfos', {})
  }
  getConversationInfos({ id, owner, page }) {
    this.$publish('getConversationInfos', { id, owner, page })
  }
  getBasicConversationInfos({ id, owner }) {
    this.$publish('getBasicConversationInfos', { id, owner })
  }
  getConversationMessages({ id, owner, page }) {
    this.$publish('getConversationMessages', { id, owner, page })
  }
  deleteMessageInConversation({ id, guid, owner }) {
    this.$publish('deleteMessageInConversation', { id, guid, owner })
  }
  deleteAllMessagesInConversation({ id, owner }) {
    this.$publish('deleteAllMessagesInConversation', { id, owner })
  }
  inviteUserToConversation({ user, id }) {
    this.$publish('inviteUserToConversation', { user, id })
  }
  acceptInvitationToConversation({ id }) {
    this.$publish('acceptInvitationToConversation', { id })
  }
  getUserInvitations() {
    this.$publish('getUserInvitations')
  }
  
}

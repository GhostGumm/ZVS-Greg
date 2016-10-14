import { Api } from './api'

export class ApiUser extends Api {
  getAllGlobalUsers() {
    this.$publish('getAllGlobalUsers', {})
  }
  getDashboard() {
    this.$publish('getDashboard', {})
  }
  createUser({ login, password, mail }) {
    this.$publish('createUser', { login, password, mail })
  }
  isNewUser({ user }) {
    this.$publish('isNewUser', { user })
  }
  getDelegateInfos({ userId }) {
    this.$publish('getDelegateInfos', { userId })
  }
  getUserPublicInfos({ userKeys = [] }) {
    this.$publish('getUserPublicInfos', { userKeys })
  }
  getUserPrivateInfos() {
    this.$publish('getUserPrivateInfos', {})
  }
  getUserPrivateInfosAsUser({ user }) {
    this.$publish('getUserPrivateInfosAsUser', { user })
  }
  searchUser({ criteria = {} }) {
    this.$publish('searchUser', { criteria })
  }
  updateUser({ profile }) {
    this.$publish('updateUser', { profile })
  }
  changePassword({ password, token }) {
    this.$publish('changePassword', { password, token }, false)
  }
  resetPasswordByLogin({ login }) {
    this.$publish('resetPasswordByLogin', { login })
  }
  resetPasswordByMail({ mail }) {
    this.$publish('resetPasswordByMail', { mail })
  }
  resetPasswordByUserId({ userId }) {
    this.$publish('resetPasswordByUserId', { userId })
  }
  addAvatar({ guid, metadata, tags }) {
    this.$publish('addAvatar', { guid, metadata, tags })
  }
  uploadAvatar() {
    this.$publish('uploadAvatar', {})
  }
  getAvatar({ guid, owner }) {
    this.$publish('getAvatar', { guid, owner })
  }
}

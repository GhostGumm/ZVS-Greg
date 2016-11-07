import { Api } from './api'

export class ApiUser extends Api {
  getAllGlobalUsers() {
    return this.$publish('getAllGlobalUsers', {})
  }
  getDashboard() {
    return this.$publish('getDashboard', {})
  }
  createUser({ login, password, email }) {
    return this.$publish('createUser', { login, password, email })
  }
  isNewUser({ user }) {
    return this.$publish('isNewUser', { user })
  }
  getDelegateInfos({ userId }) {
    return this.$publish('getDelegateInfos', { userId })
  }
  getUserPublicInfos({ userKeys = [] }) {
    return this.$publish('getUserPublicInfos', { userKeys })
  }
  getUserPrivateInfos() {
    return this.$publish('getUserPrivateInfos', {})
  }
  getUserPrivateInfosAsUser({ user }) {
    return this.$publish('getUserPrivateInfosAsUser', { user })
  }
  searchUser({ criteria = {} }) {
    return this.$publish('searchUser', { criteria })
  }
  updateUser({ profile }) {
    return this.$publish('updateUser', { profile })
  }
  changePassword({ password, token }) {
    return this.$publish('changePassword', { password, token }, false)
  }
  resetPasswordByLogin({ login }) {
    return this.$publish('resetPasswordByLogin', { login })
  }
  resetPasswordByMail({ mail }) {
    return this.$publish('resetPasswordByMail', { mail })
  }
  resetPasswordByUserId({ userId }) {
    return this.$publish('resetPasswordByUserId', { userId })
  }
  addAvatar({ guid, metadata, tags }) {
    return this.$publish('addAvatar', { guid, metadata, tags })
  }
  uploadAvatar() {
    return this.$publish('uploadAvatar', {})
  }
  getAvatar({ guid, owner }) {
    return this.$publish('getAvatar', { guid, owner })
  }
}

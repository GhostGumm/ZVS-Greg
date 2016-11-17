import { Api } from './api'

export class ApiUser extends Api {
  createUser({ login, password, email, firstname, lastname }) {
    return this.$publish('createUser', { login, password, email, firstname, lastname })
  }
  getUser(userKey?: string) {
    return this.$publish('getUser', { userKey })
  }
}

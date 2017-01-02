import { Api } from './api'

const TEMPLATE__RESET_PASSWORD = 'TEMPLATE__RESET_PASSWORD'

export class ApiUser extends Api {
  confirmUserPassword({ password, token }: { password: string, token: string }) {
    return this.$publish('confirmUserPassword', { password, token })
  }
  createUser({ login, password, email, firstname, lastname }) {
    return this.$publish('createUser', { login, password, email, firstname, lastname })
  }
  getUser(userKey?: string) {
    return this.$publish('getUser', { userKey })
  }
  resetUserPasswordByLogin({ login }: { login?: string }) {
    return this.$publish('resetUserPasswordByLogin', { login, template: TEMPLATE__RESET_PASSWORD })
  }
  resetUserPasswordByUserKey({ userKey }: { userKey?: string }) {
    return this.$publish('resetUserPasswordByUserKey', { userKey, template: TEMPLATE__RESET_PASSWORD })
  }
}

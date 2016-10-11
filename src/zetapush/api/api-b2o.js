import { Api } from './api'

/**
 * @todo Should be auto generated
 * @extends Api
 */
export class ApiB2o extends Api {
  constructor(...params) {
    super(...params)
    const { $publish } = this
    this.$publish = (...parameters) => {
      console.debug('ApiB2o::$publish', parameters)
      $publish.apply(this, parameters)
    }
  }

  createB2oUser() {
    this.$publish('createB2oUser', ...arguments)
  }

  getUseByLogin({ login }) {
    this.$publish('getUseByLogin', { login })
  }
  resetPasswordByLogin({ login }) {
    this.$publish('resetPasswordByLogin', { login })
  }

  getRole(request) {
    this.$publish('getRole', { request }, false)
  }
}

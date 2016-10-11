import { Authentication } from 'zetapush-js'

/**
 * @type {string}
 */
export const ZETAPUSH_TOKEN_KEY = 'zetapush.token'

/**
 * @type {string}
 */
export const ZETAPUSH_SANDBOX_KEY = 'zetapush.sandbox'

/**
 * @type {string}
 */
export const B2O_TOKEN_KEY = 'ServicesAuthToken'

/**
 * Provide abstraction for token persistence
 * @access protected
 */
export class SessionPersistenceStrategy {
  /**
   * @param {{key: string}} parameters
   */
  constructor({ key = ZETAPUSH_TOKEN_KEY } = {}) {
    /**
     * @access private
     * @type {string}
     */
    this.key = key
  }
  /**
   * @return {string} The stored token
   */
  get() {
    const json = localStorage.getItem(this.key) || '{}'
    const session = JSON.parse(json)
    return session
  }
  /**
   * @param {Object} session
   */
  set(session = {}) {
    const json = JSON.stringify(session)
    return localStorage.setItem(this.key, json)
  }
}

/**
 *
 */
export class HandshakeManagerStrategy {
  /**
  * @param {{persistence: SessionPersistenceStrategy}} parameters
  */
  constructor({ persistence }) {
    /**
     * @access private
     * @type {SessionPersistenceStrategy}
     */
    this.persistence = persistence
  }
  /**
   * @return {boolean}
   */
  isWeak() {
    const session = this.persistence.get()
    return 'string' === typeof session.publicToken
  }
  /**
  * @return {boolean}
  */
  isStrong() {
    const session = this.persistence.get()
    return !this.isWeak() && 'string' === typeof session.token
  }

  get() {
    return () => {
      const session = this.persistence.get()
      if (this.isStrong()) {
        return Authentication.simple({
          login: 'root',
          password: 'root'
        })
      }
      else {
        return Authentication.weak({
          token: session.token
        })
      }
    }
  }
}

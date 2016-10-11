import { Authentication, Client } from 'zetapush-js'
import { SessionPersistenceStrategy, ZETAPUSH_TOKEN_KEY, B2O_TOKEN_KEY } from './utils'

/**
 * @return {boolean}
 */
const isWeak = (session) => {
  return 'string' === typeof session.publicToken
}
/**
* @return {boolean}
*/
const isStrong = (session) => {
  return !isWeak(session) && 'string' === typeof session.token
}

/**
 * @extends Client
 */
export class ApplicationsClient extends Client {
  /**
   *
   */
  constructor({ apiUrl, sandboxId, zpDebug }) {
    const persistence = new SessionPersistenceStrategy({
      key: `${ZETAPUSH_TOKEN_KEY}.${sandboxId}`
    })

    /**
     * @return {AbstractHandshakeManager}
     */
    const credentials = () => {
      const session = persistence.get()
      const { token } = session
      const delegateToken = this.getDelegateToken()
      
      // Delegate
      if (delegateToken && !this.hasCredentials() && !token) {
        console.debug('ApplicationsClient::delegate', { delegateToken })
        return Authentication.delegating({
          token:delegateToken
        })        
      }
      // Weak & Simple
      if (this.hasCredentials()) {
        console.debug('ApplicationsClient::simple', { token })
        const { login, password } = this.getCredentials()
        this.setCredentials({})
        return Authentication.simple({
          login,
          password
        })
      }
      else {
        if (this.isStronglyAuthenticated()) {
          console.debug('ApplicationsClient::simple', { token })
          return Authentication.simple({
            login: token,
            password: null
          })
        }
        else {
          console.debug('ApplicationsClient::weak', { token })
          return Authentication.weak({
            token
          })
        }
      }
    }
    super({
      apiUrl, sandboxId, credentials
    })
    /**
    * @type {string}
    */
    this.zpDebug = zpDebug
    /**
    * @type {SessionPersistenceStrategy}
    */
    this.persistence = persistence
    /**
    * @type {Object}
    */
    this.credentials = {}
    this.lifeCycleConnectionHandler = this.addConnectionStatusListener({
      onConnectionClosed() {
        console.debug('ApplicationsClient::onConnectionClosed')
        persistence.set({})
      },
      onSuccessfulHandshake(session) {
        console.debug('ApplicationsClient::onSuccessfulHandshake', session)
        if ('string' === typeof session.userId && 'string' !== typeof session.publicToken) {
          persistence.set(session)
        }
      },
      onFailedHandshake(failure) {
        console.error('ApplicationsClient::onFailedHandshake', failure)
      }
    })

    window.onbeforeunload = () => {
      this.removeConnectionStatusListener(this.lifeCycleConnectionHandler)
      super.disconnect()
    }
  }
  /**
  * @return {boolean}
  */
  isStronglyAuthenticated(session = this.persistence.get()) {
    return !this.isWeaklyAuthenticated(session) && 'string' === typeof session.userId
  }
  /**
  * @return {boolean}
  */
  isDelegateAuthenticated(session = this.persistence.get()) {
    return !this.isWeaklyAuthenticated(session) && !('string' === typeof session.token) && 'string' === typeof session.userId
  }
  /**
  * @return {boolean}
  */
  isWeaklyAuthenticated(session = this.persistence.get()) {
    return 'string' === typeof session.publicToken
  }
  /**
   * @param {{login: string, password: string}} parameters
   */
  setCredentials({ login, password }) {
    this.credentials = { login, password }
  }
  /**
   * @return {Object}
   */
  getCredentials() {
    return this.credentials
  }
  /**
   * @return {Object}
   */
  getSession() {
    return this.persistence.get()
  }
  /**
  * @return {boolean}
  */
  hasCredentials() {
    const credentials = this.getCredentials()
    return credentials.login && credentials.password
  }
  /**
   * @return {String}
   */
  getDelegateToken() {
    return localStorage.getItem(B2O_TOKEN_KEY)
  }
  removeDelegateToken() {
    localStorage.removeItem(B2O_TOKEN_KEY)
  }

  getProxyUrl() {
    if (this.zpDebug) {
      return `${this.helper.serverUrl}/rest/deployed/${this.helper.sandboxId}/zpfs_hdfs_0/`
    }
    return `https://file.zpush.io/${this.helper.sandboxId}/zpfs_hdfs_0/`
  }

  setLang({ lang, forced }) {
    const saved = localStorage.getItem(`zetapush.lang.${this.helper.sandboxId}`)
    if (saved) {
      if (forced) {
        localStorage.setItem(`zetapush.lang.${this.helper.sandboxId}`, lang)
      }
    }
    else {      
      localStorage.setItem(`zetapush.lang.${this.helper.sandboxId}`, lang)
    }
  }

  handshake() {
    console.debug('ApplicationsClient::handshake')
    super.handshake()
  }
  connect() {
    console.debug('ApplicationsClient::connect')
    super.connect()
  }
  disconnect() {
    console.debug('ApplicationsClient::disconnect')
    this.persistence.set({})
    //this.removeDelegateToken()
    super.disconnect()
  }
}

import { Authentication, SmartClient, SmartClientOptions } from 'zetapush-js'

import { environment } from '../../environments/environment'

const { ZETAPUSH_API_URL, ZETAPUSH_SANDBOX_ID } = environment

const ZETAPUSH_DELEGATING_TOKEN_KEY = 'ServicesAuthToken'

export class ZetaPushClient extends SmartClient {
  constructor(options: SmartClientOptions) {
    super(options)

    const { authentication } = this.helper
    this.helper.authentication = () => {
      const token = this.getDelegateToken()
      if (token) {
        return Authentication.delegating({ token })
      } else {
        return authentication()
      }
    }
  }
  getDelegateToken() {
    return localStorage.getItem(ZETAPUSH_DELEGATING_TOKEN_KEY)
  }
}


export class ZetaPushConnection {

  constructor(
    private client: ZetaPushClient
    ) {
  }

  disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const { client } = this
      const handlers: Array<any> = []
      if (client.isConnected()) {
        const onConnectionClosed = () => {
          console.debug('ZetaPushConnection::onConnectionClosed')
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler)
          })
          // Resolve disconnection
          resolve()
        }
        handlers.push(client.addConnectionStatusListener({
          onConnectionClosed
        }))
        // Disconnect client
        client.disconnect()
      } else {
        // Resolve disconnection
        resolve()
      }
    })
  }

  connect(credentials: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const { client } = this
      const handlers: Array<any> = []
      client.setCredentials(credentials)
      this.disconnect().then(() => {
        const onFailedHandshake = (error) => {
          console.debug('ZetaPushConnection::onFailedHandshake', error)
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler)
          })
          // Reconnect client via weak auth
          client.connect()
          // Reject connection
          reject()
        }
        const onConnectionEstablished = () => {
          console.debug('ZetaPushConnection::onConnectionEstablished')
          // Remove connection status listener
          handlers.forEach((handler) => {
            client.removeConnectionStatusListener(handler)
          })
          // Resolve connection success
          resolve()
        }
        // Handle connection success and fail
        handlers.push(client.addConnectionStatusListener({
          onConnectionEstablished, onFailedHandshake
        }))
        // Connect client to ZetaPush backend
        client.connect()
      })
    })
  }
}

export const client: ZetaPushClient = new ZetaPushClient({
  apiUrl: ZETAPUSH_API_URL,
  sandboxId: ZETAPUSH_SANDBOX_ID
})

/**
 * Provide promise base to handle connection
 */
export const initialize: Promise<any> = new Promise((resolve, reject) => {
  const handler = client.addConnectionStatusListener({
    onConnectionEstablished() {
      client.removeConnectionStatusListener(handler)
      resolve()
    },
    onFailedHandshake() {
      client.removeConnectionStatusListener(handler)
      reject()
    }
  })
  // Connect to ZetaPush API
  client.connect()
  // Catch server errors
  client.helper.servers.catch(reject)
})

export const CORE_PROVIDERS = [
  { provide: ZetaPushClient, useValue: client },
  { provide: ZetaPushConnection, useFactory: (sdk) => new ZetaPushConnection(sdk), deps: [ ZetaPushClient ] }
]

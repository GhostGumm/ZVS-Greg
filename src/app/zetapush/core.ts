import { SmartClient } from 'zetapush-js'

import { environment } from '../../environments/environment'

const { ZETAPUSH_API_URL, ZETAPUSH_SANDBOX_ID } = environment

export class ZetaPushClient extends SmartClient {}

export class ZetaPushConnection {

  constructor(
    private client: ZetaPushClient
    ) {
  }

  disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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

export const CORE_PROVIDERS = [
  { provide: ZetaPushClient, useValue: client },
  { provide: ZetaPushConnection, useFactory: (sdk) => new ZetaPushConnection(sdk), deps: [ ZetaPushClient ] }
]

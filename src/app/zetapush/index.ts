import { client, ZetaPushClient, ZetaPushConnection } from './core'

export { ZetaPushClient, ZetaPushConnection }

/**
 * Initialise les composants zetapush
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


import { client } from './client'
import { ApiUser } from './api/api-user'
import { ApiConfig } from './api/api-config'
import { ApiGroup } from './api/api-group'
import { ApiConversation } from './api/api-conversation'
import { ApiB2o } from './api/api-b2o'
import { CacheUser } from './cache/cache-user'
import { CacheAttachment } from './cache/cache-attachment'

/**
 * Initialise les composants zetapush
 * Gère la persitence de session utilisateur
 * @param Function callback
 */
export const initialize = new Promise((resolve, reject) => {
  const handler = client.addConnectionStatusListener({
    onConnectionEstablished() {
      client.removeConnectionStatusListener(handler)
      setTimeout(() => {
        resolve()
      }, 50)
    },
    onFailedHandshake() {
      client.removeConnectionStatusListener(handler)
      reject()
    }
  })
  client.connect()

  console.warn(client)

  client.helper.servers.catch(reject)
})

/**
 * @type {angular.module}
 */
export const zetapush = angular
  .module('zetapush', [])
  .constant('ZetaPushClient', client)
  .factory('ApiUser', ApiUser.ngFactory())
  .factory('ApiConfig', ApiConfig.ngFactory())
  .factory('ApiGroup', ApiGroup.ngFactory())
  .factory('ApiConversation', ApiConversation.ngFactory())
  .factory('ApiB2o', ApiB2o.ngFactory())
  .factory('CacheUser', CacheUser.ngFactory())
  .factory('CacheAttachment', CacheAttachment.ngFactory())

  .run(($rootScope, CacheUser, CacheAttachment, ZetaPushClient) => {
    'ngInject'
    $rootScope.zpDebug = ZetaPushClient.zpDebug
    angular.identity(CacheUser, CacheAttachment)
  })

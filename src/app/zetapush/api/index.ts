import { NgZone } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/publish'

import { client } from '../core'
import { getExtensionsAndListener } from '../utils'

import { Api } from './api'
import { ApiConfig } from './api-config'
import { ApiConversation } from './api-conversation'
import { ApiNotification } from './api-notification'
import { ApiUser } from './api-user'
import { ApiZetalk } from './api-zetalk'

const apiFactory = (Api: Api, zone: NgZone) => {
  const { extensions , listener } = getExtensionsAndListener(Api, zone)
  const service = client.createAsyncMacroService({
    Type: Api,
    listener
  })
  return Object.assign(service, extensions)
}

const provider = (provide) => ({ provide, useFactory: (zone: NgZone) => apiFactory(provide, zone), deps: [NgZone] })

export { ApiConfig, ApiUser, ApiNotification, ApiConversation, ApiZetalk }

export const PROVIDERS = [ApiConfig, ApiUser, ApiNotification, ApiConversation, ApiZetalk].map(provider)


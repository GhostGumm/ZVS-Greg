import { ApiConfig } from './api-config'

import { apiFactory } from './utils'

export { ApiConfig }

export const API_PROVIDERS = [
  { provide: ApiConfig, useFactory: () => apiFactory(ApiConfig)}
]

import { Api } from './api'

interface SetConfigParameters {
  id: string
  value: any
  type: string
}

interface GetConfigParameters {
  id: string
}

interface Pagination {
  pageNumber?: number
}

export class ApiConfig extends Api {
  addConfig({ id, value, type }: SetConfigParameters) {
    return this.$publish('addConfig', { id, value })
  }
  getConfig({ id }: GetConfigParameters) {
    return this.$publish('getConfig', { id })
  }
  listConfig({ pageNumber = 0 }: Pagination) {
    return this.$publish('listConfig', { pageNumber })
  }
  removeConfig({ id }: GetConfigParameters ) {
    return this.$publish('removeConfig', { id })
  }
  updateConfig({ id, value, type }: SetConfigParameters) {
    return this.$publish('updateConfig', { id, value })
  }
}

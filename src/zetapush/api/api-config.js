import { Api } from './api'

/**
 * @todo Should be auto generated
 * @extends Api
 */
export class ApiConfig extends Api {
  addConfig({ id, value, type } = {}) {
    this.$publish('addConfig', { id, value })
  }
  getConfig({ id } = {}) {
    this.$publish('getConfig', { id })
  }
  listConfig({ pageNumber = 0 } = {}) {
    this.$publish('listConfig', { pageNumber })
  }
  removeConfig({ id } = {}) {
    this.$publish('removeConfig', { id })
  }
  updateConfig({ id, value, type } = {}) {
    this.$publish('updateConfig', { id, value })
  }
}

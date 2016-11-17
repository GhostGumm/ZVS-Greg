import { Api } from './api'

export class ApiZetalk extends Api {
  getOrganization() {
    return this.$publish('ztalk__getOrganization', {})
  }
  listContact() {
    return this.$publish('zetalk__listContact', {})
  }
  listPotentialContact() {
    return this.$publish('zetalk__listPotentialContact', {})
  }
}

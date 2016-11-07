import { Api } from './api'

export class ApiGroup extends Api {
  getAllUserGroups() {
    return this.$publish('getAllUserGroups', {})
  }
  getAllGlobalGroups() {
    return this.$publish('getAllGlobalGroups', {})
  }
  getGlobalGroupInfos({ id }) {
    return this.$publish('getGlobalGroupInfos', { id })
  }
  getUserGroupInfos({ id }) {
    return this.$publish('getUserGroupInfos', { id })
  }
  addUserInGlobalGroup({ id, user }) {
    return this.$publish('addUserInGlobalGroup', { id, user })
  }
  addUserInGroup({ id, user }) {
    return this.$publish('addUserInGroup', { id, user })
  }
  createGlobalGroup({ name }) {
    return this.$publish('createGlobalGroup', { name })
  }
  createUserGroup({ name }) {
    return this.$publish('createUserGroup', { name })
  }
  removeUserFromGlobalGroup({ id, user }) {
    return this.$publish('removeUserFromGlobalGroup', { id, user })
  }
  deleteGlobalGroup({ id }) {
    return this.$publish('deleteGlobalGroup', { id })
  }
  deleteUserGroup({ id }) {
    return this.$publish('deleteUserGroup', { id })
  }
}

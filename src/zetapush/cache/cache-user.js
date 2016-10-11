const getUncachedEntry = (userKey) => {
  return {
    user: {
      login: userKey
    },
    groups: []
  }
}

export class CacheUser {
  constructor({
    ApiUser,
    ApiConversation
  }) {
    // ES6 http://kangax.github.io/compat-table/es6/#Map
    this.cache = new Map()

    // Handlers

    const onGetUserGroupInfos = ({ errors, result }) => {
      console.debug('CacheUser::onGetUserGroupInfos', errors, result)

      const { groupInfos = {} } = result
      const { users = [] } = groupInfos

      users.forEach((user) => {
        this.set(user.key, {
          user: user.value
        })
      })
    }

    const onGetUserInfos = ({ errors, result }) => {
      console.debug('CacheUser::onGetUserInfos', errors, result)

      const { userInfos = {}, groups = [] } = result

      this.set(userInfos.key, {
        user: userInfos.value,
        groups: groups
      })
    }
    const onGetUserListInfos = ({ errors, result }) => {
      console.debug('CacheUser::onGetUserListInfos', errors, result)

      const { users = [] } = result

      users.forEach((user) => {
        this.set(user.key, {
          user: user.value
        })
      })
    }

    const onListPresences = ({ group, owner, presences }) => {
      console.debug('CacheUser::onListPresences', group, owner, presences)
    }

    const onPresence = ({ group, presence, user }) => {
      console.debug('CacheUser::onPresence', group, presence, user)

      const cached = this.cache.get(user.owner)

      if (cached) {
        cached.presence = presence === 'ON'
        // Persist cache entrye
        this.set(user.owner, cached)
      }
    }

    const onGetConversationInfos = ({ errors, result }) => {
      console.debug('CacheUser::onGetConversationInfos', errors, result)

      const { conversation = {}, presences = [] } = result
      const { group = {} } = conversation
      const { users = [] } = group

      users.forEach((user) => {
        this.set(user.key, {
          user: user.value
        })
      })

      presences.forEach(({ presence, user }) => {
        console.debug('CacheUser::onGetConversationInfos', presence, user)
        const cached = this.cache.get(user.owner)

        if (cached) {
          cached.presence = presence === 'ON'
          // Persist cache entrye
          this.set(user.owner, cached)
        }
      })
    }

    // Event subscriptions

    ApiUser.onGetUserPrivateInfos.subscribe(onGetUserInfos)
    ApiUser.onGetUserPublicInfos.subscribe(onGetUserInfos)
    ApiUser.onSearchUser.subscribe(onGetUserListInfos)

    ApiConversation.onGetConversationInfos.subscribe(onGetConversationInfos)
  }
  get(key) {
    const cached = this.cache.get(key)

    return 'undefined' === typeof cached ? getUncachedEntry(key) : cached
  }
  set(key = null, value) {
    if (key !== null) {
      const cached = this.cache.get(key) || {}

      this.cache.set(key, Object.assign({}, cached, value))
    }
  }

  static ngFactory() {
    return ['ApiUser', 'ApiConversation', (ApiUser, ApiConversation) => new this.prototype.constructor({
      ApiUser, ApiConversation
    })]
  }
}

export class CacheAttachment {
  constructor({
    ApiConversation
  }) {
    // ES6 http://kangax.github.io/compat-table/es6/#Map
    this.cache = new Map()

    // Handlers

    const onGetAttachment = ({ errors, result }) => {
      console.debug('ApiAttachmentCache::onGetAttachment', errors, result)

      const { attachment } = result

      this.set(this.key(attachment), attachment)
    }

    ApiConversation.onGetAttachment.subscribe(onGetAttachment)
  }
  key({ owner, path }) {
    return `${owner}:${path}`
  }
  get(key) {
    const cached = this.cache.get(key)

    return 'undefined' === typeof cached ? key : cached
  }
  set(key = null, value) {
    if (key !== null) {
      const cached = this.cache.get(key) || {}

      this.cache.set(key, Object.assign({}, cached, value))
    }
  }
  static ngFactory() {
    return ['ApiConversation', (ApiConversation) => new this.prototype.constructor({
      ApiConversation
    })]
  }
}

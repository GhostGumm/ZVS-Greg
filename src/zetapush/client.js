import { ZETAPUSH_SANDBOX_KEY } from './utils'
import { ApplicationsClient } from './application-client'

const apiUrl = process.env.ZETAPUSH_API_URL
const sandboxId = localStorage.getItem(ZETAPUSH_SANDBOX_KEY) || process.env.ZETAPUSH_SANDBOX_ID
const zpDebug = process.env.ZETAPUSH_DEBUG === 'true' ? true : false
console.debug('Applicatons::infos', { apiUrl, sandboxId, zpDebug })
/**
 * @type {ApplicationsClient}
 */
export const client = new ApplicationsClient({
  apiUrl, sandboxId, zpDebug
})

//client.setLogLevel('debug')
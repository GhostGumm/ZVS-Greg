import { SmartClient } from 'zetapush-js'
import { environment } from '../../environments/environment'

const { ZETAPUSH_API_URL, ZETAPUSH_SANDBOX_ID } = environment

export const client: SmartClient = new SmartClient({
  apiUrl: ZETAPUSH_API_URL,
  sandboxId: ZETAPUSH_SANDBOX_ID
})

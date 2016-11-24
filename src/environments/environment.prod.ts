const ZETAPUSH_SANDBOX_ID = 'lGxx7tBx'
const ZETAPUSH_API_URL = `http://api.zpush.ovh/`
const ZETAPUSH_PROXY_URL = `http://file2.zpush.ovh/${ZETAPUSH_SANDBOX_ID}/cnvrst_hdfs/`
const ZETAPUSH_DELEGATING_TOKEN_KEY = 'ServicesAuthToken'

export const environment = {
  production: true,
  ZETAPUSH_API_URL, ZETAPUSH_DELEGATING_TOKEN_KEY, ZETAPUSH_PROXY_URL, ZETAPUSH_SANDBOX_ID
}
